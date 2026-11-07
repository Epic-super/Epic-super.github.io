# DeepSeek pet key patch - Tower workbench
# Usage: copy your DeepSeek API key (sk-...) to clipboard FIRST, then run this script.
$ErrorActionPreference = "Stop"
$key = (Get-Clipboard | Out-String).Trim()
if (-not $key) { Write-Output "[pet] clipboard is empty - copy your key (sk-...) first"; Read-Host "Enter to exit"; exit }
if (-not $key.StartsWith("sk-")) { Write-Output "[pet] warning: key usually starts with sk-" }
$f = "<本地路径>"
$c = Get-Content $f -Raw -Encoding UTF8
$c = $c -replace "llm_api_key:\s*'[^']*'", ("llm_api_key: '" + $key + "'")
Set-Content $f $c -Encoding UTF8
Write-Output "[pet] conf.yaml updated"
$conn = Get-NetTCPConnection -LocalPort 12393 -State Listen -ErrorAction SilentlyContinue
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force; Start-Sleep 1 }
Start-Process powershell -WindowStyle Hidden -ArgumentList '-Command', 'Set-Location <本地路径>; $env:HTTP_PROXY=""; $env:HTTPS_PROXY=""; py -3.14 -m uv run run_server.py'
Write-Output "[pet] restarted - open http://127.0.0.1:12393/"
Read-Host "Enter to exit"
