
import React, { Component } from 'react'
import Spinner from '../../../components/Spinner';
import UserCard from '../../../components/UserCard';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';

class NyAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            error: null,
            roles:[],
            errors: {
            },
            pendingApiCall: false

        };
    }

    componentDidMount(){
        this.loadUser();
        this.loadRoles();

    }
    loadRoles = async () => {
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
                    //AlertifyService.alert("Lütfen Tekrar giriş yapınız...");
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }
    loadUser = async ()=>{
        this.setState({pendingApiCall:true});
        try {
            const response = await UserService.get("/my-account");
            //console.log(response.data)
            this.setState({...response.data})
        } catch (error) {
            if (error.response) {
                console.log(error.response)

            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({pendingApiCall:false});
    }
    render() {
        return (
            // <div className="row">
            // <div className="col-lg-6">
            //     <UserCard {...this.state} />
            // </div>
            // </div>
            <div className="row">
            <div className="col-lg-6">
                {this.state.pendingApiCall ? <Spinner /> : 
                
                    <>
                    <UserCard user={this.state} roles={this.state.roles} />
                    </>
                }
                </div>
            </div>
        )
    }
}
export default NyAccountPage;