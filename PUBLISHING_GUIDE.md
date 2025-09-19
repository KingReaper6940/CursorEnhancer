# 📦 Publishing Guide - VS Code Marketplace

## 🎯 **Steps to Publish Your Extension**

### **Step 1: Create Publisher Account**
1. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click **"Create Publisher"**
4. Choose a unique **Publisher ID** (this will be your namespace)
5. Fill in your details and create the account

### **Step 2: Update Extension Details**
Before publishing, update these files with your information:

#### **package.json**
- Replace `"your-publisher-id"` with your actual publisher ID
- Replace `"Your Name"` with your real name
- Replace `"your.email@example.com"` with your email
- Replace `"yourusername"` with your GitHub username

#### **LICENSE**
- Replace `[Your Name]` with your actual name
- Replace `[your.email@example.com]` with your contact email

### **Step 3: Install vsce (VS Code Extension Manager)**
```bash
npm install -g @vscode/vsce
```

### **Step 4: Login to Marketplace**
```bash
vsce login [your-publisher-id]
```
This will open a browser window for authentication.

### **Step 5: Package and Publish**
```bash
# Package the extension
vsce package

# Publish to marketplace
vsce publish
```

### **Step 6: Verify Publication**
1. Go to [VS Code Marketplace](https://marketplace.visualstudio.com/)
2. Search for your extension name
3. Verify it appears with your publisher name

## 🔒 **Proprietary License Benefits**

Your extension now has:
- ✅ **Personal use only** - Users can install and use personally
- ❌ **No commercial use** - Cannot be used in commercial projects
- ❌ **No redistribution** - Users cannot share or resell
- ❌ **No modification** - Users cannot create derivative works
- ✅ **Your copyright** - Full ownership and control

## 📋 **Pre-Publishing Checklist**

- [ ] Publisher account created
- [ ] package.json updated with your details
- [ ] LICENSE file updated with your name/email
- [ ] Extension tested and working
- [ ] README.md updated (optional)
- [ ] vsce installed globally
- [ ] Logged into marketplace

## 🚨 **Important Notes**

1. **Publisher ID**: Choose carefully - it becomes part of your extension's URL
2. **Version Numbers**: Use semantic versioning (1.0.0, 1.0.1, etc.)
3. **Updates**: Use `vsce publish` to update existing extensions
4. **Unpublishing**: You can unpublish within 30 days of first publication

## 🎉 **After Publishing**

Your extension will be available at:
`https://marketplace.visualstudio.com/items?itemName=[your-publisher-id].cursor-prompt-enhancer`

Users can install it with:
```bash
code --install-extension [your-publisher-id].cursor-prompt-enhancer
```

## 📞 **Support**

- **VS Code Marketplace Docs**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **vsce Documentation**: https://github.com/microsoft/vscode-vsce
- **Marketplace Support**: https://marketplace.visualstudio.com/support
