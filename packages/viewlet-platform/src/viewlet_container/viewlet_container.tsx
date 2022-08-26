import { IViewletOptions } from "@viewlet-core";
import React from "react";
import { connect, Provider } from "react-redux";
import { Viewer } from "./viewer";

interface IUIContainerState {
}

interface IUIContainerProps {
    viewers?: { context_uuid: string; viewletOptions: IViewletOptions }[];
	viewRenderer: any;
}

class Container extends React.Component<IUIContainerProps, IUIContainerState> {
	constructor(props: IUIContainerProps) {
		super(props);
	}

	renderViewer = () => {
		return this.props.viewers?.map((viewer) => <Viewer key={viewer.context_uuid} {...viewer} />);
	};

	public render() {
		return <>{this.renderViewer()}</>;
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		dispatch: (action: any) => dispatch(action),
	};
};

const mapStateToProps = (state: any) => {
	return state;
};

const UIContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

interface IContainerProps {
	store?: any;
}
interface IContainerState {}

export class ViewletContainer extends React.PureComponent<IContainerProps, IContainerState> {
	public render(): any {
		return (
			<Provider store={this.props.store}>
				<UIContainer viewRenderer={this.props.store.dispatch} />
			</Provider>
		);
	}
}
