/**
 * Original Code
 * https://github.com/microsoft/vscode/blob/main/src/vs/base/common/observableImpl/base.ts
 */

import { onUnexpectedError } from "./errors";
import { IDisposable, DisposableStore } from "./disposable";

export interface IObservable<T> extends IDisposable {
	subscribe: IObservableSubscribe<T>;
	notify(event: T): void;
}

//동작 안함..
export type IObservableSubscribe<T> = (observer: (e: T) => any) => void;

// declare interface IObservableSubscribe<T> {
// 	(observer: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | IDisposable): IDisposable;
// }

export class Observable<T> {
	private static readonly _noop = function () {};

	private _disposed: boolean = false;
	
	//테스트 위해 임시로 변경
	// protected _observers: any[] = [];
	public _observers: any[] = [];

	private _observable?: IObservableSubscribe<T>;

	get subscribe(): IObservableSubscribe<T> {
		if (!this._observable) {
			this._observable = (observer: (e: T) => any): IDisposable => {
				this._observers.push(observer);
				const removableIndex = this._observers.length - 1;
				let result: IDisposable;
				result = {
					dispose: () => {
						result.dispose = Observable._noop;
						if (!this._disposed) {
							this.remove(removableIndex);
						}
					},
				};
				return result;
			};
		}
		return this._observable;
	}

	notify(event: T): void {
		for (const observer of this._observers || []) {
			try {
				observer.call(undefined, event);
			} catch (e) {
				onUnexpectedError(e);
			}
		}
	}

	private remove(index: number): void {
		if (this._observers[index] != undefined) {
			this._observers.splice(index, 1);
		}
	}

	dispose() {
		this._observers = null;
		this._disposed = true;
		this._observable = null;
	}
}
