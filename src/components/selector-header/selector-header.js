import React from 'react';
import {Grid,List} from 'antd-mobile'

class selectorHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            icon:''
         };
    }
    headerChoose=({text, icon})=>{
        // console.log(el,index)
        this.setState({
            icon
        })
        console.log(' this.props.handleheader(text) ', this.props )
        this.props.setHeader(text)

    }
    render() {
        const data = Array.from(new Array(20)).map((_val, i) => ({
            icon: require(`../../asserts/images/头像${i+1}.png`) ,
            text: `头像${i+1}`,
          }));
        //   console.log(this.state.headerInfo.icon)
         
          const listHeader=this.state.icon?<div>已选择图像：<img src={this.state.icon} alt=''/></div>:'请选择头像'
        return (
            <div>
                 <List  renderHeader={() => listHeader}></List>
            <Grid data={data} columnNum={5} onClick={({text, icon})=>this.headerChoose({text, icon})}/>  
            </div>
           
        );
    }
}

export default selectorHeader;