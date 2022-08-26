import { Executable, executable, ExecutableRegistryKey, IExecutableResolver } from "@viewlet-core";
import { IComponentLoaderOptions, IComponentLoaderResultData } from "@viewlet-core";
import { componentRegistry } from "@viewlet-core";
import { ViewletContext } from "@viewlet-core";

@executable(ExecutableRegistryKey.IComponentLoader)
export class ComponentLoader extends Executable<IComponentLoaderOptions> {
	public name = "ComponentLoader";

	constructor(context: ViewletContext, options: any = {}) {
		super(context, options);
	}

	async execute(resolver: IExecutableResolver<IComponentLoaderResultData>): Promise<void> {
		const name = this.options.name;
		if (componentRegistry.has(name)) {
			resolver.resolve({
				data: { component: componentRegistry.get(name) },
			});
		} else {
			const script = document.createElement("script");
			script.onload = () => {
				resolver.resolve({
                    data: { component: componentRegistry.get(name) },
				});
			};

			script.src = this.options.url;
			document.head.appendChild(script); //or something of the likes
		}
	}
}
