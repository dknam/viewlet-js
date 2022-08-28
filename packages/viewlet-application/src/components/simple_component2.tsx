import { vcomponent } from "@viewlet-core";
// import React from "react";
//ts-jest에서 import하지 못해 아래와 같이 변경
import * as React from 'react';

@vcomponent()
class SimpleComponent2 extends React.Component<{onDidMount: any}> {

    render() {
        return <div>simple222</div>
    }

    componentDidMount(): void {
        this.props.onDidMount();
    }

}