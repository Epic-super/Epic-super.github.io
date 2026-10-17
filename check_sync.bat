@echo off
chcp 936 >nul
rem check_sync.bat —— 同步前检查本地是否落后云端 / 是否分叉（防再分叉护栏）
cd /d "%~dp0"
echo ===== 同步前检查：本地 _master vs 云端 workbench =====
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0check_sync.ps1"
echo.
echo ===== 检查结束，按任意键退出 =====
pause >nul
