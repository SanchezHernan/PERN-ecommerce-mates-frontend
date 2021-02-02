import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../Auth/auth'

const ProtectedRoute = ({component: Commponent, ...rest}) => {
    return(
        <Route
            {...rest}
            render={props => {
                if(auth.isAuthenticated()) {
                    return <Commponent {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }    
                    }/>
                }
            }}
        />
    );
}

export default ProtectedRoute;