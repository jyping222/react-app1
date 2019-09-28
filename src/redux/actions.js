import {AUTH_FAIL,AUTH_SUCCESS,RECEIVE_SUCCESS,RECEIVE_FAIL,  RECEIVE_USER,
    RESET_USER,USERLIST_SUCCESS,RECEIVE_MSG_LIST, RECEIVE_MSG,
    MSG_READ} from './action-types'
import {reqRegister,reqLogin, reqUpdate,reqUser,UserList,reqChatMsgList,reqReadChatMsg} from '../api/index'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
// 接收消息列表的同步 action
function initIO(dispatch,userid){
    if(!io.socket){
        io.socket=io('ws://localhost:4000')
    }
    io.socket.on('receiveMsg',(chatMsg)=>{
       
        if(chatMsg.form===userid||chatMsg.to===userid){
            dispatch({type: RECEIVE_MSG, data: {chatMsg,userid}})
        }

    })
}
/*获取当前用户相关的所有聊天消息列表
(在注册/登陆/获取用户信息成功后调用)
*/
async function getMsgList(dispatch,userid){
    initIO(dispatch,userid)
    const response=await reqChatMsgList()//访问服务器，返回 res.send({code: 0, data: {users, chatMsgs}})
    const result=response.data
    if(result.code===0){
        const {chatMsgs,users}=result.data
        dispatch({type:RECEIVE_MSG_LIST,data:{chatMsgs,users,userid}})
    }
}
export const sendMsg=({from,to,content})=>{
    return async dispatch=>{
        io.socket.emit('sendMsg',{from,to,content})
    }
}

export const readMsg=(userid)=>{
    return async (dispatch,getState)=>{
        const response=await reqReadChatMsg(userid)//res.send({code: 0, data: doc.nModified}) // 更新的数量
        if(response.code===0){
            const from=userid
            console.log('getState',getState())
            const to=getState().user._id
            dispatch({type:MSG_READ,data:{
                from:from,
                to:to,
                count:response.data
            }})
        }
    }
    }
    


// const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:
//     {users, chatMsgs, userid}})
//     // 接收消息的同步 action
//     const receiveMsg = (chatMsg, isToMe) => ({type: RECEIVE_MSG, data: {chatMsg, isToMe}})
//     // 读取了消息的同步 action
//     const msgRead = ({from, to, count}) => ({type: MSG_READ, data: {from, to, count}})

export const toRegister=(data)=>{
    //password2不必要传到后台，在前台验证
    const {username,password,password1,type}=data
    
    if(password!==password1){
        return {type:AUTH_FAIL,data:'密码不一致'}
       
    }
    if(!username || !password||!type){
        return {type:AUTH_FAIL,data:'内容不能为空'}
    }
    
    
    ////访问服务器得到的值 响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}
    return async dispatch=>{
        getMsgList(dispatch,Cookies.get("userid"))
        const serverData=await reqRegister({username,password,type})//传值位置粗错
        console.log('serverData',serverData)

        if(serverData.data.code===0){
            dispatch({type:AUTH_SUCCESS,data:serverData.data.data})
        }else{
            console.log(serverData.msg)
            dispatch({type:AUTH_FAIL,data:serverData.data.msg})
        }
    }
    
}
export const toLogin=(data)=>{
    const {username, password} = data
  // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
  if(!username) {
    return {type:AUTH_SUCCESS,data:'用户名必须指定!'}
    
  } else if(!password) {
    return {type:AUTH_SUCCESS,data:'密码必须指定!'}
    
  }
 return async dispatch=>{
    getMsgList(dispatch,Cookies.get("userid"))
        const serverData=await reqLogin(data)//传值位置粗错
        // console.log('serverData',serverData)
        if(serverData.data.code===0){
            return dispatch({type:AUTH_SUCCESS,data:serverData.data.data})
        }else{
            return dispatch({type:AUTH_FAIL,data:serverData.data.msg})
        }
    }
   
}

// export const toUpdate=(cookie)=>{
   
//  return async dispatch=>{
//         const serverData=await reqUpdate(cookie)//传值位置粗错
//         console.log('serverData--update',serverData)
//         if(serverData.data.code===0){
//              dispatch({type:RECEIVE_SUCCESS,data:serverData.data.data})
//         }else{
//             dispatch({type:RECEIVE_FAIL,data:serverData.data.msg})
//         }
//     }
   
// }
export const toUpdate = (user) => {
    return async dispatch => {
      const response = await reqUpdate(user)
      const result = response.data
      if(result.code===0) { // 更新成功: data
        dispatch({type:RECEIVE_SUCCESS,data:result.data})      } else { // 更新失败: msg
         dispatch({type:RECEIVE_FAIL,data:result.msg})
}
    }
  }
export const getUser=()=>{
   return async dispatch=>{
    getMsgList(dispatch,Cookies.get("userid"))
       const user=await reqUser()
       const result =user.data
       if(result.code===0) { // 成功
        // console.log('成功result.data',result.data)
        dispatch({type:RECEIVE_USER,data:result.data})
      } else { // 失败
        // console.log('shibai',result.msg)

        dispatch({type:RESET_USER,data:result.msg})
      }
   }
}
export const getUserList=(type)=>{
    console.log('type111',type)
    return async dispatch=>{
        const userList=await UserList(type)
        console.log('await UserList(type)',userList)
        const data=userList.data
        if(data.code===0){
            dispatch({
                type:USERLIST_SUCCESS,data:data.data
            })
        }else { // 失败
            dispatch({type: RESET_USER, data:data.msg})
          }
    }
}