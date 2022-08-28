import { IViewHandler, vcomponent } from "@viewlet-core";
// import React from "react";
//ts-jest에서 import하지 못해 아래와 같이 변경
import * as React from 'react';



@vcomponent()
class SimpleComponent3 extends React.Component<any, any> {

    click = async () => {
        const status = await this.props.viewHandler.confirm("?");
        if (status) {
            alert("1")
        } else {
            alert(0);
        }
    }

    render() {
        return <div onClick={this.click}>simple333</div>
    }

    componentDidMount(): void {
        this.props.onDidMount();
    }

}