import React from 'react';
import Logo from './logo.png'
import './logo.less'
class logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className='logo'>
                <img src={Logo} alt=""/>
            </div>
        );
    }
}

export default logo;