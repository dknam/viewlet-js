import "../../src/executable/component_loader";
import "../../../viewlet-application/src/components/simple_component";

import { ViewletContext } from "@viewlet-core";
import { executableRegistry, ExecutableRegistryKey } from "@viewlet-core";
import { IComponentLoaderOptions, IComponentLoaderResultData } from "@viewlet-core";

test("executable invoke", async () => {
	const context = new ViewletContext();
	const ComponentLoader = executableRegistry.get(ExecutableRegistryKey.IComponentLoader);
	const result = await context.invoke<IComponentLoaderResultData, IComponentLoaderOptions>(ComponentLoader, {
		url: "",
		name: "SimpleComponent",
	});
	const component = result.data.component as any;
	expect((result.data.component as any).name).toBe("SimpleComponent");
});
