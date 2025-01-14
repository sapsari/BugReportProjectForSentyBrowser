// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {
	BrowserClient,
	defaultStackParser,
	getDefaultIntegrations,
	makeFetchTransport,
	Scope,
  } from "@sentry/browser";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sentry-error" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('sentry-error.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from sentry-error!');
	});




	// filter integrations that use the global variable
const integrations = getDefaultIntegrations({}).filter((defaultIntegration) => {
	return ![
	  "BrowserApiErrors",
	  "Breadcrumbs",
	  "GlobalHandlers",
	].includes(defaultIntegration.name);
  });
  
  const client = new BrowserClient({
	dsn: "___PUBLIC_DSN___",
	transport: makeFetchTransport,
	stackParser: defaultStackParser,
	integrations: integrations,
  });
  
  const scope = new Scope();
  scope.setClient(client);
  
  client.init(); // initializing has to be done after setting the client on the scope
  
  // You can capture exceptions manually for this client like this:
  scope.captureException(new Error("example"));




	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
