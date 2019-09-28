import React from 'react';
import {NavBar,List,InputItem,Icon,Grid} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'
import {connect} from 'react-redux'
const Item=List.Item
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            content:'',
            isShow:true
        };
    }
    submit=()=>{
        const content=this.state.content.trim()
        const to = this.props.match.params.userid
const from = this.props.user._id
this.props.sendMsg({from, to, content})
this.setState({content: ''})
    }
    componentWillMount(){
        this.emojis=['😀',
            '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆',  '😃' ,
            '😄' ,
            '😁',
            '😆']
            this.emojis=this.emojis.map(value=>({text:value}))
            console.log('this.emojis',this.emojis)//(49) [{ {text: "😀"}}, {{text: "😃"}}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            
    }
    render() {
        const {user} = this.props
        const {chatMsgs, users} = this.props.chat
        const targetId=this.props.match.params.userId
       
        console.log('this.props',this.props)
       
        return (
            <div id='chat-page'> 
                <NavBar className='stick-top' icon={<Icon type='left'/>} onLeftClick={()=>this.props.history.goBack()}>111</NavBar>
                <List>
                    
                    <Item thumb={require('../../asserts/images/头像1.png')}>
                        你好2{targetId}
                    </Item>
                    <Item className='chat-me' extra='我'>很好</Item>
                    <Item className='chat-me' extra='我'>很好2</Item>
                </List>
                <div className="am-tab-bar">
                    <InputItem placeholder="请输入" value={this.state.content}  onChange={(val)=>this.setState({'content':val})} extra={<span onClick={this.submit}>发送</span>}></InputItem>
                    {
                        this.state.isShow?(
                            <Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true}       onClick={(item)=>{
                                this.setState({content:this.state.content+item.text})
                            }}/>
                        ):null
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg})(Chat)