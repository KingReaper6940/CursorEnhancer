import * as vscode from 'vscode';

const ENHANCEMENT_SYSTEM_PROMPT = `You are a prompt enhancement specialist. Your job is to take user prompts and make them clearer, more detailed, and better structured for AI code generation.

When enhancing prompts, you should:
1. Add missing context (programming language, framework, libraries)
2. Clarify vague requirements
3. Structure the request logically
4. Add expected output format details
5. Include error handling requirements if applicable
6. Make assumptions explicit
7. Add relevant constraints or best practices

Keep the enhanced prompt focused and actionable. Don't make it unnecessarily long, but ensure it's comprehensive enough for high-quality AI responses.

Return only the enhanced prompt text, nothing else.`;

export function activate(context: vscode.ExtensionContext) {
    console.log('✨ Cursor Prompt Enhancer is now active!');

    // Register commands
    const enhancePromptCmd = vscode.commands.registerCommand('cursorEnhancer.enhancePrompt', () => enhancePrompt());
    const enhanceSelectionCmd = vscode.commands.registerCommand('cursorEnhancer.enhanceSelection', () => enhanceSelection());

    context.subscriptions.push(enhancePromptCmd, enhanceSelectionCmd);

    // Show welcome message on first install
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    if (!hasShownWelcome) {
        vscode.window.showInformationMessage(
            '✨ Cursor Prompt Enhancer installed! Set your OpenAI API key in settings to get started.',
            'Open Settings'
        ).then(selection => {
            if (selection === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'cursorEnhancer');
            }
        });
        context.globalState.update('hasShownWelcome', true);
    }
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
            prompt: '✨ Enter the prompt you want to enhance',
            placeHolder: 'e.g., make a todo app, create a login form...',
            ignoreFocusOut: true
        });

        if (!userInput) {
            return; // User cancelled
        }

        selectedText = userInput;
        hasSelection = false;
    }

    await performEnhancement(selectedText, hasSelection, editor);
}

async function enhanceSelection(): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor || editor.selection.isEmpty) {
        vscode.window.showInformationMessage('Please select some text to enhance first!');
        return;
    }

    const selectedText = editor.document.getText(editor.selection);
    await performEnhancement(selectedText, true, editor);
}

async function performEnhancement(promptText: string, hasSelection: boolean, editor?: vscode.TextEditor): Promise<void> {
    // Check if API key is configured
    const config = vscode.workspace.getConfiguration('cursorEnhancer');
    const apiKey = config.get<string>('openaiApiKey', '');
    
    if (!apiKey) {
        const action = await vscode.window.showErrorMessage(
            'OpenAI API key not configured. Please add your API key in settings.',
            'Open Settings'
        );
        if (action === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'cursorEnhancer.openaiApiKey');
        }
        return;
    }

    // Show progress while enhancing
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "✨ Enhancing prompt with AI...",
        cancellable: true
    }, async (progress, token) => {
        try {
            const model = config.get<string>('model', 'gpt-4o-mini');
            const maxTokens = config.get<number>('maxTokens', 1000);

            progress.report({ increment: 20, message: 'Calling OpenAI API...' });

            // Call OpenAI API directly
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: ENHANCEMENT_SYSTEM_PROMPT
                        },
                        {
                            role: 'user',
                            content: `Please enhance this prompt:\n\n${promptText}`
                        }
                    ],
                    max_tokens: maxTokens,
                    temperature: 0.3
                })
            });

            if (token.isCancellationRequested) {
                return;
            }

            progress.report({ increment: 60, message: 'Processing response...' });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenAI API error (${response.status}): ${errorData.error?.message || response.statusText}`);
            }

            const result = await response.json();
            const enhancedPrompt = result.choices[0]?.message?.content?.trim();

            if (!enhancedPrompt) {
                throw new Error('No enhanced prompt received from OpenAI');
            }

            progress.report({ increment: 90, message: 'Enhancement complete!' });

            // Ask user what to do with enhanced prompt
            const action = await vscode.window.showQuickPick([
                {
                    label: '$(replace) Replace Text',
                    description: hasSelection ? 'Replace the selected text' : 'Insert at cursor',
                    action: 'replace'
                },
                {
                    label: '$(new-file) New Document',
                    description: 'Open enhanced prompt in a new document',
                    action: 'newDoc'
                },
                {
                    label: '$(copy) Copy to Clipboard',
                    description: 'Copy enhanced prompt to clipboard',
                    action: 'copy'
                }
            ], {
                placeHolder: '✨ What would you like to do with the enhanced prompt?'
            });

            if (!action) {
                return; // User cancelled
            }

            switch (action.action) {
                case 'replace':
                    if (hasSelection && editor) {
                        await editor.edit(editBuilder => {
                            editBuilder.replace(editor.selection, enhancedPrompt);
                        });
                        vscode.window.showInformationMessage('✨ Prompt enhanced and replaced!');
                    } else if (editor) {
                        await editor.edit(editBuilder => {
                            editBuilder.insert(editor.selection.active, enhancedPrompt);
                        });
                        vscode.window.showInformationMessage('✨ Enhanced prompt inserted!');
                    }
                    break;
                    
                case 'newDoc':
                    const newDoc = await vscode.workspace.openTextDocument({
                        content: enhancedPrompt,
                        language: 'markdown'
                    });
                    await vscode.window.showTextDocument(newDoc);
                    vscode.window.showInformationMessage('✨ Enhanced prompt opened in new document!');
                    break;
                    
                case 'copy':
                    await vscode.env.clipboard.writeText(enhancedPrompt);
                    vscode.window.showInformationMessage('✨ Enhanced prompt copied to clipboard!');
                    break;
            }

        } catch (error) {
            let errorMessage = 'Unknown error occurred';
            
            if (error instanceof Error) {
                if (error.message.includes('401')) {
                    errorMessage = 'Invalid OpenAI API key. Please check your API key in settings.';
                } else if (error.message.includes('429')) {
                    errorMessage = 'OpenAI API rate limit exceeded. Please try again later.';
                } else if (error.message.includes('insufficient_quota')) {
                    errorMessage = 'OpenAI API quota exceeded. Please check your billing.';
                } else if (error.message.includes('fetch')) {
                    errorMessage = 'Network error. Please check your internet connection.';
                } else {
                    errorMessage = error.message;
                }
            }

            vscode.window.showErrorMessage(`Enhancement failed: ${errorMessage}`);
            console.error('Enhancement error:', error);
        }
    });
}

export function deactivate() {
    console.log('✨ Cursor Prompt Enhancer deactivated');
}
