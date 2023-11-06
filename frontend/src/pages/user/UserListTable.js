
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertifyService from '../../services/AlertifyService';
import UserService from '../../services/UserService';
import React, { Component, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import UserCardModal from './UserCardModal';
import UserUpdatePage from './UserUpdatePage';
import { selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';
import { Dialog } from '@mui/material';

const UserListTable = (props) => {


    const [singleUser, setsingleUser] = useState(undefined);
    const [currentUpdateUserId, setCurrentUpdateUserId] = useState();
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
    const [formPassword, setFormPassword] = useState({
        newPassword: undefined,
        repeatNewPassword: undefined,
    });
    const [newPassword, setNewPassword] = useState();
    const [repeatNewPassword, setRepeatNewPassword] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [isdisable, setIsdisable] = useState(true);
    const [users, setusers] = useState(props.users);
    const [roles, setroles] = useState(props.roles);
    const selectedAuth = useSelector(selectedAuthentication);
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
        const stateData = formPassword;
        stateData[type] = event;
        if (stateData["newPassword"]) {
            if (stateData["newPassword"] === stateData["repeatNewPassword"]) {
                stateData["isdisable"] = false;
                stateData["errors"] = { newPassword: undefined }
            } else {
                stateData["errors"] = { newPassword: "Şifreler uyuşmuyor" }
            }
        } else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: "Şifreler uyuşmuyor" }
        } else if (!stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: undefined }
        }

        setFormPassword({
            newPassword: stateData["newPassword"],
            repeatNewPassword: stateData["repeatNewPassword"]
        });
        setErrors({ ...stateData["errors"] });
        setIsdisable(stateData["isdisable"]);
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
        <div>
            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Kullanıcı İsmi</th>
                        <th scope="col">Adı</th>
                        <th scope="col">Soyadı</th>
                        <th scope="col">Role</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.content.map((user, index) =>
                        <tr key={index} className={user.isLoggedIn === 1 && "table-danger"}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td >
                                {/* {" ("+user.role +") "}      */}
                                {props.roles && props.roles.map((role, index) => role.role === user.role && role.value)}
                            </td >
                            <td className="d-flex">
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
                                                    onClick={e => loadSingUser(e, user)}> Aç </button> </li>
                                            <li key={2} className="dropdown-item  " >
                                                <button
                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                    type="button"
                                                    onClick={e => handleClickUpdateOpen(user.userId)} > Bilgileri Güncelle  </button></li>

                                            <li key={3} className="dropdown-item " >
                                                <button
                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                    type="button"
                                                    onClick={e => handleClickOpen(user.userId)} > Şifre Güncelle  </button></li>

                                        </ul>
                                    </div>
                                </li>

                                {user.isLoggedIn === 1 &&
                                    <button
                                        onClick={e => makeLogOut(e, user)}
                                        type="button"
                                        className="btn btn-sm btn-danger ml-2 float-right"
                                    >Çıkış Yaptır</button>}
                            </td>
                        </tr >
                    )
                    }
                </tbody >
            </table >

            <UserCardModal title="Kullanıcı Bilgileri" user={singleUser} roles={props.roles} />

            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={openUpdateUserModal}
                onClose={handleUpdateUserClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="card">
                    {singleUser &&
                        <UserUpdatePage singleUser={singleUser} closeUpdateUser={handleUpdateUserClose} />
                    }

                    {isLoading ? <Spinner /> :
                        <div className="modal-footer">
                            <button
                                className="btn btn-sm btn-dark"
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
                    {
                        isLoading ? <Spinner /> :
                            <div className="modal-footer">
                                <button
                                    className="btn  btn-sm btn-primary"
                                    type="button"
                                    //disabled={!btnEnable}
                                    onClick={onChangePassword}> <FontAwesomeIcon icon="save"></FontAwesomeIcon>  Güncelle</button>
                                <button
                                    className="btn btn-sm btn-dark"
                                    type="button"
                                    onClick={handleClosePassword}>
                                    <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                                </button>
                            </div>
                    }
                </div>
            </Dialog>
        </div >
    );
};

export default UserListTable;

