// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Terminals} from './terminal';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed



export function activate(context: vscode.ExtensionContext) {

	console.log('Dotnet Schematics is now active!');

	Terminals.init();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dotnetschematics.generateController', async (contextUri?:vscode.Uri) => {
		// The code you place here will be executed every time your command is executed

		if (contextUri) {

            /* 1. If there is a context URI, current workspace folder can be resolved from it */
			var prueba : string[] = ["Mvc", "WebApi"];
			
			let folderName : vscode.WorkspaceFolder | undefined;
			folderName = vscode.workspace.getWorkspaceFolder(contextUri);
			
			const nameInput = await vscode.window.showInputBox({
				prompt: 'Choose de name, only name',
				placeHolder: 'Name',
				ignoreFocusOut: true,
			});

			const quickPick = vscode.window.createQuickPick();

			const typeChoice = await vscode.window.showQuickPick(prueba, {
            	placeHolder: `What type of controller do you want?`,
            	ignoreFocusOut: true,
        	});

			const folder = await vscode.window.showInputBox({
				prompt: 'Choose de folder',
				placeHolder: 'Controllers',
				ignoreFocusOut: true,
			});

			if (folderName !== undefined) {
				Terminals.send(folderName,`dotnet aspnet-codegenerator controller -api -name ${nameInput} -outDir ${folder}`);
			}

			
			
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {

	Terminals.disposeAll();
}
