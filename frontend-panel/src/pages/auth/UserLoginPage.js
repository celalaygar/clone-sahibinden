import React, { Component, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import '../../assets/css/UserLoginPage.css';
import { loginAsync, selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/base/ApiService';
import { AutError, NETWORK } from '../../constant/AuthenticationConstant';
import LoginSpinner from '../../components/preloader/LoginSpinner';


const UserLoginPage = (props) => {
    const [formData, setformData] = useState({
        username: "",
        email: null,
        password: ""
    });
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [btnEnable, setBtnEnable] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isloading, setIsloading] = useState(false);
    const selectedAuth = useSelector(selectedAuthentication);

    const onChangeData = (type, event) => {
        if (error) {
            setError(null)
        }
        const stateData = formData;
        stateData[type] = event

        setformData({ ...stateData });
        setBtnEnable(formData.username && formData.password)
    }
    const onClickLogin = async (event) => {
        setIsloading(true)

        event.preventDefault();
        if (error) {
            setError(null)
        }
        const { username, password } = formData;
        const creds = { username, password };
        try {
            const response = await ApiService.login(creds)
            await dispatch(loginAsync({
                ...response
            }))
            navigate("/index");
        } catch (error) {
            if (error.response) {
                setError(error.response.data)
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error);
                setError(NETWORK)
            }

            setIsloading(false)
        }
        setIsloading(false)

    }
    const onKeyPressLogin = async (event) => {

        if (event.key !== "Enter") {
            return;
        }
        onClickLogin(event);

    }
    return (
        <div className="main">
            <div className="container">
                <div className='row mt-5'>
                    <div className='col-lg-12'>
                        <div className="login-box">
                            <h2>Üye Giriş</h2>
                            <form onKeyPress={onKeyPressLogin}>
                                <div className="user-box">
                                    <input
                                        onChange={event => onChangeData("username", event.target.value)}
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        autocomplete="off"
                                        required="" />
                                    <label>Username</label>
                                </div>
                                <div className="user-box">
                                    <input
                                        onChange={event => onChangeData("password", event.target.value)}
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        autocomplete="off"
                                        required="" />
                                    <label>Password</label>
                                </div>
                                {isloading ? <LoginSpinner /> :
                                    <button className='loginButton' href="#" onClick={onClickLogin} disabled={!btnEnable}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Submit
                                    </button>
                                }
                            </form>

                            <div className='loginError'>
                                {error &&
                                    <>
                                        {error && AutError[error?.error]}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;

