import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import Cookies from 'js-cookie'
import LaobanInfo from '../laobaninfo/laobaninfo'
import DashenInfo from '../dasheninfo/dasheninfo'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import {getUser} from '../../redux/actions'
import getRedirectPath from '../../utils/getRedirectPath'
import Chat from '../chat/chat'
class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            unReadCount:0
         };
    }
    navList=[
        {path:'/laoban',component:Laoban,title:'老板列表',icon:'laoban',text:'老板',},
        {path:'/dashen',component:Dashen,title:'大神列表',icon:'dashen',text:'大神',},
        {path:'/personal',component:Personal,title:'个人中心',icon:'personal',text:'个人',},
        {path:'/message',component:Message,title:'消息列表',icon:'message',text:'消息',},

    ]
    componentDidMount(){
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&&!_id){
            this.props.getUser()
        }
    }
    render() {
        const userid = Cookies.get('userid')
    // 如果没有, 自动重定向到登陆界面
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // 如果有,读取redux中的user状态
    const {user} = this.props
    // 如果user有没有_id, 返回null(不做任何显示)
    // debugger
    console.log('user',user)
    if(!user._id) {
      return null}
    else{
            let path=this.props.location.pathname
            if(path==='/'){
                path=getRedirectPath(user.type,user.header)
                return <Redirect to={path}/>
            }
        }
        const path=this.props.location.pathname
        const currentNav=this.navList.find((nav)=>nav.path===path)
        console.log('currentNav',currentNav)
        if(currentNav){
            if(user.type==='dashen'){
                this.navList[0].hide=true
            }else{
                this.navList[1].hide=true
            }
        }
        console.log('this.navList',this.navList)

        return (
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>:null}
                
                 <Switch>
                    {this.navList.map(nav=>
                           <Route key={nav.path} path={nav.path} component={nav.component}/>

                    )}

                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                   
                    <Route path='/chat/:userId' component={Chat}/>
                    <Route component={NotFound} ></Route>
                </Switch>  
        {currentNav?<NavFooter navList={this.navList} unReadCount={this.unReadCount}/>:null  }

            </div>
         
         );
    }
}

export default connect(
    state=>({user:state.user}),
    {getUser}
)(main);