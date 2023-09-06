import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import { loginHandler } from './../../redux/AuthenticationAction';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import '../../assets/css/UserLoginPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserLoginPage = (props) => {
    const [formData, setformData] = useState({
        username: "",
        email: null,
        password: ""
    });

    const [btnEnable, setBtnEnable] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);

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
        setPendingApiCall(true)

        event.preventDefault();
        if (error) {
            setError(null)
        }
        const { dispatch, history } = props;
        const { username, password } = formData;
        const creds = { username, password };

        try {
            await dispatch(loginHandler(creds));
            history.push("/index");
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
                if (error.response.status === 409 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setPendingApiCall(false)

    }
    const onKeyPressLogin = async (event) => {
        setPendingApiCall(true)

        // event.preventDefault();
        if (error) {
            setError(null)
        }
        const { dispatch, history } = props;
        const { username, password } = formData;
        const creds = { username, password };

        try {
            if (event.charCode === 13) {
                await dispatch(loginHandler(creds));
                history.push("/index");
            } else {
                // this.onChangeData(event);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
                if (error.response.status === 409 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
            }
            else if (error.request) {
                setError("NETWORK")
                console.log(error.request);
            }
            else {
                setError("Hay Aksi ")
                console.log(error.message);
            }
        }
        setPendingApiCall(false)

    }
    const { username, password } = errors;
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div id="formContent">
                        <div id="formFooter">
                            {/* <h3 className="panel-title col-md-4 offset-md-4">Giriş Yap</h3> */}
                            <img className="img" src={"https://cdn-icons-png.flaticon.com/512/295/295128.png"} width="150" height="150" />
                        </div>
                        <div className="col-lg-12 offset-p-1 p-3" >
                            <br />
                            <form onKeyPress={onKeyPressLogin}  >
                                <Input
                                    label={"Üye Adı"}
                                    error={username}
                                    type="text"
                                    name="username"
                                    placeholder={"Üye Adı"}
                                    valueName={formData.username}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Şifre"}
                                    error={password}
                                    type="password"
                                    name="password"
                                    placeholder={"Şifre"}
                                    valueName={formData.password}
                                    onChangeData={onChangeData}
                                />
                            </form>
                            {
                                pendingApiCall ? <Spinner /> :
                                    <button
                                        className="btn"
                                        id="search-button"
                                        type="button"
                                        disabled={!btnEnable}
                                        onClick={onClickLogin}><FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon> Giriş Yap</button>
                            }

                        </div>
                        <br />
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error === "UNAUTHORIZED" && "Hata : Kullanıcı Adı veya Şifre Hatalı"}
                                {error === "CONFLICT" && "Hata : Üye Girişi Zaten Yapıldı"}
                                {error === "NETWORK" && "Hata : Sistem ile İlgili Bir Problem Oluştu. Yetkiliye Başvurunuz"}
                            </div>
                        }
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
};

export default connect()(UserLoginPage);

