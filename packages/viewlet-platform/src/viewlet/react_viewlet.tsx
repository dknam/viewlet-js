import {
	componentRegistry,
	executableRegistry,
	ExecutableRegistryKey,
	IComponentLoaderOptions,
	IComponentLoaderResultData,
	IViewHandler,
	Viewlet,
	viewlet,
	ViewletContext,
	VIEWLET_TYPE,
} from "@viewlet-core";

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ViewHandler } from '../viewlet_container/view_handler'


@viewlet(VIEWLET_TYPE.REACT, ViewHandler as unknown as IViewHandler)
export class ReactViewlet extends Viewlet {

    private _parentElement: HTMLElement;

	async mount(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const ComponentLoder = executableRegistry.get(ExecutableRegistryKey.IComponentLoader);
            const result = await this.context.invoke<IComponentLoaderResultData, IComponentLoaderOptions>(ComponentLoder, { name: this.options.name, url: this.options.url });
            const Component = result.data.component;
    
            this._parentElement = document.querySelector(this.options.parentElement);;
    
            ReactDOM.render(
                <Component
                    context={this.context}
                    // viewHandler={this.context.getViewHandler()}
                    // contextID={this.context.contextID}
                    onDidMount={resolve}
                />,
                this._parentElement
            )
        })
	}
}
