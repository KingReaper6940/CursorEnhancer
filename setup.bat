@echo off
echo Setting up Cursor Prompt Enhancer...
echo.

echo 1. Installing extension dependencies...
call npm install

echo.
echo 2. Setting up backend...
cd backend
call npm install

echo.
echo 3. Creating environment file...
if not exist .env (
    copy env.example .env
    echo Please edit backend\.env and add your OpenAI API key!
) else (
    echo .env file already exists
)

cd ..

echo.
echo 4. Compiling TypeScript...
call npm run compile

echo.
echo 5. Creating extension package...
call npm run package

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env and add your OpenAI API key
echo 2. Start backend: cd backend ^&^& npm start
echo 3. Install extension: cursor --install-extension cursor-prompt-enhancer-0.0.1.vsix
echo.
pause
