
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { ROLE_PHARMACY } from '../../constant/roleConstant';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';

class UserSignUpPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            error: null,
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            phoneNumber: undefined,
            bloodType: undefined,
            role: undefined,
            roles: [],
            bloodTypes: [
                { value: "Seçiniz", name: "Seçiniz" },
                { value: "0 RH -", name: "0 RH -" },
                { value: "0 RH +", name: "0 RH +" },
                { value: "A RH -", name: "A RH -" },
                { value: "A RH +", name: "A RH +" },
                { value: "B RH -", name: "B RH -" },
                { value: "B RH +", name: "B RH +" },
                { value: "AB RH -", name: "AB RH -" },
                { value: "AB RH +", name: "AB RH +" },
            ],
            errors: {
            },
            pendingApiCall: false

        };
    }
    componentDidMount() {
        this.loadRoles();
    }
    loadRoles = async () => {

        try {
            const roles = await ApiService.get("/roles");
            this.setState({ roles: roles.data }, ()=>{
                console.log(this.state.roles)
            })
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                }
                if (error.response.data.validationErrors) {
                    console.log(error.response.data.validationErrors);
                    this.setState({ errors: error.response.data.validationErrors })
                }
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    this.setState({ error: error.response.data })
                }
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                    //AlertifyService.alert("Lütfen Tekrar giriş yapınız...");
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }


    onChangeData = (type, event) => {
 
        const errors = { ...this.state.errors }
        errors[type] = undefined;

        const stateData = this.state;
        if (event === "" || event === "Seçiniz")
            stateData[type] = undefined
        else
            stateData[type] = event

        this.setState({ stateData, errors: errors  });
    }
    onSave = async (event) => {
        this.setState({ pendingApiCall: true })

        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }

        try {
            //const {name, surname, username, email, password, role} =this.state;
            const body = {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                motherName: this.state.motherName,
                fatherName: this.state.fatherName,
                tcNo: this.state.tcNo,
                phoneNumber:this.state.phoneNumber,
                bloodType:this.state.bloodType,
                role: this.state.role
            }
             if (this.state.role !== undefined) {
                const response = await ApiService.post("/registration", body);
                console.log(response.data)
                AlertifyService.alert("Kayıt İşlemi Başarılı")
                this.clearState();
            } else {
                let errors = {
                    role: "Lütfen Rol Belirleyiniz",
                }
                this.setState({ errors: errors })
            }


        } catch (error) {
            if (error.response) {
                console.log(error.response);

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
        this.setState({ pendingApiCall: false })

    }
    clearState = () => {

        this.setState({
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            error: null,
            role: "ADMIN",
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            roles: [],
            errors: {
            },
            pendingApiCall: false
        });
        this.loadRoles();

    }
    render() {
        if (this.props.role === "ADMIN" || this.props.match.params.username === this.props.username) {
            const { name, surname, username, password, email, role, phoneNumber } = this.state.errors;
            //const btnEnable = this.state.username && this.state.password;
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Üye Kayıt İşlemleri</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-3 ">
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
                                    <div className="col-lg-3 ">
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
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Kullanıcı İsmi *"}
                                            error={username}
                                            type="text"
                                            name="username"
                                            placeholder={"Kullanıcı İsmi *"}
                                            valueName={this.state.username}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Email *"}
                                            error={email}
                                            type="text"
                                            name="email"
                                            placeholder={"someone@example.com"}
                                            valueName={this.state.email}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"TC No"}
                                            type="text"
                                            name="tcNo"
                                            placeholder={"TC No"}
                                            valueName={this.state.tcNo}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Anne Adı"}
                                            type="text"
                                            name="motherName"
                                            placeholder={"Anne Adı"}
                                            valueName={this.state.motherName}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Baba Adı"}
                                            type="text"
                                            name="fatherName"
                                            placeholder={"Baba Adı"}
                                            valueName={this.state.fatherName}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Şifre *"}
                                            error={password}
                                            type="password"
                                            name="password"
                                            placeholder={"Şifre *"}
                                            valueName={this.state.password}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Telefon Numarası"}
                                            error={phoneNumber}
                                            type="text"
                                            name="phoneNumber"
                                            placeholder={"Telefon Numarası"}
                                            valueName={this.state.phoneNumber}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>

                                    <div className="col-lg-3 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Kan Grubu</label>
                                            <select className="form-control" value={this.state.bloodType} onChange={e => this.onChangeData("bloodType", e.target.value)}>

                                                {this.state.bloodTypes.map((type, index) =>
                                                    <option key={index} value={type.value}>{type.name}</option>
                                                )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Rol</label>
                                            <select className={role ? "form-control is-invalid" : "form-control"} value={this.state.role} onChange={e => this.onChangeData("role", e.target.value)}>
                                                <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                                {this.state.roles.map((role, index) =>
                                                    role.role !== ROLE_PHARMACY &&
                                                    <option key={index} value={role.role}>{role.value}</option>
                                                )
                                                }
                                            </select>
                                            <div className="invalid-feedback">{role}</div>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 ">

                                    </div>
                                </div>
                                <form >

                                    {
                                        this.state.pendingApiCall ? <Spinner /> :
                                            <button
                                                className="btn"
                                                id="search-button"
                                                type="button"
                                                //disabled={!btnEnable}
                                                onClick={this.onSave}>Kaydet</button>
                                    }

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (null
            // <Navigate to="/index" replace={true} />
            )
        }
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

export default connect(mapStateToProps)(UserSignUpPage);