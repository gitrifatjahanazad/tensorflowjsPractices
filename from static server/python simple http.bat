

python -m SimpleHTTPServer 8000
IF %ERRORLEVEL% NEQ 0 GOTO ProcessError       
:ProcessError
python -m http.server 8000
@codeprocess error
exit /b 1