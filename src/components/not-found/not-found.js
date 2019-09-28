import React from 'react';
import {Button} from 'antd-mobile'
class notFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                 <h2 style={{"textAlign":"center"}}>抱歉，找不到改页面 </h2>
            <Button type="primary" onClick={()=>this.props.history.replace("/")}>回到首页</Button>
            </div>
           
        );
    }
}

export default notFound ;