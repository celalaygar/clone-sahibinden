
import React from 'react'
import { Navigate, Route } from 'react-router-dom'


const AuthenticatedRoute= (props) => {
    const{isLoggedIn, path, element} = props;
    console.log("props")
    console.log(props)
    if(isLoggedIn)
        return ( <Route path={path} element={element}/>);
    return <Route path="*" element={<Navigate to ="/" />}/>
};

export default AuthenticatedRoute;