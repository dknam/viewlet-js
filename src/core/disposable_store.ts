/**
 * Original Code
 * https://github.com/dknam/vscode/blob/master/src/vs/base/common/lifecycle.ts
 */

import { IDisposable } from "./disposable";

export class DisposableStore implements IDisposable {
	public _toDispose = new Set<IDisposable>();
	private _isDisposed = false;

	/**
	 * Dispose of all registered disposables and mark this object as disposed.
	 *
	 * Any future disposables added to this object will be disposed of on `add`.
	 */
	public dispose(): void {
		if (this._isDisposed) {
			return;
		}

		// markTracked(this);
		this._isDisposed = true;
		this.clear();
	}

	/**
	 * Dispose of all registered disposables but do not mark this object as disposed.
	 */
	public clear(): void {
		this._toDispose.forEach(item => item.dispose());
		this._toDispose.clear();
	}

	public reset(): void {
		this._toDispose.forEach(item => item.reset?.());
		// this._toDispose.clear();
	}

	public add<T extends IDisposable>(t: T): T {
		if (!t) {
			return t;
		}

		if (this._isDisposed) {
			console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
		} else {
			this._toDispose.add(t);
		}

		return t;
	}

	public remove(filter: Function): void {
		this._toDispose.forEach(item => {
			if(filter(item)) {
				item.dispose();
				this._toDispose.delete(item);
			}
		});
	}

	public get(filter: Function): IDisposable {
		let _item: IDisposable;
		this._toDispose.forEach(item => {
			if(filter(item)){
				_item = item;
				return false;
			}
		});
		return _item;
	}

}
