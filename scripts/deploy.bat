@echo off
REM Deploy script voor Windows: bouwt en pusht naar gh-pages branch
REM Gebruik: scripts\deploy.bat

echo ^>^> Bouwen...
cd /d "%~dp0\.."
rmdir /s /q .next 2>nul
rmdir /s /q out 2>nul
call npm run build
if errorlevel 1 exit /b 1

echo ^>^> Klaar. Handmatig deployen:
echo    1. Kopieer de inhoud van out\ naar een nieuwe git repo
echo    2. Commit en push naar de gh-pages branch
echo.
echo Live URL: https://semdesnoo.github.io/lkdakwerken/
