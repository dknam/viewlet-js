import { Disposable } from '../../src/base/disposable';
import { Observable } from '../../src/base/observable';


interface IDestroyEvent {
    uuid: string;
    cause?: string;
}

class SimpleContext extends Disposable {
    private uuid: string = "ctxt_01";
    private _onDestroy = this.register(new Observable<IDestroyEvent>());
    public onDestroy = this._onDestroy.subscribe;

    public destroy(cause?: string) {        
        this._onDestroy.notify({
            uuid: this.uuid,
            cause
        });
        expect(this._onDestroy._observers.length).toBe(2);
        this.dispose();
        expect(this._onDestroy._observers).toBe(null);
    }
}

test('simple disposable', () => {
    const context = new SimpleContext();
    context.onDestroy((e) => {
        expect(e.uuid).toBe("ctxt_01");
        expect(e.cause).toBe("system-error-001");
    })

    context.onDestroy((e) => {
        expect(e.uuid).toBe("ctxt_01");
        expect(e.cause).toBe("system-error-001");
    })

    // context.destroy();
    context.destroy("system-error-001");
});
