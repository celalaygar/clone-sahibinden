

import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import { logoutAction } from '../../../redux/AuthenticationAction';
import AlertifyService from '../../../services/AlertifyService';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';



const MyAccountEditPage = (props) => {

    const [myAccountDetail, setMyAccountDetail] = useState({
        name: "",
        surname: "",
        username: "",
        email: null,
        motherName: undefined,
        fatherName: undefined,
        tcNo: "",
    });

    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const loadUser = async () => {
        try {
            const response = await UserService.get("/my-account");
            //console.log(response.data)
            myAccountDetail({ ...response.data })
        } catch (error) {
            if (error.response) {
                console.log(error.response)

            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }
    loadUser();

    const onChangeData = (type, event) => {
        if (error) {
            setError(null);
        }
        const stateData = myAccountDetail;
        stateData[type] = event

        setMyAccountDetail({ stateData });
    }

    const onClickUpdate = async (event) => {
        setPendingApiCall(true);

        event.preventDefault();
        if (error) {
            setError(null);
        }

        try {
            const response = await UserService.updateYourSelves(props.username, myAccountDetail);
            AlertifyService.alert("Bilgileriniz Güncellendi. Lütfen Tekrar Giriş Yapınız")
            ApiService.changeAuthToken(null);
            props.dispatch(logoutAction());
            // history.push("/index");
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setPendingApiCall(false);

    }

    if (props.role === "ADMIN" || props.match.params.username === props.username) {
        const { name, surname, username, /*password ,*/ email } = errors;
        return (
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0"> Bilgilerimi Güncelle</h5>
                        </div>
                        <div className="card-body">
                            <form >
                                <Input
                                    label={"İsim *"}
                                    error={name}
                                    type="text"
                                    name="name"
                                    placeholder={"İsim *"}
                                    valueName={myAccountDetail.name}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Soyisim *"}
                                    error={surname}
                                    type="text"
                                    name="surname"
                                    placeholder={"Soyisim *"}
                                    valueName={myAccountDetail.surname}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Kullanıcı İsmi *"}
                                    error={username}
                                    type="text"
                                    name="username"
                                    placeholder={"Kullanıcı İsmi *"}
                                    valueName={myAccountDetail.username}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Email *"}
                                    error={email}
                                    type="text"
                                    name="email"
                                    placeholder={"Email *"}
                                    valueName={myAccountDetail.email}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Anne Adı"}
                                    error={email}
                                    type="text"
                                    name="motherName"
                                    placeholder={"Anne Adı"}
                                    valueName={myAccountDetail.motherName}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Baba Adı"}
                                    error={email}
                                    type="text"
                                    name="fatherName"
                                    placeholder={"Baba Adı"}
                                    valueName={myAccountDetail.fatherName}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"TC NO"}
                                    type="text"
                                    name="tcNo"
                                    placeholder={"TC NO"}
                                    valueName={myAccountDetail.tcNo}
                                    onChangeData={onChangeData}
                                />
                                {
                                    pendingApiCall ? <Spinner /> :
                                        <button
                                            className="btn"
                                            id="search-button"
                                            type="button"
                                            //disabled={!btnEnable}
                                            onClick={onClickUpdate}>Güncelle</button>
                                }

                            </form>


                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            // <Navigate to="/index" replace={true} />
            null)
    }
};



const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        jwttoken: store.jwttoken,
        role: store.role
    };
};

export default connect(mapStateToProps)(MyAccountEditPage);