// global context
// ViewletContext 생성 및 관리
import { Disposable, IDisposable } from "../base/disposable";
import { Observable } from "../base/observable";
import { ViewletContext,IViewletContextDestroyEvent  } from "./viewlet_context";

export class ApplicationContext extends Disposable {

    private contexts: ViewletContext[] = [];

    private _onDestroyViewletContext = this.register(new Observable<IViewletContextDestroyEvent>())
    public onDestroyViewletContext = this._onDestroyViewletContext.subscribe;

    createViewletContext(uuid?: string): ViewletContext {
        const context = new ViewletContext(uuid);
        context.onDestroy((e) => {
            this.unregister(e.uuid);
        })
        //DisposibleStore를 ApplciationContext에서 직접 관리하면 따로 contexts 관리할 필요없다.
        // this.register(context)
        this.contexts.push(context);
        return context;
    }

    getAllViewletContext() {
        return this.contexts;
    }

    unregister(uuid: string) {
        const index = this.contexts.findIndex( _ => _.uuid == uuid);
        if (index > -1) {
            this.contexts.splice(index, 1)
            this._onDestroyViewletContext.notify({ uuid: uuid });
        }
    }

    destroy() {
        this.contexts.slice().forEach(c => c.dispose());
        this.contexts = null;
        this.dispose();
    }
}
