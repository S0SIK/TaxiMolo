@echo off
echo.
echo     =======================================
echo      Wot Tracking BOT By S0SIK__pl V.0.0.5
echo     =======================================
echo.

title DiscordBOT 0
:start
node index.js
echo.
echo     =======================================
echo     #           BOT SIE WYSYPAL           #
echo     =======================================
echo     #    1 - zamknij                      #
echo     #    2 - restart                      #
echo     =======================================
echo     #     (Autorestart za 10 sekund.)     #
echo     =======================================
echo.
choice>nul /C 12 /D 2 /T 10
if %errorlevel%==1 exit
if %errorlevel%==2 goto start
pause >nul