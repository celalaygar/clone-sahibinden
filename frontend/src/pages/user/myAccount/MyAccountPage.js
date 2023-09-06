
import React, { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner';
import UserCard from '../UserCard';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';


const MyAccountPage = () => {


    const [myAccountDetail, setMyAccountDetail] = useState({
        username: "",
        email: null,
        name: "",
        surname: ""
    });
    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);


    const loadRoles = async () => {
        try {
            const roles = await ApiService.get("/roles");
            setRoles(roles.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
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
    const loadUser = async () => {
        setPendingApiCall(true);
        try {
            const response = await UserService.get("/my-account");
            setMyAccountDetail({ ...response.data })
        } catch (error) {
            if (error.response) {
                console.log(error.response)

            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setPendingApiCall(false);
    }
    useEffect(() => {
        loadUser();
        loadRoles();
    }, []);
    return (
        <div className="row">
            <div className="col-lg-6">
                {pendingApiCall ? <Spinner /> :

                    <>
                        <UserCard user={myAccountDetail} roles={roles} />
                    </>
                }
            </div>
        </div>
    );
};

export default MyAccountPage;
