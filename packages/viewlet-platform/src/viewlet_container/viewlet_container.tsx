import { GET_APPLICATION_CONTEXT, IViewletOptions } from "@viewlet-core";
import React from "react";
import { connect, Provider } from "react-redux";
import { Viewer } from "./viewer";

interface IUIContainerState {
}

interface IUIContainerProps {
    viewers?: { context_uuid: string, viewletOptions: IViewletOptions }[];
	confirms?: {context_uuid: string, message: string}[];
	viewRenderer: any;
}

const Confirm = (props: any) => {

	function click(event: any) {
		props.click(event.target.id, props.context_uuid)
	}

	return (
		<div>
			<div>
				<div>{props.message}</div>
			</div>
			<div>
				<button id="1" onClick={click}>확인</button>
				<button id="0" onClick={click}>취소</button>
			</div>
		</div>
	)
}



class Container extends React.Component<IUIContainerProps, IUIContainerState> {
	constructor(props: IUIContainerProps) {
		super(props);
	}

	resolveConfirm(status: any, uuid:string) {
		GET_APPLICATION_CONTEXT().publishEvent({
			key: `confirm-${uuid}`,
			result: status
		})
	}
	
	renderConfirm = () => {
		return this.props.confirms?.map((confirm) => <Confirm key={confirm.context_uuid} {...confirm} click={this.resolveConfirm} />);
	};
	renderViewer = () => {
		return this.props.viewers?.map((viewer) => <Viewer key={viewer.context_uuid} {...viewer} />);
	};

	public render() {
		return <>{this.renderConfirm()}{this.renderViewer()}</>;
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
