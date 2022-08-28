/**
 * Original Code
 * https://github.com/dknam/vscode/blob/master/src/vs/base/common/errors.ts
 */

const canceledName = 'Canceled';

export function isPromiseCanceledError(error: any): boolean {
	return error instanceof Error && error.name === canceledName && error.message === canceledName;
}

function unexpectedErrorHandler (e: any) {
    // setTimeout(() => {
        if (e.stack) {
            throw new Error(e.message + '\n\n' + e.stack);
        }

        throw e;
    // }, 0);
};

export function onUnexpectedError(e: any): undefined {
	// ignore errors from cancelled promises
	if (!isPromiseCanceledError(e)) {
		unexpectedErrorHandler(e);
	}
	return undefined;
}

export class BaseError {

    public done: boolean;
    public stack: any;
    public title: any;

    constructor(public error: any){
        this.stack = error.stack;
        this.title = error.message;   
    }
}