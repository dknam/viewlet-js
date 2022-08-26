// 주요한 로직의 라이프 사이클을 관리하기 위한 인터페이스
// DI를 위한 인터페이스
// 현재는 Executable이 Disposable일 필요는 없다.
// viewlet_context에서 Executable을 위한 DissposableStore를 만들때 유효하다.

import { ViewletContext } from "../../context/viewlet_context";
import { Disposable, IDisposable } from "../disposable";
import { IObservableSubscribe, Observable } from "../observable";

export type TExecutableResult<TData = any> = { data: TData; error?: { message: string } };

export interface IExecutableResolver<TData = any> {
	resolve: (result: TExecutableResult<TData>) => void;
	reject: (result: TExecutableResult<TData>) => void;
}

export interface IExecutable extends IDisposable {
	new (context: ViewletContext, options?: any): Executable;
	execute(resolver: IExecutableResolver): Promise<void>;
	onComplete(): IObservableSubscribe<IExecutableCompletedEvent>;
}

export interface IExecutableCompletedEvent {
	name: string;
}

export abstract class Executable<TOptions = {}> extends Disposable {
	protected name: string = null;

	constructor(public context: ViewletContext, protected options: TOptions) {
		super();
	}
	abstract execute(resolver: IExecutableResolver): Promise<void>;

	private _onComplete = this.register(new Observable<IExecutableCompletedEvent>());
	public onComplete = this._onComplete.subscribe;

	public complete() {
		this._onComplete.notify({
			name: this.name,
		});
	}
}

export class ExecutableResolverHandler<TData = any> {
	constructor(private ins: Executable, private resolver: IExecutableResolver<TData>) {}

	resolve(result: any) {
		this.ins.complete();
		this.resolver.resolve(result);
	}

	reject(result: any) {
		this.ins.complete();
		this.resolver.reject(result);
	}
}
