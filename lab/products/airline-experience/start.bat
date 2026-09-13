@echo off
cd /d "%~dp0"
where python >nul 2>nul && set PY=python
if not defined PY (where python3 >nul 2>nul && set PY=python3)
if not defined PY (echo δ�ҵ� Python�����Ȱ�װ Python 3 ������ PATH & pause & exit /b)
echo �������ÿ�����ƽ̨��� (http://localhost:5000) ...
%PY% server/app.py
pause
