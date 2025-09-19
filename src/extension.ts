import * as vscode from 'vscode';
import fetch from 'node-fetch';

interface EnhanceResponse {
    enhanced_prompt: string;
    success: boolean;
    error?: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Cursor Prompt Enhancer is now active!');

    // Register the enhance prompt command
    let disposable = vscode.commands.registerCommand('cursorEnhancer.enhancePrompt', async () => {
        try {
            await enhancePrompt();
        } catch (error) {
            vscode.window.showErrorMessage(`Enhancement failed: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function enhancePrompt(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    let selectedText = '';
    let hasSelection = false;

    // Check if there's selected text
    if (editor && !editor.selection.isEmpty) {
        selectedText = editor.document.getText(editor.selection);
        hasSelection = true;
    }

    // If no selection, prompt user for input
    if (!selectedText.trim()) {
        const userInput = await vscode.window.showInputBox({
            prompt: 'Enter the prompt you want to enhance',
            placeHolder: 'Type your prompt here...',
            ignoreFocusOut: true
        });

        if (!userInput) {
            return; // User cancelled
        }

        selectedText = userInput;
        hasSelection = false;
    }

    // Show progress while enhancing
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Enhancing prompt...",
        cancellable: false
    }, async (progress) => {
        try {
            // Get API URL from configuration
            const config = vscode.workspace.getConfiguration('cursorEnhancer');
            const apiUrl = config.get<string>('apiUrl', 'http://localhost:3000/api/enhance');

            // Call backend API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: selectedText
                }),
                timeout: 30000 // 30 second timeout
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const result: EnhanceResponse = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Enhancement failed');
            }

            // Ask user what to do with enhanced prompt
            const action = await vscode.window.showQuickPick([
                {
                    label: '$(replace) Replace Selection',
                    description: 'Replace the selected text with enhanced prompt',
                    action: 'replace'
                },
                {
                    label: '$(new-file) Open New Document',
                    description: 'Open enhanced prompt in a new document',
                    action: 'newDoc'
                }
            ], {
                placeHolder: 'What would you like to do with the enhanced prompt?'
            });

            if (!action) {
                return; // User cancelled
            }

            if (action.action === 'replace' && hasSelection && editor) {
                // Replace selected text
                await editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, result.enhanced_prompt);
                });
                vscode.window.showInformationMessage('Prompt enhanced and replaced!');
            } else {
                // Open in new document
                const newDoc = await vscode.workspace.openTextDocument({
                    content: result.enhanced_prompt,
                    language: 'markdown'
                });
                await vscode.window.showTextDocument(newDoc);
                vscode.window.showInformationMessage('Enhanced prompt opened in new document!');
            }

        } catch (error) {
            let errorMessage = 'Unknown error occurred';
            
            if (error instanceof Error) {
                if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
                    errorMessage = 'Cannot connect to enhancement backend. Make sure the server is running on the configured URL.';
                } else {
                    errorMessage = error.message;
                }
            }

            vscode.window.showWarningMessage(`Enhancement failed: ${errorMessage}`);
            console.error('Enhancement error:', error);
        }
    });
}

export function deactivate() {
    console.log('Cursor Prompt Enhancer deactivated');
}
