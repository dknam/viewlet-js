import { Executable, executable, ExecutableRegistryKey, IExecutableResolver } from "../base/executable";
import { IHttpClientOptions, IHttpClientResultData } from "../base/executable/interfaces";

@executable(ExecutableRegistryKey.IHttpClient)
class HttpClient extends Executable<IHttpClientOptions> {
    public name = "HttpClient";
    async execute(resolver: IExecutableResolver<IHttpClientResultData<any>>): Promise<void> {
        if (this.options.wait !== true) {
            resolver.resolve({
                data: "test"
            })
        }
    }
}


