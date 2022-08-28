import { Disposable, Observable } from "../base";
import { ViewletContext } from "../context";
import { VIEWLET_TYPE } from "./decorator";
import { IViewHandler } from "./view_handler";


export interface IViewletOptions {
    type: VIEWLET_TYPE;
	url: string;
	name: string;
    parentElement?: string;
}

export abstract class Viewlet extends Disposable {

    private _onReady = this.register(new Observable())

    constructor(public context: ViewletContext, public viewHandler: IViewHandler, public options: IViewletOptions) {
        super();
    }

    abstract mount(): void;

    unmount(): void {

    }
}