

import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import AlertifyService from '../../../services/AlertifyService';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';
import { logoutAsync, selectedAuthentication } from '../../../redux/redux-toolkit/authentication/AuthenticationSlice';
import { useParams } from 'react-router-dom';



const MyAccountEditPage = (props) => {

    const { username: paramUsername } = useParams();
    const selectedAuth = useSelector(selectedAuthentication);
    const [myAccountDetail, setMyAccountDetail] = useState({
        name: "",
        surname: "",
        username: "",
        email: null,
        motherName: undefined,
        fatherName: undefined,
        tcNo: "",
    });

    const dispatch = useDispatch();
    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isloading, setIsloading] = useState(false);

    const loadUser = async () => {
        try {
            const response = await UserService.get("/my-account");
            setMyAccountDetail({ ...response.data })
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

    const onChangeData = (type, event) => {
        if (error) {
            setError(null);
        }
        const stateData = myAccountDetail;
        stateData[type] = event

        setMyAccountDetail({ ...stateData });
    }
    useEffect(() => {
        loadUser();
    }, []);

    const onClickUpdate = async (event) => {
        setIsloading(true);

        event.preventDefault();
        if (error) {
            setError(null);
        }

        try {
            const response = await UserService.updateYourSelves(props.username, myAccountDetail);
            AlertifyService.alert("Bilgileriniz Güncellendi. Lütfen Tekrar Giriş Yapınız")
            ApiService.changeAuthToken(null);
            await dispatch(logoutAsync(null));
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    setError(error.response.data)
                } else {
                    console.log(error.response.data.validationErrors);
                    setErrors({ ...error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsloading(false);

    }
    if (props.role === "ADMIN" || paramUsername === selectedAuth.username) {
        const { name, surname, username, /*password ,*/ email, motherName, fatherName, tcNo } = errors;
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
                                    error={motherName}
                                    type="text"
                                    name="motherName"
                                    placeholder={"Anne Adı"}
                                    valueName={myAccountDetail.motherName}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"Baba Adı"}
                                    error={fatherName}
                                    type="text"
                                    name="fatherName"
                                    placeholder={"Baba Adı"}
                                    valueName={myAccountDetail.fatherName}
                                    onChangeData={onChangeData}
                                />
                                <Input
                                    label={"TC NO"}
                                    error={tcNo}
                                    type="text"
                                    name="tcNo"
                                    placeholder={"TC NO"}
                                    valueName={myAccountDetail.tcNo}
                                    onChangeData={onChangeData}
                                />
                                {
                                    isloading ? <Spinner /> :
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




export default MyAccountEditPage;