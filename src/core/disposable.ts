/**
 * Original Code
 * https://github.com/dknam/vscode/blob/master/src/vs/base/common/lifecycle.ts
 */

import { Observable, IObservableOptions, IObservable } from "./observable";
import { DisposableStore } from './disposable_store';


export type IDisposableObserver = (e: IDestroyEvent) => void;

export interface IDisposable {
	// _store: any;
	register?<T extends IDisposable>(t: T): T;
	unregister?(filter: Function | IDisposable): void;
	// onDispose(observer: IDisposableObserver): void;
	reset?(): void
	dispose(): void;
}

export interface IDestroyEvent {
	contextID?: string;
	uuid: string;
}
  


export class Disposable implements IDisposable {
	public uuid: string;
	readonly _store = new DisposableStore();
	
	constructor() {
		// trackDisposable(this);
	}

    protected createObservable<T>(options?: IObservableOptions): IObservable<T> {
		return this.register(new Observable<T>(options));
	}

	public register<T extends IDisposable>(t: T): T {
		if ((t as any as Disposable) === this) {
			throw new Error('Cannot register a disposable on itself!');
		}
		return this._store.add(t);
	}

	public unregister(filter: Function | IDisposable): void {
		if(typeof filter === "function"){
			this._store.remove(filter);
		}else{
			this._store.remove(item => item === filter);
		}
	}

	public dispose(): void {
		this._store.dispose();
	}

	public reset(): void {
		this._store.reset()
	}
}
