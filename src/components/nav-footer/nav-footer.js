import React from 'react';
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
class navFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        let {navList,unReadCount}=this.props
        let path=this.props.location.pathname
        const navlist=navList.filter((nav)=>!nav.hide)
        console.log(navlist)
        return (
           
            <div>
                 <TabBar className="footer">
                        {
                            navlist.map((nav)=>(
                               
            <TabBar.Item
                title={nav.text}
                key={nav.path}
                icon={{ uri: require(`./images/${nav.icon}.png`) }}
                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                selected={nav.path === path}
                badge={path==='/messaage'?unReadCount:0}
                onPress={() => {
               this.props.history.replace(nav.path)
                }}
                
            >
                
            </TabBar.Item>
            
          
       
                        ))
                    }

                </TabBar>
            </div>
        );
    }
}

export default withRouter(navFooter);