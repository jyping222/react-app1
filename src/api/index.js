import Ajax from './ajax'
export  const reqRegister=data=>Ajax('/register',data)
export  const reqLogin=data=>Ajax('/login',data)
export  const reqUpdate=data=>Ajax('/update',data)
export  const reqUser=()=>Ajax('/user',{},'GET')
export  const UserList=(type)=>Ajax('/userlist',{type},'GET')
export const reqChatMsgList = () => Ajax('/msglist',{},'GET')
export const reqReadChatMsg = (from) => Ajax('/readmsg', {from}, 'POST')
//访问服务器得到的值 响应数据结构: {code: 0, data: user}, {code: 1, msg: 'xxx'}