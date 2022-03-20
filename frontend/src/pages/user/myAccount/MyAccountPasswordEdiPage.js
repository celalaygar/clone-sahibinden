
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import { logoutAction } from '../../../redux/AuthenticationAction';
import AlertifyService from '../../../services/AlertifyService';
import UserService from '../../../services/UserService';

class MyAccountPasswordEdiPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword:'',
            repeatNewPassword:'',
            isdisable: true,
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
        stateData[type] = event;
        if(stateData["newPassword"]){
            if(stateData["newPassword"] === stateData["repeatNewPassword"]){
                stateData["isdisable"] = false;
                stateData["errors"]={newPassword: undefined}
            }else{
                stateData["errors"]={newPassword: "Şifreler Uyuşmuyor"}
            }
        }else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            stateData["errors"]={newPassword: "Şifreler Uyuşmuyor"}
        }else if ( !stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            stateData["errors"]={newPassword: undefined}
        }

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
            let body = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                repeatNewPassword: this.state.repeatNewPassword,
            }
            const response = await UserService.updateMyPassword(body);
            console.log(response.data)
            if(response.data.body=== true){
                AlertifyService.alert("Şifreniz Güncellendi. Lütfen Tekrar Giriş Yapınız")
                this.props.dispatch(logoutAction());
            }else{
                AlertifyService.alert(response.data)
            }

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
        const {oldPassword,newPassword} =  this.state.errors;
        return (
            <div className="row">
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Şifremi Güncelle</h5>
                    </div>
                    <div className="card-body">
                        <form >
                            <Input
                                label={"Mevcut Şifreniz *"}
                                error={oldPassword}
                                type="password"
                                name="oldPassword"
                                placeholder={"Mevcut Şifreniz *"}
                                valueName={this.state.oldPassword}
                                onChangeData={this.onChangeData}
                            />
                            <Input
                                label={"Yeni Şifreniz *"}
                                error={newPassword}
                                type="password"
                                name="newPassword"
                                placeholder={"Yeni Şifreniz *"}
                                valueName={this.state.newPassword}
                                onChangeData={this.onChangeData}
                            />
                            <Input
                                label={"Yeni Şifreniz (Tekrar) *"} 
                                type="password"
                                name="repeatNewPassword"
                                placeholder={"Yeni Şifreniz (Tekrar)) *"}
                                valueName={this.state.repeatNewPassword}
                                onChangeData={this.onChangeData}
                            />
                            
                            {
                                this.state.pendingApiCall ? <Spinner /> :
                                    <button
                                        className="btn"
                                        id="search-button"
                                        type="button"
                                        //disabled={!btnEnable}
                                        disabled={this.state.isdisable? true:""}
                                        onClick={this.onClickUpdate}>Güncelle</button>
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
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(MyAccountPasswordEdiPage);