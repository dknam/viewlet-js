import { Executable, executable, ExecutableRegistryKey, IExecutableResolver } from "../base/executable";
import { IComponentLoaderOptions, IComponentLoaderResultData } from "../base/executable/interfaces";
import { componentRegistry } from "../components/registry";
import { ViewletContext } from "../context/viewlet_context";

@executable(ExecutableRegistryKey.IComponentLoader)
class ComponentLoader extends Executable<IComponentLoaderOptions> {
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
