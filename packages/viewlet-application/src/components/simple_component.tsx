import { vcomponent } from "@viewlet-core";
// import React from "react";
//ts-jest에서 import하지 못해 아래와 같이 변경
import * as React from 'react';

@vcomponent()
class SimpleComponent extends React.Component<{onDidMount: any}> {

    render() {
        return <div>simple</div>
    }

    componentDidMount(): void {
        this.props.onDidMount();
    }

}