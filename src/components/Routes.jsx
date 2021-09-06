import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';
import Error  from '../pages/Error';
 const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            {/* <Route path='/error' component={Error}/> */}
        </Switch>
    )
}


export default Routes;