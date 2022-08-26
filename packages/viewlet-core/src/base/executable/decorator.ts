import { executableRegistry } from "./registry";

export const executable = function(key: string) {
    return function (target: any) {
        executableRegistry.set(key, target);
    };
}

