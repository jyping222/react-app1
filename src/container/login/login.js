import React from 'react';
import {Button,InputItem,WhiteSpace,NavBar,WingBlank} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {toLogin} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:'',
           
         };
    }
    handleValue=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    toLogin=()=>{
        console.log(this.state)
        this.props.toLogin(this.state)
    }

    toRegister=()=>{
        this.props.history.replace('/register')
    }
    render() {
        const {msg, redirectTo} = this.props.user
        console.log('redirectTo',redirectTo)
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
                    <InputItem type='password' placeholder='请输入密码' onChange={val => {this.handleValue('password', val)}}>密&nbsp;&nbsp;码 ：</InputItem>
                    
                    <Button type="primary" onClick={this.toLogin}>登陆</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>注册</Button>
                   
                </WingBlank>
            </div>
            
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {toLogin}
)(login);