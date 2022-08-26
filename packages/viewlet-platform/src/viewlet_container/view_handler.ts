import { IViewHandler } from "@viewlet-core";

export class ViewHandler implements IViewHandler {

    constructor(private viewRenderer: any) {}

    async alert(message: string): Promise<void> {
        this.viewRenderer.dispatch({
            type: "OPEN_ALERT",
        })
    }
}