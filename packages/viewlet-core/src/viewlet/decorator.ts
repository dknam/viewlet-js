import { viewletRegistry } from "./registry";
import { IViewHandler } from "./view_handler";

export const enum VIEWLET_TYPE {
    REACT = "react"
}

export const viewlet = function(type: VIEWLET_TYPE, viewHandler: IViewHandler) {
    return function (target: any) {
        viewletRegistry.set(type, {
            viewlet: target,
            viewHandler
        });
    };
}

