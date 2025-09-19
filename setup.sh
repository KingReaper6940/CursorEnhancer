#!/bin/bash

echo "Setting up Cursor Prompt Enhancer..."
echo

echo "1. Installing extension dependencies..."
npm install

echo
echo "2. Setting up backend..."
cd backend
npm install

echo
echo "3. Creating environment file..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "Please edit backend/.env and add your OpenAI API key!"
else
    echo ".env file already exists"
fi

cd ..

echo
echo "4. Compiling TypeScript..."
npm run compile

echo
echo "5. Creating extension package..."
npm run package

echo
echo "Setup complete!"
echo
echo "Next steps:"
echo "1. Edit backend/.env and add your OpenAI API key"
echo "2. Start backend: cd backend && npm start"
echo "3. Install extension: cursor --install-extension cursor-prompt-enhancer-0.0.1.vsix"
echo

read -p "Press Enter to continue..."
