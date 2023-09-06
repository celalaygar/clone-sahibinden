

import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import { logoutAction } from '../../../redux/AuthenticationAction';
import AlertifyService from '../../../services/AlertifyService';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';

class MyAccountEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            error: null,
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            errors: {
            },
            pendingApiCall: false

        };
    }

    componentDidMount() {
        this.loadUser();
    }
    loadUser = async () => {
        try {
            const response = await UserService.get("/my-account");
            //console.log(response.data)
            this.setState({ ...response.data })
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
    onChangeData = (type, event) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        stateData[type] = event

        this.setState({ stateData });
    }
    onClickUpdate = async (event) => {
        this.setState({ pendingApiCall: true })

        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }

        try {
            console.log(this.state)
            const response = await UserService.updateYourSelves(this.props.username, this.state);
            console.log(response)
            AlertifyService.alert("Bilgileriniz Güncellendi. Lütfen Tekrar Giriş Yapınız")
            ApiService.changeAuthToken(null);
            this.props.dispatch(logoutAction());
            // history.push("/index");
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    this.setState({ error: error.response.data })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false })

    }
    render() {
        if (this.props.role === "ADMIN" || this.props.match.params.username === this.props.username) {
            const { name, surname, username, /*password ,*/ email } = this.state.errors;
            //const btnEnable = this.state.username && this.state.password;
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
                                        valueName={this.state.name}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Soyisim *"}
                                        error={surname}
                                        type="text"
                                        name="surname"
                                        placeholder={"Soyisim *"}
                                        valueName={this.state.surname}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Kullanıcı İsmi *"}
                                        error={username}
                                        type="text"
                                        name="username"
                                        placeholder={"Kullanıcı İsmi *"}
                                        valueName={this.state.username}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Email *"}
                                        error={email}
                                        type="text"
                                        name="email"
                                        placeholder={"Email *"}
                                        valueName={this.state.email}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Anne Adı"}
                                        error={email}
                                        type="text"
                                        name="motherName"
                                        placeholder={"Anne Adı"}
                                        valueName={this.state.motherName}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Baba Adı"}
                                        error={email}
                                        type="text"
                                        name="fatherName"
                                        placeholder={"Baba Adı"}
                                        valueName={this.state.fatherName}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"TC NO"}
                                        type="text"
                                        name="tcNo"
                                        placeholder={"TC NO"}
                                        valueName={this.state.tcNo}
                                        onChangeData={this.onChangeData}
                                    />
                                    {
                                        this.state.pendingApiCall ? <Spinner /> :
                                            <button
                                                className="btn"
                                                id="search-button"
                                                type="button"
                                                //disabled={!btnEnable}
                                                onClick={this.onClickUpdate}>Güncelle</button>
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

export default connect(mapStateToProps)(MyAccountEditPage);