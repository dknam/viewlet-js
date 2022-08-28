/**
 * Original Code
 * https://github.com/microsoft/vscode/blob/main/src/vs/base/common/lifecycle.ts
 */

export interface IDisposable {
	dispose(): void;
}

export class DisposableStore implements IDisposable {
	private _toDispose = new Set<IDisposable>();
	private _isDisposed = false;

	constructor() {	}

	/**
	 * Returns `true` if this object has been disposed
	 */
	public get isDisposed(): boolean {
		return this._isDisposed;
	}

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

	public add<T extends IDisposable>(o: T): T {
		if (!o) {
			return o;
		}

		if (this._isDisposed) {
			console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
		} else {
			this._toDispose.add(o);
		}

		return o;
	}
}

export class Disposable implements IDisposable {

	protected readonly _store = new DisposableStore();

	constructor() {
	}

	public dispose(): void {
		this._store.dispose();
	}

	public register<T extends IDisposable>(t: T): T {
		if ((t as any as Disposable) === this) {
			throw new Error('Cannot register a disposable on itself!');
		}
		return this._store.add(t);
	}
}
