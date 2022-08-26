import { REGISTER_APPLICATION_CONTEXT } from "./base";
import { ApplicationContext } from "./context";
import { IViewletOptions, viewletRegistry, VIEWLET_TYPE } from "./viewlet";

export interface IViewletContainerProvider {
    mainContainer: any;
    store: any;
}

export interface IAppConfigurations {
    provider: IViewletContainerProvider;
    renderer: (provider: IViewletContainerProvider) => void;
}

export interface IRouteOptions {
    viewletOptions: IViewletOptions
}

export class ViewletApp {

    private appContext: ApplicationContext;

    constructor(private options: IAppConfigurations) {
        this.appContext = new ApplicationContext();
        REGISTER_APPLICATION_CONTEXT(this.appContext);
    }

    startUp() {
        this.options.renderer(this.options.provider);
    }

    async route(options: IRouteOptions) {
        return new Promise((resolve) => {
            const context = this.appContext.createViewletContext();
            context.onLoaded(resolve);
            
            this.options.provider.store.dispatch({
                type: "ADD_VIEWER",
                viewer: {
                    context_uuid: context.uuid,
                    viewletOptions: options.viewletOptions
                }
            })
        });
    }

}