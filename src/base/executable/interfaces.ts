import { ComponentClass } from "react";

export const ExecutableRegistryKey = {
    IHttpClient: "IHttpClient",
	IComponentLoader: "IComponentLoader"
}

interface IExecutableResultData {

}

export interface IHttpClientOptions {
    url: string;
    wait?: boolean;
}
export type IHttpClientResultData<TData = any> = TData;

export interface IComponentLoaderOptions {
    url: string;
    name: string;
}
export interface IComponentLoaderResultData {
    component: ComponentClass<any, any>
}