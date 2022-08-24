/**
 * Original Code
 * https://github.com/dknam/vscode/blob/master/src/vs/base/common/event.ts
 */

import { DisposableStore } from "./disposable_store";
import { onUnexpectedError } from "./errors";
import { IDisposable } from "./disposable";

export interface IObservable<T> extends IDisposable {
	subscribe: IObservableSubscribe<T>;
	notify(event: T): void;
	notifyAsync(event: T): Promise<void>;
    notifyOnce(event: T): void;
	reset(): void;
}

//동작 안함..
export type IObservableSubscribe<T> = (observer: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | IDisposable) => void;

// declare interface IObservableSubscribe<T> {
// 	(observer: (e: T) => any, thisArgs?: any, disposables?: IDisposable[] | IDisposable): IDisposable;
// }

export interface IObservableOptions {
	onFirstListenerAdd?: Function;
	onFirstListenerDidAdd?: Function;
	onListenerDidAdd?: Function;
	onLastListenerRemove?: Function;
	leakWarningThreshold?: number;
	once?: boolean;
	uuid?: string;
}

/**
 * listeners linkedList로 만들 필요 있을까?
 */
export class Observable<T> {
	private static readonly _noop = function () {};

	private readonly _options?: IObservableOptions;
	private _disposed: boolean = false;
	protected _observers: any[] = [];
	private _observable?: IObservableSubscribe<T>;

	constructor(options?: IObservableOptions) {
		this._options = options;
	}

	get subscribe(): IObservableSubscribe<T> {
		if (!this._observable) {
			this._observable = (observer: (e: T) => any, onLast?: boolean, disposables?: IDisposable[] | IDisposable): IDisposable => {
				this._observers.push(!onLast ? observer : [observer, onLast]);
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
				if (disposables instanceof DisposableStore) {
					disposables.add(result);
				} else if (Array.isArray(disposables)) {
					disposables.push(result);
				}

				return result;
			};
		}
		return this._observable;
	}

	notify(event: T): void {
		const lastest = [];
		for (const observer of this._observers || []) {
			try {
				if (typeof observer === "function") {
					observer.call(undefined, event);
				} else {
					if (observer[1] === true) {
						lastest.push(observer[0]);
					} else {
						observer[0].call(observer[1], event);
					}
				}
			} catch (e) {
				onUnexpectedError(e);
			}
		}
		if (lastest.length) {
			for (const observer of lastest) {
				observer.call(undefined, event);
			}
		}
	}

	async notifyAsync(event: T): Promise<void> {
		const lastest = [];
		for (const observer of this._observers || []) {
			try {
				if (typeof observer === "function") {
					await observer.call(undefined, event);
				} else {
					if (observer[1] === true) {
						lastest.push(observer[0]);
					} else {
						await observer[0].call(observer[1], event);
					}
				}
			} catch (e) {
				onUnexpectedError(e);
			}
		}

		if (lastest.length) {
			for (const observer of lastest) {
				await observer.call(undefined, event);
			}
		}
	}

	notifyOnce(event: T): void {
		for (const observer of this._observers || []) {
			try {
				if (typeof observer === "function") {
					observer.call(undefined, event);
				}
			} catch (e) {
				onUnexpectedError(e);
			}
		}
        this._observers = [];
	}

	remove(index: number): void {
		if (this._observers[index] != undefined) {
			this._observers.splice(index, 1);
		}
	}

	reset() {
		this._observers = [];
	}

	dispose() {
		this._observers = null;
		this._disposed = true;
		this._observable = null;
	}
}
