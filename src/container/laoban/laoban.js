import React from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/UserList/UserList'
class laoban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        this.props.getUserList('dashen')
    }
    render() {
         console.log('userList',this.props)
        return (
           
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        );
    }
}

export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(laoban);