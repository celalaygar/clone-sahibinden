import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginHandler } from './../../redux/AuthenticationAction';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import '../../assets/css/UserLoginPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class UserLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: null,
            password: '',
            error: null,
            errors: {
            },
            pendingApiCall: false

        };
    }
    componentDidMount() {
        // Axios.interceptors.request.use(request => {
        //     this.setState({ pendingApiCall: true })
        //     return request;
        // });
        // Axios.interceptors.response.use(request => {
        //     this.setState({ pendingApiCall: false })
        //     return request;
        // }, error => {
        //     this.setState({ pendingApiCall: false })
        //     throw error;
        // });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    onChangeData = (type, event) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        stateData[type] = event

        this.setState({ stateData });
    }
    onClickLogin = async (event) => {
        this.setState({ pendingApiCall: true })

        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
        const { dispatch, history } = this.props;
        const { username, password } = this.state;
        const creds = { username, password };

        try {
            await dispatch(loginHandler(creds));
            history.push("/index");
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    this.setState({ error: error.response.data })
                }
                if (error.response.status === 409 && error.response.data) {
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
    onKeyPressLogin = async (event) => {
        this.setState({ pendingApiCall: true })

        // event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
        const { dispatch, history } = this.props;
        const { username, password } = this.state;
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
                    this.setState({ error: error.response.data })
                }
                if (error.response.status === 409 && error.response.data) {
                    console.log(error.response.data)
                    this.setState({ error: error.response.data })
                }
            }
            else if (error.request) {

                this.setState({ error: "NETWORK" })
                console.log(error.request);
            }
            else {
                this.setState({ error: "Hay Aksi 2" })
                console.log(error.message);
            }
        }
        this.setState({ pendingApiCall: false })

    }
    render() {
        const { username, password } = this.state.errors;
        const btnEnable = this.state.username && this.state.password;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div id="formContent">
                            <div id="formFooter">
                                {/* <h3 className="panel-title col-md-4 offset-md-4">Giriş Yap</h3> */}
                                <img className="img" src={""} width="100" height="100" />
                            </div>
                            <div className="col-md-12 offset-md-12 p-5" >
                                <br />
                                <form onKeyPress={this.onKeyPressLogin}  >
                                    <Input
                                        label={"Üye Adı"}
                                        error={username}
                                        type="text"
                                        name="username"
                                        placeholder={"Üye Adı"}
                                        valueName={this.state.username}
                                        onChangeData={this.onChangeData}
                                    />
                                    <Input
                                        label={"Şifre"}
                                        error={password}
                                        type="password"
                                        name="password"
                                        placeholder={"Şifre"}
                                        valueName={this.state.password}
                                        onChangeData={this.onChangeData}
                                    />
                                </form>
                                {
                                    this.state.pendingApiCall ? <Spinner /> :
                                        <button
                                            className="btn"
                                            id="search-button"
                                            type="button"
                                            disabled={!btnEnable}
                                            onClick={this.onClickLogin}><FontAwesomeIcon icon="sign-out-alt"></FontAwesomeIcon> Giriş Yap</button>
                                }

                            </div>
                            <br />
                            {this.state.error &&
                                <div className="alert alert-danger" role="alert">
                                    {this.state.error === "UNAUTHORIZED" && "Hata : Kullanıcı Adı veya Şifre Hatalı"}
                                    {this.state.error === "CONFLICT" && "Hata : Üye Girişi Zaten Yapıldı"}
                                    {this.state.error === "NETWORK" && "Hata : Sistem ile İlgili Bir Problem Oluştu. Yetkiliye Başvurunuz"}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        )
    }
}
// withTranslation to change language (turkısh <=> english)
// connect for redux
export default connect()(UserLoginPage);