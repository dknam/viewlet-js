import "../../src/executable/http_client";

import { ExecutableRegistryKey, executableRegistry, IHttpClientResultData, IHttpClientOptions } from "../../src/base/executable";
import { ViewletContext } from "../../src/context/viewlet_context";

test("executable", async () => {
	const HttpClient = executableRegistry.get(ExecutableRegistryKey.IHttpClient);
	const httpClient = new HttpClient({} as ViewletContext, {});
	await httpClient.execute({
		resolve: (result) => {
			expect(result.data).toBe("test");
		},
		reject: (result) => {},
	});
});

test("executable invoke", async () => {
	const context = new ViewletContext();
	const HttpClient = executableRegistry.get(ExecutableRegistryKey.IHttpClient);
	const result = await context.invoke<IHttpClientResultData<string>, IHttpClientOptions>(HttpClient, {url: ""});
	expect(context.executables.length).toBe(0);
    expect(result.data).toBe("test");
});

test("executable uncomplete", async () => {
	const context = new ViewletContext();
	const HttpClient = executableRegistry.get(ExecutableRegistryKey.IHttpClient);
	setTimeout(() => {
		expect(context.executables.length).toBe(1);
	}, 0);
	context.invoke<IHttpClientResultData<string>, IHttpClientOptions>(HttpClient, { url: "", wait: true });
});
