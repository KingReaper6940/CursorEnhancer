# 📦 Publishing Guide - VS Code Marketplace

## 🎯 **Steps to Publish Your Extension**

### **Step 1: Create Publisher Account**
1. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click **"Create Publisher"**
4. Choose a unique **Publisher ID** (this will be your namespace)
5. Fill in your details and create the account

### **Step 2: Extension Details (Already Updated)**
The extension files have been updated with your information:

#### **package.json**
- Publisher ID: `vrishnviswa`
- Author: `Vrishn Viswa Sathyamoorthy`
- Email: `vrishnviswa.sathyamoorthy@gmail.com`
- Repository: `https://github.com/KingReaper6940/CursorEnhancer.git`

#### **LICENSE**
- Copyright: `Vrishn Viswa Sathyamoorthy`
- Contact: `vrishnviswa.sathyamoorthy@gmail.com`

### **Step 3: Install vsce (VS Code Extension Manager)**
```bash
npm install -g @vscode/vsce
```

### **Step 4: Login to Marketplace**
```bash
vsce login vrishnviswa
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
`https://marketplace.visualstudio.com/items?itemName=vrishnviswa.cursor-prompt-enhancer`

Users can install it with:
```bash
code --install-extension vrishnviswa.cursor-prompt-enhancer
```

## 📞 **Support**

- **VS Code Marketplace Docs**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **vsce Documentation**: https://github.com/microsoft/vscode-vsce
- **Marketplace Support**: https://marketplace.visualstudio.com/support
