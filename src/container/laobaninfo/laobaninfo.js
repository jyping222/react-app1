import React from 'react';
import {List,Button,TextareaItem,NavBar,InputItem} from 'antd-mobile'

import {Redirect} from 'react-router-dom'
import {toUpdate} from '../../redux/actions'
import {connect} from 'react-redux'
import SelectorHeader from '../../components/selector-header/selector-header'
class dasheninfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            icon:''
         };
    }
   
    handleValue=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    setHeader=(header)=>{
        this.setState({
            header
        })
    }
    saveInfo=()=>{
        this.props.toUpdate(this.state)
    }
    render() {
        const{ type,header}=this.props.user
        console.log('this.props',this.props,this.props.user)
        if(header){
            const path=type==='dashen'?'/dashen':'/laoban'
            return <Redirect to={path}/>
        }
        // const userid=Cookies.get("userid")
        // if(userid){
        //     this.props.toUpdate(userid)
        // }else{
        //     this.props.history.repalce('/')
        // }

       
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                
                {/* <Grid data={data} columnNum={5} onClick={(el,index)=>this.headerChoose(el,index)}/> */}
                <SelectorHeader setHeader={this.setHeader}/>
                

                
                <List>
                    <InputItem onChange={val => {this.handleValue('username', val)}}>招聘职位：</InputItem>
                    <InputItem onChange={val => {this.handleValue('company', val)}}>公司名称：</InputItem>
                    <InputItem onChange={val => {this.handleValue('salary', val)}}>职位薪资：</InputItem>
                    <TextareaItem autoHeight title="职位要求:" rows={2} onChange={val => {this.handleValue('job', val)}}></TextareaItem>
                </List>
                
                
                <Button type='primary' onClick={this.saveInfo}>保存</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {toUpdate}
)(dasheninfo);