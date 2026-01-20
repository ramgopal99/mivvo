@echo off
setlocal enabledelayedexpansion

echo Fixing Unicode characters in C module files...

REM Define character mappings (using PowerShell-style escaping)
set "rocket_old=âš™ï¸"
set "rocket_new=🚀"
set "brain_old=ðŸ§¬"
set "brain_new=🧠"
set "bulb_old=ðŸ§°"
set "bulb_new=💡"
set "apostrophe_old=â€™"
set "apostrophe_new='"
set "dash_old=â€“"
set "dash_new=-"
set "rocket2_old=ðŸš€"
set "rocket2_new=🚀"

REM Find all .ts files in C modules
for /r "app\test\modules\C" %%f in (*.ts) do (
    echo Processing: %%f
    REM Use PowerShell to do the replacements
    powershell -Command "& {(Get-Content '%%f' -Raw) -replace [regex]::Escape('%rocket_old%'), '%rocket_new%' -replace [regex]::Escape('%brain_old%'), '%brain_new%' -replace [regex]::Escape('%bulb_old%'), '%bulb_new%' -replace [regex]::Escape('%apostrophe_old%'), '%apostrophe_new%' -replace [regex]::Escape('%dash_old%'), '%dash_new%' -replace [regex]::Escape('%rocket2_old%'), '%rocket2_new%' | Set-Content '%%f' -Encoding UTF8}"
)

echo Unicode character fix completed!
pause