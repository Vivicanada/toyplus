@echo off
echo ======================================
echo  LittleStars ToySwap - Push to GitHub
echo ======================================
echo.

cd /d "C:\Users\Vivi_\OneDrive\桌面\toyplus\littlestars-toyswap"

echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit: LittleStars ToySwap - Complete toy exchange platform with Star Coins system"

echo.
echo Setting main branch...
git branch -M main

echo.
echo Adding remote repository...
git remote add origin https://github.com/Vivicanada/toyplus.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ======================================
echo  Done! Visit: https://github.com/Vivicanada/toyplus
echo ======================================
echo.
pause
