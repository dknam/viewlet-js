import { Disposable, IDisposable } from "../base/disposable";
import { Executable, ExecutableResolverHandler, IExecutable, TExecutableResult } from "../base/executable";
import { Observable } from "../base/observable";
import { IViewletOptions, Viewlet, viewletRegistry, VIEWLET_TYPE } from "../viewlet";

export interface IViewletContextDestroyEvent {
	uuid: string;
}

export interface IViewletContextLoadEvent {
	uuid: string;
}

// 현재는 ViewletContxt가 Disposable일 필요는 없다.
// application_context에서 viewlet_context를 위한 DissposableStore를 만들때 유효하다.
export class ViewletContext extends Disposable {
	public executables: Executable[] = [];

	private _onDestroy = this.register(new Observable<IViewletContextDestroyEvent>());
	public onDestroy = this._onDestroy.subscribe;

	private _onLoaded = this.register(new Observable<IViewletContextLoadEvent>());
	public onLoaded = this._onLoaded.subscribe;

	constructor(public uuid: string = Date.now().toString()) {
		super();
	}

	public invoke<TData = any, TOptions = any>(executable: IExecutable, options: TOptions): Promise<TExecutableResult<TData>> {
		return new Promise((resolve, reject) => {
			const ins = new executable(this, options);
			const removeIndex = this.executables.length;
			this.executables.push(ins);
			ins.onComplete(() => {
				this.executables.splice(removeIndex, 1);
			});
			const handler = new ExecutableResolverHandler(ins, { resolve, reject });
			ins.execute(handler);
		});
	}

	public getViewlet(type: VIEWLET_TYPE, viewletOptions: IViewletOptions): Viewlet {
		const target = viewletRegistry.get(type);
		return new target.viewlet(this, new target.viewHandler(), viewletOptions);
	}

	public async mountViewlet(viewlet: Viewlet) {
		await viewlet.mount();
		this._onLoaded.notify({
			uuid: this.uuid
		})
	}

	public dispose(): void {
		this._onDestroy.notify({
			uuid: this.uuid,
		});
		super.dispose();
	}

	public destroy() {
		this.dispose();
	}
}
