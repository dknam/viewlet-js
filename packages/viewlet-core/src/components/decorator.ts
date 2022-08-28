import { componentRegistry } from "./registry";

export const vcomponent = function() {
    return function (target: any) {
        componentRegistry.set(target.name, target);
    };
}

