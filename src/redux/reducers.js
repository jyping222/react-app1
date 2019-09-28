import {combineReducers} from 'redux'
import {AUTH_FAIL,AUTH_SUCCESS,RECEIVE_SUCCESS,RECEIVE_FAIL,  RECEIVE_USER,
    RESET_USER,USERLIST_SUCCESS,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types'
import getRedirectPath from '../utils/getRedirectPath'
const InitUser={
    username:'',
   msg:'',
    type:'',
    redirectTo:'',
    
}
function user(state=InitUser,action){
    //////访问服务器action得到的值 响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}
    switch(action.type){
        case AUTH_SUCCESS:
            const redirectTo=getRedirectPath(action.data.type,action.data.header)
            console.log("redirectTo",redirectTo)
            return {...action.data,redirectTo}
        case AUTH_FAIL:
           
            return {...state,msg: action.data}
        case RECEIVE_SUCCESS:
           
            return {...action.data}
        case RECEIVE_FAIL:
           
                    return {...state,msg: action.data}
        case RECEIVE_USER:
                return {...action.data}
      
        case RESET_USER:
         
                       
            return {...InitUser, msg: action.data}
        default :
       
            return {...state,msg:action.data}
    }
}
const initUserList = []
// 产生userlist状态的reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case USERLIST_SUCCESS:  // data为userList
    console.log('action.data',action.data)
      return action.data
    default:
            console.log('action.data1',action.data)
      return state
  }
}
const chatInit={
    users:{},
    chatMsgs:[],
    unReadCount:0
}
function chat(state=chatInit,action){
    switch(action.type){
        case RECEIVE_MSG:
        var {chatMsg,userid}=action.data
        return {
            chatMsgs:[...state.chatMsg,chatMsg],
            users:state.users,
            unReadCount:state.unReadCount+(!chatMsg.read && chatMsg.to===userid ?1:0)
        }//data: {chatMsg,isTome}})
        case RECEIVE_MSG_LIST:
            // dispatch({type:RECEIVE_MSG_LIST,data:chatMsgs,users,userid})
            const {chatMsgs,users}=action.data
            return {
                chatMsgs,users,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>{
                    //统计未读的，只能是，对方发给我的，我发的不用统计
                    return preTotal+(!msg.read&&msg.to===action.data.userid?1:0)
                },0)
            }
        case MSG_READ:
            //{type:RECEIVE_MSG_LIST,data:{from:from, to:to,count:response.data
            const {from,to,count}=action.data
           return{chatMsgs:state.chatMsg.map(msg=>{
            //找到发送过来的信息再远chatMsg的匹配，并且未读的，将其改成已读
            // msg.read = true // 不能直接修改状态
            if(msg.form===from&&msg.to===to&&!msg.read){
                return {...msg,read:true}
            }else{
                return msg
            }
        }), users: state.users,
        unReadCount:state.unReadCount-count
    } 
           
            
        default:
            return state
    }
}
export default combineReducers({
    user,userList,chat,
})