
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@material-ui/core';
import AlertifyService from '../../services/AlertifyService';
import UserService from '../../services/UserService';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import UserCardModal from './UserCardModal';
import UserUpdatePage from './UserUpdatePage';

class UserListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            roles: props.roles,
            singleUser: {},
            currentUpdateUserId: {},
            openChangePasswordModal: false,
            openUpdateUserModal: false,
            newPassword: undefined,
            repeatNewPassword: undefined,
            currentUserId: undefined,
            isdisable: true,
            //roles: [],
            pendingApiCall: false,
            errors: {
            },
        };
    }



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
            console.log(response);

            // setOpenChangePasswordModal(false);
            this.setState({
                openChangePasswordModal: false,
                newPassword: undefined,
                repeatNewPassword: undefined,
            });
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
        this.setState({ pendingApiCall: false })
    }
    onChangeData = (type, event) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        if (event === "" || event === "Seçiniz")
            stateData[type] = undefined
        else
            stateData[type] = event

        this.setState({ stateData });
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
                stateData["errors"] = { newPassword: "Şifreler uyuşmuyor" }
            }
        } else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: "Şifreler uyuşmuyor" }
        } else if (!stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            stateData["errors"] = { newPassword: undefined }
        }

        this.setState({ stateData });
    }

    makeLogOut = async (event, user) => {
        this.setState({ pendingApiCall: true })
        try {
            const response = await UserService.makeLogOut(user.username);
            if (response.data === true)
                AlertifyService.alert("Üyelik Çıkış Yaptırıldı.");
            if (response.data === false)
                AlertifyService.alert("Sistemde Bir Hata Oluştu. Lütfen Yetkiliye Başvurunuz");
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

    loadSingUser = (e, user) => {
        this.setState({ singleUser: user })
    }

    render() {
        const { newPassword } = this.state.errors;
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
                        {this.props.users.content.map((user, index) =>
                            <tr key={index} className={user.isLoggedIn === 1 && "table-danger"}>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td >
                                    {/* {" ("+user.role +") "}      */}
                                    {this.props.roles && this.props.roles.map((role, index) => role.role === user.role && role.value)}
                                </td>
                                <td className="d-flex">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary btn-sm dropdown-toggle"
                                            type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"> İşlemler </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button
                                                type="button"
                                                onClick={e => this.loadSingUser(e, user)}
                                                className="dropdown-item btn-sm"
                                                data-toggle="modal"
                                                data-target="#openUserModal">
                                                Aç
                                            </button>
                                            <button
                                                className="dropdown-item btn-sm"
                                                type="button"
                                                onClick={e => this.handleClickUpdateOpen(user.userId)} > Bilgileri Güncelle  </button>

                                            <button
                                                className="dropdown-item btn-sm"
                                                type="button"
                                                onClick={e => this.handleClickOpen(user.userId)} > Şifre Güncelle  </button>

                                        </div>
                                    </div>

                                    {user.isLoggedIn === 1 &&
                                        <button
                                            onClick={e => this.makeLogOut(e, user)}
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2 float-right"
                                        >Çıkış Yaptır</button>}
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>

                <UserCardModal title="Kullanıcı Bilgileri" user={this.state.singleUser} roles={this.props.roles} />

                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.state.openUpdateUserModal}
                    onClose={this.handleUpdateUserClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="card">

                        <UserUpdatePage
                            userId={this.state.currentUpdateUserId}
                            closeUpdateUser={this.handleUpdateUserClose} />


                        {
                            this.state.pendingApiCall ? <Spinner /> :
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-sm btn-dark"
                                        type="button"
                                        onClick={this.handleUpdateUserClose}>
                                        <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                                    </button>
                                </div>
                        }
                    </div>
                </Dialog>
                <Dialog
                    fullWidth={true}
                    maxWidth={"sm"}
                    open={this.state.openChangePasswordModal}
                    onClose={this.handleClosePassword}
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
                                        error={newPassword}
                                        placeholder={"Yeni Şifre"}
                                        valueName={this.state.newPassword}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <Input
                                        label={"Yeni Şifre (Tekrar)"}
                                        type="password"
                                        name="repeatNewPassword"
                                        placeholder={"Yeni Şifre (Tekrar)"}
                                        valueName={this.state.repeatNewPassword}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            this.state.pendingApiCall ? <Spinner /> :
                                <div class="modal-footer">
                                    <button
                                        className="btn  btn-sm btn-primary"
                                        type="button"
                                        //disabled={!btnEnable}
                                        onClick={this.onChangePassword}> <FontAwesomeIcon icon="save"></FontAwesomeIcon>  Güncelle</button>
                                    <button
                                        className="btn btn-sm btn-dark"
                                        type="button"
                                        onClick={this.handleClosePassword}>
                                        <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                                    </button>
                                </div>
                        }
                    </div>
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        jwttoken: store.jwttoken,
        role: store.role
    };
};

export default connect(mapStateToProps)(UserListTable);
