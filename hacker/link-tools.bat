@echo off
setlocal enabledelayedexpansion
set "LINK=%~dp0tools"
set "SRC=%~1"

echo ============================================
echo   ��ȫ������ - ���ع��߰�������������
echo ============================================
echo.
echo �÷����ѹ��߰�Ŀ¼�ϵ����ļ�ͼ���ϼ��ɡ�
echo.

if "%SRC%"=="" (
  set /p SRC=��ճ�����߰�Ŀ¼������·��: 
)
set "SRC=!SRC:"=!"

if "!SRC!"=="" (
  echo [����] δ����·����
  pause
  exit /b 1
)

if not exist "!SRC!\" (
  echo [����] Ŀ¼�����ڣ�!SRC!
  pause
  exit /b 1
)

if exist "!LINK!\" (
  fsutil reparsepoint query "!LINK!" >nul 2>nul
  if errorlevel 1 (
    echo [��ֹ] !LINK! �Ѵ��ڣ��Ҳ���������
    echo        ��ȷ�����ݺ��ֶ�ɾ����Ŀ¼�����ԡ�
    pause
    exit /b 1
  )
  rmdir "!LINK!"
  echo ���Ƴ���������
)

mklink /J "!LINK!" "!SRC!"
if errorlevel 1 (
  echo.
  echo [ʧ��] ��������ʧ�ܣ�������ͨȨ�����ԡ�
  pause
  exit /b 1
)

echo.
echo [���] �����Ѵ�����
echo   !LINK!
echo     -^> !SRC!
echo.
echo ���ڴ� hacker/tools-catalog.html��
echo �����ع��߰�����Ӧ�ܽ���������·����
pause
