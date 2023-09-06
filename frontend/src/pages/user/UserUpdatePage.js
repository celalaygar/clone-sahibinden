import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import alertify from 'alertifyjs';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import { ROLE_PHARMACY } from '../../constant/roleConstant';
import AdminService from '../../services/AdminService';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';


class UserUpdatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userId,
            name: '',
            surname: '',
            username: '',
            email: '',
            error: null,
            role: "ADMIN",
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            openUpdateUserModal: false,
            roles: [],
            errors: {
            },
            pendingApiCall: false,


        };
    }

    componentDidMount() {
        this.loadRoles();
        this.loadUser(this.props.userId);

    }
    loadRoles = async () => {
        this.setState({ pendingApiCall: true })

        try {
            const roles = await ApiService.get("/roles");
            this.setState({ roles: roles.data })
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    this.setState({ error: error.response.data })
                }
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                    AlertifyService.alert("Lütfen Tekrar Giriş Yapınız");
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false })
    }
    loadUser = async (userId) => {

        this.setState({ pendingApiCall: true })
        try {

            const response = await AdminService.get("/user/find-by-id/" + userId);
            this.setState({ ...response.data })

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                AlertifyService.alert(error.response.data);
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
        this.setState({ pendingApiCall: false });
    }

    onChangeData = (name, value) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        stateData[name] = value

        this.setState({ stateData });
    }

    refreshPage = () => {
        const userId = this.props.userId;
        this.loadRoles();
        this.loadUser(this.props.userId);
    }

    updateUser = async (event) => {
        this.setState({ pendingApiCall: true })
        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
        try {
            let body = {
                name: this.state.name,
                surname: this.state.surname,
                role: this.state.role,
                email: this.state.email,
                username: this.state.username,
                motherName: this.state.motherName,
                fatherName: this.state.fatherName,
                tcNo: this.state.tcNo
            };
            if (this.state.role !== undefined) {
                //console.log(body)
                const response = await AdminService.update("/user/" + this.props.userId, body);
                console.log(response.data)
                this.props.closeUpdateUser();
                alertify.alert('Uyarı', "Güncelleme İşlemi Başarılı").set({ onclosing: function () { window.location.reload(); } });
                // AlertifyService.alert("Güncelleme işlemi başarılı");

            } else {
                let errors = {
                    role: "Lütfen Rol Belirleyiniz",
                }
                this.setState({ errors: errors })
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                    AlertifyService.alert("Lütfen Tekrar Giriş Yapınız");
                }
                if (error.response.data.validationErrors) {
                    console.log(error.response.data.validationErrors);
                    this.setState({ errors: error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false });
        this.refreshPage();

    }

    clearState = () => {

        this.setState({
            name: '',
            surname: '',
            username: '',
            email: '',
            error: null,
            userId: 1,
            role: "ADMIN",
            roles: [],
            errors: {
            },
            pendingApiCall: false
        });

    }


    render() {
        const { name, surname, username, email, role } = this.state.errors;


        return (
            <>
                <div className="m-3 card">
                    <div className="card-header">
                        <h5 className>Üye Güncelle</h5>
                    </div>
                    <div className="card-body">
                        <form >
                            <div className="row">
                                <div className="col-lg-6">
                                    <Input
                                        label={"Kullanıcı İsmi *"}
                                        error={username}
                                        type="text"
                                        disabled={this.state.role === ROLE_PHARMACY ? true : false}
                                        name="username"
                                        placeholder={"Kullanıcı İsmi *"}
                                        valueName={this.state.username}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        label={"Email *"}
                                        error={email}
                                        type="text"
                                        name="email"
                                        placeholder={"Email *"}
                                        valueName={this.state.email}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        label={"İsim *"}
                                        error={name}
                                        type="text"
                                        name="name"
                                        placeholder={"İsim *"}
                                        valueName={this.state.name}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">

                                    <Input
                                        label={"Soyisim *"}
                                        error={surname}
                                        type="text"
                                        name="surname"
                                        placeholder={"Soyisim *"}
                                        valueName={this.state.surname}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        label={"Anne Adı"}
                                        error={email}
                                        type="text"
                                        name="motherName"
                                        placeholder={"Anne Adı"}
                                        valueName={this.state.motherName}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        label={"Baba Adı"}
                                        error={email}
                                        type="text"
                                        name="fatherName"
                                        placeholder={"Baba Adı"}
                                        valueName={this.state.fatherName}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <Input
                                        label={"TC NO"}
                                        type="text"
                                        name="tcNo"
                                        placeholder={"TC NO"}
                                        valueName={this.state.tcNo}
                                        onChangeData={this.onChangeData}
                                    />
                                </div>
                                <div className="col-lg-6">


                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Rol</label>
                                        <select
                                            disabled={this.state.role === ROLE_PHARMACY ? true : false}
                                            className={role ? "form-control is-invalid" : "form-control"}
                                            value={this.state.role}
                                            onChange={e => this.onChangeData("role", e.target.value)}>
                                            <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                            {this.state.roles.map((role, index) =>
                                                <option key={index} value={role.role}>{role.value}</option>
                                            )
                                            }
                                        </select>
                                        <div className="invalid-feedback">{role}</div>
                                    </div>

                                </div>
                            </div>
                            {
                                this.state.pendingApiCall ? <Spinner /> :
                                    <div>
                                        <button
                                            className="btn"
                                            id="search-button"
                                            type="button"
                                            //disabled={!btnEnable}
                                            onClick={this.updateUser}><FontAwesomeIcon icon="save"></FontAwesomeIcon> Güncelle</button>
                                    </div>

                            }

                        </form>
                        <br />
                        {this.state.error &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.error}
                            </div>


                        }
                    </div>
                    <div className="col"></div>
                    <div className="col-lg-12">
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps)(UserUpdatePage);

