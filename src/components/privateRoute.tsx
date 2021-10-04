import React, { FC, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { IRootState } from '../store';

interface IOwnProps {
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any>;
}

export type IProps = IOwnProps & RouteProps;

const PrivateRoute: FC<IProps> = (props) => {
    const { component: RenderComponent, layout: Layout, ...rest } = props;
    const authenticated = useSelector((state: IRootState) => state.user.authenticated);
    //const [user, setUser] = useState({authenticated: true});

    const renderRoute = (props: any) => {
        if (!authenticated){
            return <Redirect to={{ pathname: '/login' }} />;
        }
        else if (Layout) {
            return (
                <Layout>
                    <RenderComponent {...props}/>
                </Layout>
            );
        }
        return <RenderComponent {...props} />;
    };

    return <Route {...rest} render={renderRoute} />;
};

export default PrivateRoute;
