import { IViewHandler, ViewletContext } from "@viewlet-core";

export class ViewHandler implements IViewHandler {

    constructor(private context: ViewletContext, @ViewHalder private viewRenderer: any) {}

    async alert(message: string): Promise<void> {
        this.viewRenderer.dispatch({
            type: "OPEN_ALERT",
        })
    }
    
    confirm(message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.viewRenderer.dispatch({
                type: "ADD_CONFIRM",            
                confirm: {
                    context_uuid: this.context.uuid,
                    message
                }
            });
            this.context.onDestroy(() => {
                this.viewRenderer.dispatch({
                    type: "REMOVE_CONFIRM"
                })
            })

            this.context.subcribe({
                key: `confirm-${this.context.uuid}`,
                resolve: (result: any) => {
                    resolve(result);
                }
            })

        })
        
    }
}