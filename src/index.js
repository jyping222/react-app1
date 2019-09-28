import React from 'react';
import ReactDOM from 'react-dom';
import Register from './container/register/register'
import Login from './container/login/login'
import Main from './container/main/main'
import {Provider} from 'react-redux'
import {HashRouter,Route,Switch} from 'react-router-dom'
import store from './redux/stores'
import './asserts/css/index.less'
import './test/socket_test'
ReactDOM.render(
    (<Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>
        
    ),
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

