

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, logoutAsync, selectedAuthentication } from './AuthenticationSlice';

const Authentication = () => {


    const selectedAuth = useSelector(selectedAuthentication);
    const dispatch = useDispatch();

    const [body, setBody] = useState({
        username: "1",
        password: "22",
        email: "@gg.com"
    });
    const onChangeBody = e => {
        let data = body;
        data[e.target.name] = e.target.value;
        setBody({ ...data });
    }
    const login = e => {
        e.preventDefault();
        
        dispatch(loginAsync({
            username: body.username,
            password: body.password,
            email: body.email,
            token: body.password + "+++" + body.password,
        }))
    }
    const logout = e => {
        e.preventDefault();
        
        dispatch(logoutAsync({
            username: body.username,
            password: body.password,
            email: body.email,
            token: null,
        }))

    }
    return (
        <div>
            <h5>Authentication</h5>
            {
                selectedAuth?.isloggedIn === false ?
                    <div>
                        <hr />
                        <span>Username : </span>
                        <input type="text" name="username" value={body?.username} onChange={(e) => onChangeBody(e)} />
                        <br />
                        <span>Email : </span>
                        <input type="text" name="email" value={body?.email} onChange={(e) => onChangeBody(e)} />
                        <br />
                        <span>Password : </span>
                        <input type="password" name="password" value={body?.password} onChange={(e) => onChangeBody(e)} />
                        <br />
                        <button type='submit' onClick={e => login(e)}>Login</button>
                    </div>
                    :
                    <div>
                        <span>DisplayName : {selectedAuth.displayName} </span>
                        <br />
                        <span>Username : {selectedAuth.username} </span>
                        <br />
                        <span>Email : {selectedAuth.email} </span>
                        <br />
                        <span>Token : {selectedAuth.token} </span>
                        <br />
                        <button type='submit' onClick={e => logout(e)}>Logout</button>
                    </div>

            }


        </div>
    );
};

export default Authentication;
