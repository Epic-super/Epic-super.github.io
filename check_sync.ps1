# check_sync.ps1 —— 同步/推送前检查：本地 _master 与云端 workbench 的相对状态
# 用途：换设备前或每次编辑完成后，先跑本脚本确认本地是否落后云端 / 是否已分叉，
#       避免在多台设备各自编辑、不及时同步时越分叉越深。
# 用法：
#   check_sync.bat              交互式检查（推荐，双击即可）
#   powershell -File check_sync.ps1 [--push] [--pull]
# 参数：
#   --push   以「准备推送」视角检查（本地不应落后，且提示先 commit）
#   --pull   以「准备拉取」视角检查（本地不应有未提交改动/未知内容被覆盖）
$ErrorActionPreference = 'Continue'
$repo = $PSScriptRoot
Set-Location $repo

$mode = 'status'
if ($args -contains '--push') { $mode = 'push' }
if ($args -contains '--pull') { $mode = 'pull' }

Write-Host ''
Write-Host '===================================================='
Write-Host '  同步前检查  check_sync   (本地 _master  vs  云端)'
Write-Host '===================================================='
Write-Host "检查模式: $mode"

# ---- 1) 读取 Windows 系统代理（与 sync_helper/push_helper 同口径）----
$proxy = $null
try {
    $key = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings'
    $s = Get-ItemProperty $key -ErrorAction Stop
    if ($s.ProxyEnable -eq 1 -and $s.ProxyServer) {
        $ps = $s.ProxyServer
        if ($ps -match 'https=(.+?)(;|$)') { $proxy = $Matches[1] }
        elseif ($ps -match 'http=(.+?)(;|$)') { $proxy = $Matches[1] }
        elseif ($ps -match '^\d+\.\d+\.\d+\.\d+:\d+$') { $proxy = $ps }
        if ($proxy -and $proxy -notmatch '^https?://') { $proxy = 'http://' + $proxy }
    }
} catch {}
if (-not $proxy) { $proxy = $env:HTTPS_PROXY; if (-not $proxy) { $proxy = $env:HTTP_PROXY } }
if ($proxy) {
    $env:HTTP_PROXY = $proxy; $env:HTTPS_PROXY = $proxy
    $env:http_proxy = $proxy; $env:https_proxy = $proxy
    Write-Host "已应用系统代理: $proxy"
} else {
    Write-Host '未检测到系统代理 → 将尝试直连；若 fetch 超时，请先在代理软件里开启「系统代理」再重试。'
}

# ---- 2) 先检查本地未提交改动（任何模式都值得先知道）----
$dirty = (git status --porcelain | Measure-Object).Count
if ($dirty -gt 0) {
    Write-Host ''
    Write-Host "[警告] 本地有 $dirty 处未提交/未跟踪改动："
    git status --porcelain | Select-Object -First 15 | ForEach-Object { Write-Host "    $_" }
    if ($dirty -gt 15) { Write-Host ("    ... 共 " + $dirty + " 项") }
    if ($mode -eq 'pull') { Write-Host '  注意：git pull 可能要求先提交，或覆盖同名未跟踪文件。'
        Write-Host '  建议先提交你的改动（git add -A && git commit），再执行 pull。' }
} else {
    Write-Host "[OK] 本地工作区干净，无未提交改动。"
}

# ---- 3) fetch 云端最新状态 ----
Write-Host ''
Write-Host '[fetch] 拉取云端 origin/main ...'
git fetch origin
if ($LASTEXITCODE -ne 0) {
    Write-Host ''
    Write-Host '[错误] fetch 失败：无法连接云端。'
    Write-Host '   可能是网络不通或代理未开启。本次检查中止，未做任何改动。'
    Write-Host '   请确认代理后重试；不要盲目 push/pull（那会掩盖分叉或覆盖内容）。'
    exit 2
}

# ---- 4) 计算相对状态 ----
$ahead  = [int](git rev-list --count origin/main..HEAD 2>$null)   # 本地领先云端的提交数
$behind = [int](git rev-list --count HEAD..origin/main 2>$null)   # 云端领先本地的提交数
$mb = git merge-base HEAD origin/main 2>$null
$isOrphan = [string]::IsNullOrWhiteSpace($mb)

Write-Host ''
Write-Host '----------------------------------------------------'
Write-Host ("  本地领先云端(未推送): $ahead 个提交")
Write-Host ("  云端领先本地(未拉取): $behind 个提交")
if ($isOrphan) { Write-Host '  谱系关系   : 无共同祖先（孤儿历史，非普通分叉）' }
else { Write-Host "  谱系关系   : 有共同祖先 $($mb.Substring(0,7))" }
Write-Host '----------------------------------------------------'

# ---- 5) 分类判定 + 处置建议 ----
function Show-SyncHead($headMsg) { Write-Host ''; Write-Host ('[云端main] ' + $headMsg); git log --oneline -1 origin/main }

if ($isOrphan) {
    Write-Host ''
    Write-Host '[严重] 孤儿历史：本地与云端没有共同祖先'
    Write-Host '  这是最危险的状态——git 无法自动合并，普通 pull/push 会冲突或丢内容。'
    Write-Host '  处置：不要直接 pull 或 push。需先做一次「以云端为基底、本地增量并入」的'
    Write-Host '       彻底合并（参考 docs/SYNC-GUIDE.md / docs/WORKFLOW-SINGLE-SOURCE.md）。'
    Write-Host '  或确认本机只是新设备：应 git clone 云端作为工作副本，而非在旧副本上硬合并。'
    Show-SyncHead $behind
    exit 3
}

if ($ahead -eq 0 -and $behind -eq 0) {
    Write-Host ''
    Write-Host '[OK] 已与云端完全同步，无分叉。' 
    Write-Host '   可以放心开始编辑；改完请尽快提交并 push，保持「改完即同步」。'
} elseif ($ahead -gt 0 -and $behind -eq 0) {
    Write-Host ''
    Write-Host "[提示] 本地领先云端 $ahead 个提交（未推送）。"
    if ($mode -eq 'push') { Write-Host '   正常状态。应先 commit 再 push：' }
    elseif ($mode -eq 'pull') { Write-Host '   本地有云端没有的提交；直接 pull 会尝试合并，注意是否有冲突。' }
    Write-Host '   建议顺序：git add -A && git commit -m "..."  =>  git push origin main'
    Show-SyncHead '云端'
} elseif ($ahead -eq 0 -and $behind -gt 0) {
    Write-Host ''
    Write-Host "[提示] 云端领先本地 $behind 个提交（本地落后）。"
    Write-Host '   先拉取对齐再编辑，避免基于旧版继续改（那会再分叉）：'
    Write-Host '   git pull origin main --no-edit'
    Show-SyncHead '云端领先'
    if ($mode -eq 'push') { Write-Host '   提示：你正以「推送视角」检查，但本地落后——先 pull 完再 push。' }
} else {
    Write-Host ''
    Write-Host "[警告] 已分叉：本地领先 $ahead 个，云端领先 $behind 个。两边都有对方没有的提交。"
    Write-Host '   这是多设备各自编辑、未及时同步的结果。'
    if ($mode -eq 'pull') { Write-Host '   处置：先提交本地改动，再 git pull --rebase origin main（变基合并）。' 
        Write-Host '        若报冲突，手动解决后 git add <文件> && git rebase --continue。' }
    elseif ($mode -eq 'push') { Write-Host '   处置：不要直接 push。先 git pull --rebase origin main 把云端并入，解决冲突后再 push。' }
    else { Write-Host '   处置：同一位置只在一台设备改；另一台先 pull 再改。若已冲突，用 --rebase 合并。' }
    Show-SyncHead '目前云端'
}

Write-Host ''
Write-Host '===================================================='