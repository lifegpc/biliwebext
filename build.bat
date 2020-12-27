@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
REM YOU CAN DEFINE YOUR PROGRAM LOCATION IN build.user.bat
IF EXIST build.user.bat CALL build.user.bat
IF NOT DEFINED python SET python=py
IF NOT DEFINED rm SET rm=rm
IF NOT DEFINED cp SET cp=cp
IF NOT DEFINED java SET java=java
IF NOT DEFINED mkdir SET mkdir=mkdir
SET /A argc=0
SET /A debug=0
SET /A all=1
SET /A chrome=1
FOR %%x in (%*) DO (
    SET /A argc+=1
    SET t=%%x
    SET t=!t:"=!
    IF !t!==--debug (
        SET /A debug=1
    ) ELSE (
        if !t!==-d (
            SET /A debug=1
        ) ELSE (
            IF !t!==--chrome (
                SET /A all=0
                SET /A chrome=1
            ) ELSE (
                IF !t!==--firefox (
                    SET /A all=0
                    SET /A chrome=0
                )
            )
        )
    )
)
IF !debug! EQU 0 IF EXIST build %rm% -rfv build
IF !debug! EQU 1 IF EXIST debug %rm% -rfv debug
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
IF EXIST js %rm% -rfv js
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
IF EXIST Temp %rm% -rfv Temp
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
CALL :GETPREPARE
IF !all! EQU 1 (
    CALL :BUILD
    IF %ERRORLEVEL% NEQ 0 EXIT /B 1
    SET /A chrome=0
    CALL :BUILD
    IF %ERRORLEVEL% NEQ 0 EXIT /B 1
) ELSE (
    CALL :BUILD
    IF %ERRORLEVEL% NEQ 0 EXIT /B 1
)
ENDLOCAL
EXIT /B 0

:BUILD
CALL :GETPREPARE
%python% prepare.py!para! -c ContextMenu.js i18n.js string.js cml.js settingsClass.js settings.js tabs.js background.js
%python% prepare.py!para! -c sendMessage.js i18n.js tabs.js str.js string.js cml.js settingsClass.js error.js page.js
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%python% language.py
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
IF !chrome! EQU 1 SET o=\chrome\
IF !chrome! EQU 0 SET o=\firefox\
IF !debug! EQU 1 SET o=debug!o!
IF !debug! EQU 0 SET o=build!o!
IF NOT EXIST !o! %mkdir% !o!
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
IF !chrome! EQU 1 %cp% -v chrome_manifest.json !o!manifest.json
IF !chrome! EQU 0 %cp% -v firefox_manifest.json !o!manifest.json
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%cp% -v LICENSE !o!LICENSE
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%cp% -rv js !o!
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%cp% -rv js(origin) !o!
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%cp% -rv Temp/_locales !o!
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
%cp% -rv html/*.html !o!
IF %ERRORLEVEL% NEQ 0 EXIT /B 1
EXIT /B 0

:GETPREPARE
SET para=
IF !chrome! NEQ 1 SET para=!para! --firefox
IF !java! NEQ java SET para=!para! -j "!java!"
EXIT /B 0
