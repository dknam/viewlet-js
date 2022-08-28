import { GET_APPLICATION_CONTEXT, IViewletOptions, ViewletContext } from '@viewlet-core';
import React from 'react';

interface IViewerProps {
	key: string;
    context_uuid: string;
    viewletOptions: IViewletOptions;
}

interface IViewerState {}

export class Viewer extends React.Component<IViewerProps, IViewerState> {
	private context_uuid: string;
	private id: string;
    private viewletContext: ViewletContext;

	constructor(props: IViewerProps) {
		super(props);
		this.context_uuid = this.props.context_uuid;        
		this.id = this.props.key || `viewer_${Date.now()}`;
        this.viewletContext = GET_APPLICATION_CONTEXT().getViewletContext(this.context_uuid);
	}

	public async componentDidMount(): Promise<void> {
		const viewletOptions = Object.assign(
			{
				parentElement: `#${this.id}`,
			},
			this.props.viewletOptions
		);

        const viewlet = this.viewletContext.getViewlet(this.props.viewletOptions.type, viewletOptions);
		await this.viewletContext.mountViewlet(viewlet);
	}

	public componentWillUnmount() {
		
	}

	private renderViewer() {
		return <div className="ecviewer" id={this.id}></div>;
	}

	public render() {
		return <div>{this.renderViewer()}</div>;
	}
}
