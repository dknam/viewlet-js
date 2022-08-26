import "../../src/executable/component_loader";
import "../../src/components/simple_component";
import { ViewletContext } from "../../src/context/viewlet_context";
import { executableRegistry, ExecutableRegistryKey } from "../../src/base/executable";
import { IComponentLoaderOptions, IComponentLoaderResultData } from "../../src/base/executable/interfaces";

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
