import { FC, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login, Register, Home, Profile, Messages } from '../scenes/index';
import { PrivateRoute, MainLayout } from '../components';

const Routes: FC = (props) => {
    let [user, setUser] = useState({authenticated: false});
    const initialRoute = user.authenticated  ? '/home' : '/signup';
    return(
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={initialRoute}></Redirect>
                <Route exact path="/signup" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <PrivateRoute exact path="/home" component={Home} layout={MainLayout}/>
                <PrivateRoute exact path="/profile" component={Profile} layout={MainLayout}/>
                <PrivateRoute exact path="/messages" component={Messages} layout={MainLayout}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;