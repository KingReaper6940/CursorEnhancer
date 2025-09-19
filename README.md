# 🚀 Cursor Prompt Enhancer

A VS Code extension (also works in Cursor Desktop) that improves natural language prompts before sending them to AI. It makes prompts clearer, adds missing context, and structures them for higher-quality AI output.

![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License](https://img.shields.io/badge/license-CC%20BY--NC--ND%204.0-orange)
![VS Code](https://img.shields.io/badge/VS%20Code-1.70.0+-green)

---

## ✨ Features

- 🔧 **Enhance selected text** or type in a new prompt
- 🎯 **Command Palette integration**: `Cursor Enhancer: Enhance Prompt`
- 💻 **Cross-platform**: Works inside **Cursor Desktop** and **VS Code**
- ⚙️ **Configurable backend** API endpoint
- 🎨 **Flexible output**: Replace selection or open new document
- 🛡️ **Error handling**: Graceful fallbacks when backend is unavailable

---

## 🚀 Quick Start

### 1. Set Up the Backend

First, clone this repository and set up the backend server:

```bash
git clone https://github.com/KingReaper6940/CursorEnhancer.git
cd cursor-enhancer/backend
npm install
```

Create a `.env` file with your OpenAI API key:

```bash
cp env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-actual-api-key-here
```

Start the backend server:

```bash
npm start
```

The API will be available at `http://localhost:3000/api/enhance`.

### 2. Install the Extension

#### Option A: Install from VS Code Marketplace (Recommended)

The extension is available on the VS Code Marketplace:

1. Open VS Code or Cursor
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Cursor Prompt Enhancer"
4. Click Install

#### Option B: Install from VSIX (Manual)

Build and package the extension:

```bash
cd .. # Back to root directory
npm install
npm install -g @vscode/vsce
npm run compile
vsce package
```

This creates a `cursor-prompt-enhancer-0.0.1.vsix` file.

**For Cursor Desktop:**
```bash
cursor --install-extension cursor-prompt-enhancer-0.0.1.vsix
```

**For VS Code:**
```bash
code --install-extension cursor-prompt-enhancer-0.0.1.vsix
```

**Or manually:**
- Open Cursor/VS Code
- Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
- Run "Extensions: Install from VSIX"
- Select the `.vsix` file

#### Option C: Development Mode

For development and testing:

```bash
# In the root directory
npm install
npm run compile
```

Then press `F5` in VS Code to launch a new Extension Development Host window.

### 3. Usage

#### Basic Usage
1. **Select text** in any file (your prompt to enhance)
2. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac) to open Command Palette
3. Type "Enhance Prompt" and select **"Cursor Enhancer: Enhance Prompt"**
4. Choose to **Replace Selection** or **Open New Document**

#### Without Selection
If no text is selected, the extension will prompt you to enter text manually.

#### Example Enhancement

**Before:**
```
make a login form
```

**After:**
```
Create a modern, responsive login form component with the following specifications:

**Requirements:**
- Use HTML5 semantic elements and CSS3 for styling
- Include email and password input fields with proper validation
- Add "Remember Me" checkbox and "Forgot Password" link
- Implement form validation with real-time feedback
- Use CSS Grid or Flexbox for responsive layout
- Ensure accessibility (ARIA labels, proper focus management)

**Styling:**
- Modern, clean design with subtle shadows and rounded corners
- Consistent color scheme (primary, secondary, accent colors)
- Hover and focus states for interactive elements
- Mobile-first responsive design

**Functionality:**
- Client-side validation for email format and password requirements
- Form submission handling with loading states
- Error message display for validation failures
- Success feedback after submission

**Expected Output:**
- Complete HTML structure
- CSS styles (or styled-components if React)
- JavaScript for form validation and submission
- Responsive breakpoints for mobile, tablet, and desktop
```

---

## ⚙️ Configuration

The extension can be configured through VS Code settings:

```json
{
    "cursorEnhancer.apiUrl": "http://localhost:3000/api/enhance"
}
```

### Changing the API Endpoint

1. Open VS Code/Cursor settings (`Ctrl+,` or `Cmd+,`)
2. Search for "Cursor Enhancer"
3. Modify the "Api Url" setting

Or edit your `settings.json` directly:

```json
{
    "cursorEnhancer.apiUrl": "https://your-custom-endpoint.com/api/enhance"
}
```

---

## 🏗️ Backend API

### Endpoint: `POST /api/enhance`

**Request:**
```json
{
    "prompt": "your prompt text here"
}
```

**Response:**
```json
{
    "success": true,
    "enhanced_prompt": "enhanced version of your prompt",
    "original_prompt": "your original prompt",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
```json
{
    "success": false,
    "error": "error message"
}
```

### Health Check: `GET /health`

```json
{
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔧 Development

### Prerequisites

- Node.js 16+
- npm or yarn
- VS Code or Cursor Desktop
- OpenAI API key

### Building from Source

```bash
# Clone the repository
git clone https://github.com/yourname/cursor-enhancer.git
cd cursor-enhancer

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
vsce package
```

### Development Commands

```bash
# Compile TypeScript in watch mode
npm run watch

# Run linting
npm run lint

# Package for distribution
npm run package
```

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev

# Production start
npm start
```

---

## 🛠️ Troubleshooting

### Common Issues

#### "Cannot connect to enhancement backend"
- Ensure the backend server is running: `cd backend && npm start`
- Check if the server is accessible: visit `http://localhost:3000/health`
- Verify the API URL in extension settings

#### "OpenAI API key not configured"
- Create a `.env` file in the `backend` directory
- Add your OpenAI API key: `OPENAI_API_KEY=sk-your-key-here`
- Restart the backend server

#### "Enhancement takes too long"
- The extension has a 30-second timeout
- Check your internet connection
- Verify OpenAI API quota and billing status

#### Extension not showing in Command Palette
- Reload the window: `Ctrl+Shift+P` → "Developer: Reload Window"
- Check if the extension is enabled in the Extensions view
- Try reinstalling the VSIX file

---

## 🏪 VS Code Marketplace

This extension is published on the **VS Code Marketplace** and can be installed directly from within VS Code or Cursor:

### **Installation from Marketplace**
1. Open VS Code or Cursor
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for **"Cursor Prompt Enhancer"**
4. Click **Install**

### **Marketplace Link**
🔗 **[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vrishnviswa.cursor-prompt-enhancer)**

### **Publishing Information**
- **Publisher:** Vrishn Viswa Sathyamoorthy
- **Version:** 0.0.1
- **License:** Proprietary (Personal Use Only)
- **Last Updated:** September 19, 2024

---

## 📜 License

This project is licensed under a **Proprietary License** - Personal Use Only.

### ✅ **You are free to:**
- **Personal use only** - Install and use on your personal devices
- **Personal projects** - Use for personal projects and learning
- **Individual installation** - Install on your own machines

### ❌ **You are NOT allowed to:**
- **Commercial use** - Use in any commercial products or services
- **Redistribution** - Share, resell, or distribute to others
- **Modification** - Create derivative works or modified versions
- **Reverse engineering** - Decompile or reverse engineer the software
- **Public display** - Use in public demonstrations or performances

### 🔒 **Copyright Notice**
Copyright (c) 2024 Vrishn Viswa Sathyamoorthy. All rights reserved.

**For licensing inquiries, contact:** vrishnviswa.sathyamoorthy@gmail.com

**Full license text:** See [LICENSE](LICENSE) file in this repository.

---

## 🤝 Contributing

This is a proprietary project with limited contribution opportunities due to licensing restrictions.

### Bug Reports
- Use the [GitHub Issues](https://github.com/KingReaper6940/CursorEnhancer/issues) page
- Include steps to reproduce, expected vs actual behavior
- Add relevant logs and system information

### Feature Requests
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Note: Implementation will be done by the project maintainer

### ⚠️ **Important Note**
Due to the proprietary license, external contributions are not accepted. All development and modifications are handled by the project maintainer to preserve the proprietary nature of the software.

---

## 🛣️ Roadmap

### Short-term (v0.1.0)
- [ ] Add configuration UI for API settings
- [ ] Implement prompt templates/presets
- [ ] Add keyboard shortcuts
- [ ] Improve error messages and user feedback

### Medium-term (v0.2.0)
- [ ] Support for multiple AI providers (Anthropic, Cohere, etc.)
- [ ] Local/offline enhancement using smaller models
- [ ] Prompt history and favorites
- [ ] Batch enhancement for multiple selections

### Long-term (v1.0.0)
- [ ] Direct integration with Cursor's chat interface
- [ ] Smart context detection (file type, project structure)
- [ ] Collaborative prompt sharing
- [ ] Advanced customization options

---

## 👥 Maintainers

- **Vrishn Viswa Sathyamoorthy** ([@KingReaper6940](https://github.com/KingReaper6940)) - Creator & Maintainer

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for the GPT-4 API
- [VS Code Extension API](https://code.visualstudio.com/api) documentation
- [Cursor](https://cursor.sh) for inspiration
- The open-source community for various dependencies

---

## 📞 Support

- 📧 **Email:** vrishnviswa.sathyamoorthy@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/KingReaper6940/CursorEnhancer/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/KingReaper6940/CursorEnhancer/discussions)
- 📖 **Documentation:** [Wiki](https://github.com/KingReaper6940/CursorEnhancer/wiki)

---

<div align="center">

**Made with ❤️ for the developer community**

[⭐ Star on GitHub](https://github.com/KingReaper6940/CursorEnhancer) • [🐛 Report Bug](https://github.com/KingReaper6940/CursorEnhancer/issues) • [💡 Request Feature](https://github.com/KingReaper6940/CursorEnhancer/issues)

</div>
