import React from 'react';
import {Button,InputItem,WhiteSpace,NavBar,List,WingBlank,Radio} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {toRegister} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
            password1:'',
            type:'laoban'
         };
    }
    handleValue=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    toRegister=()=>{
        // console.log('this.state,this.props',this.state,this.props)
        this.props.toRegister(this.state)
    }

    toLogin=()=>{
        this.props.history.replace('/login')
    }
    render() {
        const {msg,redirectTo} = this.props.user
        // console.log("redirectTo1",redirectTo)

        if(redirectTo){
           return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>Boss直聘</NavBar>
                <Logo/>
                {msg ? <div className='error-msg'>{msg}</div> : null}
                <WingBlank>
                    <InputItem type='text' placeholder='请输入用户名' onChange={val => {this.handleValue('username', val)}}>用户名&nbsp;：</InputItem>
                    <InputItem type='password' placeholder='请输入密码'  onChange={val=>{this.handleValue('password',val)}}>密&nbsp;&nbsp;码：</InputItem>
                    <InputItem type='password' placeholder='确认密码'  onChange={val=>{this.handleValue('password1',val)}}>确认密码：</InputItem>
                    <List.Item>
                        <span>用户类型：</span>
                        <Radio checked={this.state.type==='dashen'} onChange={()=>this.handleValue('type','dashen')}>大神</Radio>&nbsp;&nbsp;
                        <Radio checked={this.state.type==='laoban'} onChange={()=>this.handleValue('type','laoban')}>老板</Radio>
                    </List.Item>
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>登陆</Button>
                   
                </WingBlank>
                
                
            </div>
            
        );
    }
}

export default connect(state => ({user: state.user}),
    // (dispatch)=>({toRegister: toRegister(dispatch)})
    {toRegister}
    //mapDispatchToProps：这个参数可以是一个函数或对象
    // const App=connect(
    //     (state)=>({
    //         value:state.count
    //     }),(dispatch)=>({
    //         mOnClick:()=>dispatch(increaseAction)
    //     })
    // )(Counter)
// 如果是一个函数，一旦该组件被创建，就会被调用。接收dispatch作为一个参数，并且返回一个能够使用dispatch来分发actions的若干函数组成的对象
)(register);