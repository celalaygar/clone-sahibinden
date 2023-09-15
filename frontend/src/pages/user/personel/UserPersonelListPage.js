

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@material-ui/core";
import React, { Component, useState } from "react";
import { connect, useSelector } from "react-redux";
import Input from "../../../components/Input";
import PageSizeComponent from "../../../components/PageSizeComponent";
import Preloader from "../../../components/preloader/Preloader";
import Spinner from "../../../components/Spinner";
import UserCardModal from "../UserCardModal";
import AlertifyService from "../../../services/AlertifyService";
import ApiService from "../../../services/base/ApiService";
import UserService from "../../../services/UserService";
import UserUpdatePage from "../UserUpdatePage";
import { selectedAuthentication } from "../../../redux/redux-toolkit/authentication/AuthenticationSlice";


const UserPersonelListPage = (props) => {

    const selectedAuth = useSelector(selectedAuthentication);
    const [singleUser, setsingleUser] = useState(undefined);
    const [currentUpdateUserId, setCurrentUpdateUserId] = useState();
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
    const [formPassword, setFormPassword] = useState({
        newPassword: undefined,
        repeatNewPassword: undefined,
    });
    const [currentUserId, setCurrentUserId] = useState();
    const [users, setusers] = useState(props.page.content);
    const [roles, setroles] = useState(props.roles);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = (rowUserId) => {
        setCurrentUserId(rowUserId);
        setOpenChangePasswordModal(true);
    }
    const handleClickUpdateOpen = (userId) => {
        setCurrentUpdateUserId(userId);
        setOpenUpdateUserModal(true);
    }

    const handleClosePassword = () => {
        setFormPassword({
            newPassword: undefined,
            repeatNewPassword: undefined,
        });
        setCurrentUserId(undefined);
        setOpenChangePasswordModal(false);
    }

    const handleUpdateUserClose = () => {
        setsingleUser(undefined);
        setOpenUpdateUserModal(false);

    }

    const onChangePassword = async () => {
        setIsLoading(true)

        try {
            let body = {
                newPassword: formPassword.newPassword,
                repeatNewPassword: formPassword.repeatNewPassword,

            }
            const response = await UserService.changePassword(currentUserId, body);
            console.log(response);

            setFormPassword({
                newPassword: undefined,
                repeatNewPassword: undefined,
            })
            setOpenChangePasswordModal(false);

            AlertifyService.alert("Şifre Güncelleme işlemi başarılı.");
        } catch (error) {
            if (error.response) {
                //console.log(error.response.data.message);
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                }
            }
            else if (error.request) {
                console.log(error.request);
                AlertifyService.alert(error.request);
            }
            else {
                console.log(error.message);
                AlertifyService.alert(error.message);
            }
        };
        setIsLoading(false)
    }


    const onChangeData = (type, event) => {
        if (error)
            setError(null)
        let stateData = formPassword;
        let errorsData = errors;
        stateData[type] = event;
        if (stateData["newPassword"]) {
            if (stateData["newPassword"] === stateData["repeatNewPassword"]) {
                errorsData["newPassword"] = undefined;
            } else {
                errorsData["newPassword"] = "Şifreler uyuşmuyor";
            }
        } else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            errorsData["newPassword"] = { newPassword: "Şifreler uyuşmuyor" }
        } else if (!stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            errorsData["newPassword"] = undefined;
        }

        setFormPassword({
            newPassword: stateData["newPassword"],
            repeatNewPassword: stateData["repeatNewPassword"]
        });
        setErrors({ ...errorsData });
    }

    const makeLogOut = async (event, user) => {
        setIsLoading(true)
        try {
            const response = await UserService.makeLogOut(user.username);
            if (response.data === true)
                AlertifyService.alert("Üyelik Çıkış Yaptırıldı.");
            if (response.data === false)
                AlertifyService.alert("Sistemde Bir Hata Oluştu. Lütfen Yetkiliye Başvurunuz");
            props.resetPage()
        } catch (error) {
            if (error.response) {
                //console.log(error.response.data.message);
                console.log(error.response);
            }
            else if (error.request) {
                console.log(error.request);
                AlertifyService.alert(error.request);
            }
            else {
                console.log(error.message);
                AlertifyService.alert(error.message);
            }
        };
        setIsLoading(false)
    }

    const loadSingUser = (e, user) => {
        setsingleUser(user)
        setOpenUpdateUserModal(true);
    }

    return (
        <div className="row">
            <div className="col-lg-12 mt-0">
                <div className="card ">
                    <div className=" card-header">
                        <h5 className="mb-0">Tüm Kullanıcılar</h5>
                    </div>
                    {isLoading ?
                        (<Preloader width={50} height={50} />) :
                        (
                            <div className="row">
                                <>
                                    <div className="col-lg-12">

                                        <div className="d-flex">
                                            <table className="table table-hover table-sm ml-0">
                                                <thead>
                                                    <tr className="d-flex">
                                                        <th scope="col" className="col-4">İşlemler</th>
                                                        <th scope="col" className="col-2">İsim</th>
                                                        <th scope="col" className="col-2">Soyisim</th>
                                                        <th scope="col" className="col-2">Kullanıcı Adı</th>
                                                        <th scope="col" className="col-2">Rolü</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users && users.map((user, index) =>
                                                        <tr key={index} className={user.isLoggedIn === 1 ? "table-danger d-flex" : "d-flex"} >
                                                            <td className="col-4 d-flex" >
                                                                <li className="nav-item dropdown dropdown-item">
                                                                    <div className="dropdown">
                                                                        <button
                                                                            className="btn btn-secondary btn-sm dropdown-toggle"
                                                                            type="button"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false">
                                                                            İşlemler
                                                                        </button>
                                                                        <ul className="dropdown-menu">

                                                                            <li key={1} className="dropdown-item " >
                                                                                <button
                                                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                                                    type="button"
                                                                                    onClick={e => loadSingUser(e, user)}>
                                                                                    Aç </button>
                                                                            </li>
                                                                            <li key={2} className="dropdown-item  " >
                                                                                <button
                                                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                                                    type="button"
                                                                                    onClick={e => handleClickUpdateOpen(user.userId)} >
                                                                                    Bilgileri Güncelle  </button>
                                                                            </li>

                                                                            <li key={3} className="dropdown-item " >
                                                                                <button
                                                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                                                    type="button"
                                                                                    onClick={e => handleClickOpen(user.userId)} >
                                                                                    Şifre Güncelle  </button>
                                                                            </li>

                                                                        </ul>
                                                                    </div>
                                                                </li>
                                                                {user.isLoggedIn === 1 &&
                                                                    <button
                                                                        onClick={e => makeLogOut(e, user)}
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger ml-2 float-right">
                                                                        <FontAwesomeIcon icon="times"></FontAwesomeIcon> Çıkış Yaptır</button>}
                                                            </td>
                                                            <td className="col-2">{user.name}</td>
                                                            <td className="col-2">{user.surname}</td>
                                                            <td className="col-2">{user.username}</td>
                                                            <td className="col-2">
                                                                {props.roles && props.roles.map((role, index) => role.role === user.role && role.value)}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            {singleUser && <UserCardModal title="Kullanıcı Bilgileri" user={singleUser} roles={props.roles} />}

                                        </div>
                                    </div>
                                </>
                            </div>
                        )}
                </div>
            </div>
            <div className="col-lg-12 mt-1">
                <PageSizeComponent onChangeData={onChangeData} page={props.page} />
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={openUpdateUserModal}
                onClose={handleUpdateUserClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="card">
                    {singleUser && <UserUpdatePage singleUser={singleUser} closeUpdateUser={handleUpdateUserClose} />}

                    {isLoading ? <Spinner /> :
                        <div className="modal-footer">
                            <button
                                className="btn btn-sm"
                                id="close-button"
                                type="button"
                                onClick={handleUpdateUserClose}>
                                <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                            </button>
                        </div>
                    }
                </div>
            </Dialog>

            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={openChangePasswordModal}
                onClose={handleClosePassword}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="card">
                    <div className="card-header">
                        <h4>Şifreyi Güncelle</h4>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">

                                <Input
                                    label={"Yeni Şifre"}
                                    type="password"
                                    name="newPassword"
                                    error={errors.newPassword}
                                    placeholder={"Yeni Şifre"}
                                    valueName={formPassword.newPassword}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-12">
                                <Input
                                    label={"Yeni Şifre (Tekrar)"}
                                    type="password"
                                    name="repeatNewPassword"
                                    placeholder={"Yeni Şifre (Tekrar)"}
                                    valueName={formPassword.repeatNewPassword}
                                    onChangeData={onChangeData}
                                />
                            </div>
                        </div>
                    </div>
                    {isLoading ? <Spinner /> :
                        <div clclassNameass="modal-footer">
                            <button
                                className="btn btn-sm"
                                id="search-button"
                                type="button"
                                //disabled={!btnEnable}
                                onClick={onChangePassword}> <FontAwesomeIcon icon="save"></FontAwesomeIcon>  Güncelle</button>
                            <button
                                className="btn btn-sm"
                                id="close-button"
                                type="button"
                                onClick={handleClosePassword}>
                                <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                            </button>
                        </div>
                    }
                </div>
            </Dialog>
        </div>
    );
};

export default UserPersonelListPage;


/*
handleClickOpen = (rowUserId) => {
        this.setState({ currentUserId: rowUserId, openChangePasswordModal: true });
    }
    handleClickUpdateOpen = (userId) => {
        this.setState({ currentUpdateUserId: userId, openUpdateUserModal: true });
    }

    handleClosePassword = () => {
        this.setState({
            newPassword: undefined,
            repeatNewPassword: undefined,
            currentUserId: undefined,
            openChangePasswordModal: false
        });
    }

    handleUpdateUserClose = () => {
        this.setState({
            name: undefined,
            surname: undefined,
            role: undefined,
            email: undefined,
            username: undefined,
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            openUpdateUserModal: false
        });
    }

    onChangePassword = async () => {
        this.setState({ pendingApiCall: true })

        try {
            let body = {
                newPassword: this.state.newPassword,
                repeatNewPassword: this.state.repeatNewPassword,

            }
            const response = await UserService.changePassword(this.state.currentUserId, body);
            console.log(response)

            this.setState({
                openChangePasswordModal: false,
                newPassword: undefined,
                repeatNewPassword: undefined,
            });
            AlertifyService.alert("Şifre Güncelleme İşlemi Başarılı.");
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                }
            }
            else if (error.request) {
                console.log(error.request);
                AlertifyService.alert(error.request);
            }
            else {
                console.log(error.message);
                AlertifyService.alert(error.message);
            }
        };
        this.setState({ pendingApiCall: false })



    }

    onChangeData = (type, event) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        stateData[type] = event;
        if (stateData["newPassword"]) {
            if (stateData["newPassword"] === stateData["repeatNewPassword"]) {
                stateData["isdisable"] = false;
                stateData["errors"] = { newPassword: undefined }
            } else {
                stateData["errors"] = { newPassword: "Şifreler Uyuşmuyor" }
            }
        } else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: "Şifreler Uyuşmuyor" }
        } else if (!stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: undefined }
        }

        this.setState({ stateData });
    }

    loadSingUser = (e, user) => {
        this.setState({ singleUser: user })
    }

    loadRoles = async () => {
        try {
            const roles = await ApiService.get("/roles");
            this.setState({ roles: roles.data });
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data);
                    this.setState({ error: error.response.data });
                }
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                    //AlertifyService.alert("Lütfen Tekrar giriş yapınız...");
                }
            } else if (error.request) console.log(error.request);
            else console.log(error.message);
        }
    };

    makeLogOut = async (event, user) => {
        this.setState({ pendingApiCall: true })

        try {
            const response = await UserService.makeLogOut(user.username);
            if (response.data === true)
                AlertifyService.alert("Üyelik Çıkış Yaptırıldı");
            if (response.data === false)
                AlertifyService.alert("Sistemde bir hata oluştu. Lütfen Yetkiliye Başvurunuz");
            this.props.resetPage()
        } catch (error) {
            if (error.response) {
                //console.log(error.response.data.message);
                console.log(error.response);

            }
            else if (error.request) {
                console.log(error.request);
                AlertifyService.alert(error.request);
            }
            else {
                console.log(error.message);
                AlertifyService.alert(error.message);
            }
        };
        this.setState({ pendingApiCall: false })



    }

*/
