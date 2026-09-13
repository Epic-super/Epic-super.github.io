#!/usr/bin/env python3
"""
FOLOTOY NFC 互动打卡 + Token 兑换系统
设备端 AT 指令交互脚本（用于测试和演示）
"""

import serial
import time
import json
import requests
from typing import Optional

DEVICE_ID = "device-" + str(int(time.time()))
API_BASE = "http://localhost:3000/api"

class FoloToyNFCTester:
    def __init__(self, port: str = "COM3", baudrate: int = 115200):
        self.port = port
        self.baudrate = baudrate
        self.serial: Optional[serial.Serial] = None

    def connect(self):
        try:
            self.serial = serial.Serial(self.port, self.baudrate, timeout=2)
            print(f"✓ 已连接到 {self.port}")
            return True
        except Exception as e:
            print(f"✗ 连接失败: {e}")
            return False

    def send_at_command(self, command: str, wait_time: float = 1.0) -> str:
        if not self.serial:
            return "Error: Not connected"
        
        self.serial.write((command + "\r\n").encode())
        time.sleep(wait_time)
        response = self.serial.read_all().decode().strip()
        return response

    def read_nfc_tag(self) -> Optional[str]:
        print("📡 等待 NFC 标签...")
        response = self.send_at_command("at+command=nfc,read", 3.0)
        
        if "UID:" in response:
            uid = response.split("UID:")[1].strip().split()[0]
            print(f"✓ 读取到 NFC 标签 UID: {uid}")
            return uid
        else:
            print("✗ 未读取到 NFC 标签")
            return None

    def checkin(self, tag_uid: str):
        print(f"📍 执行打卡: {tag_uid}")
        response = requests.post(
            f"{API_BASE}/nfc/checkin",
            json={"device_id": DEVICE_ID, "tag_uid": tag_uid}
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print(f"✓ {result['message']}")
                print(f"  当前 Token 余额: {result['data']['total_tokens']}")
                return result
            else:
                print(f"✗ 打卡失败: {result.get('error')}")
        else:
            print(f"✗ 服务器错误: {response.status_code}")
        return None

    def get_balance(self):
        response = requests.get(f"{API_BASE}/token/balance/{DEVICE_ID}")
        if response.status_code == 200:
            result = response.json()
            print(f"💰 Token 余额: {result['data']['total_tokens']}")
            return result
        return None

    def get_rewards(self):
        response = requests.get(f"{API_BASE}/rewards")
        if response.status_code == 200:
            result = response.json()
            print("🎁 可兑换奖品:")
            for reward in result["data"]:
                print(f"  [{reward['id']}] {reward['name']} - {reward['cost_tokens']} Token (库存: {reward['stock']})")
            return result
        return None

    def redeem_reward(self, reward_id: int):
        print(f"🎁 兑换奖品 ID: {reward_id}")
        response = requests.post(
            f"{API_BASE}/rewards/redeem",
            json={"device_id": DEVICE_ID, "reward_id": reward_id}
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print(f"✓ {result['message']}")
                return result
            else:
                print(f"✗ 兑换失败: {result.get('error')}")
        return None

    def interactive_mode(self):
        print("\n=== FOLOTOY NFC 互动测试模式 ===")
        print(f"设备 ID: {DEVICE_ID}")
        print("命令列表:")
        print("  1. NFC 打卡")
        print("  2. 查询余额")
        print("  3. 查看奖品")
        print("  4. 兑换奖品")
        print("  0. 退出")
        print("=" * 40)

        while True:
            try:
                choice = input("\n请选择操作 (0-4): ").strip()
                
                if choice == "0":
                    print("再见!")
                    break
                elif choice == "1":
                    tag_uid = self.read_nfc_tag()
                    if tag_uid:
                        self.checkin(tag_uid)
                elif choice == "2":
                    self.get_balance()
                elif choice == "3":
                    self.get_rewards()
                elif choice == "4":
                    rewards = self.get_rewards()
                    if rewards and rewards["data"]:
                        try:
                            reward_id = int(input("请输入要兑换的奖品 ID: ").strip())
                            self.redeem_reward(reward_id)
                        except ValueError:
                            print("✗ 请输入有效的数字 ID")
                else:
                    print("✗ 无效选择")
                    
            except KeyboardInterrupt:
                print("\n\n再见!")
                break
            except Exception as e:
                print(f"✗ 错误: {e}")

    def close(self):
        if self.serial and self.serial.is_open:
            self.serial.close()
            print("✓ 串口已关闭")

def main():
    import sys
    
    port = sys.argv[1] if len(sys.argv) > 1 else "COM3"
    
    tester = FoloToyNFCTester(port=port)
    
    if tester.connect():
        try:
            tester.interactive_mode()
        finally:
            tester.close()
    else:
        print("无法连接到设备，请检查串口设置")
        sys.exit(1)

if __name__ == "__main__":
    main()
