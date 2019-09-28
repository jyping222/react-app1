import io from 'socket.io-client'////io是一个函数
const socket=io('ws://localhost:4000')
socket.on('receiveMsg',function(data){
    console.log('浏览器接受消息',data)
})
socket.emit('sendMSG',{name:'Tom',date:Date.now()})
console.log('浏览器端向拂去其端发送消息：',{name:'Tom',date:Date.now()})