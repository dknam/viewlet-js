import { ViewletContainer } from "./ViewletContainer";

export class Application {
	constructor(public _container: string) {}

	load() {
		ReactDOM.render(
            document.querySelector(`#${this._container}`), 
            <ViewletContainer />);
	}
}
