
import React, { Component } from 'react'
import Spinner from '../../components/Spinner';
import UserCard from './UserCard';
import AdminService from '../../services/AdminService';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';

export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.userid,
            name: '',
            surname: '',
            username: '',
            email: '',
            roles: [],
            error: null,
            errors: {
            },
            pendingApiCall: false

        };
    }

    componentDidMount() {
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
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }
    loadUser = async () => {
        this.setState({ pendingApiCall: true });
        console.log(this.props.match.params.userId)
        try {
            const response = await AdminService.get("/user/find-by-id/" + this.props.match.params.userid);
            //console.log(response.data)
            this.setState({ ...response.data })
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                AlertifyService.alert(error.response.data.message)
                this.props.history.push("/ndex");
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    {this.state.pendingApiCall ? <Spinner /> :

                        <UserCard roles={this.state.roles} {...this.state} />
                    }
                </div>
            </div>
        )
    }
}
