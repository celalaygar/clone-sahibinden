
import React, { Component, useEffect, useState } from 'react'
import Spinner from '../../components/Spinner';
import UserCard from './UserCard';
import AdminService from '../../services/AdminService';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';
import { useNavigate, useParams } from 'react-router-dom';



const UserPage = () => {

    const { userid } = useParams();
    const [myAccountDetail, setMyAccountDetail] = useState({
        id: userid,
        name: "",
        surname: "",
        username: "",
        email: null,
        motherName: undefined,
        fatherName: undefined,
        tcNo: "",
    });
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState();
    let navigate = useNavigate();


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
        setIsLoading(true);
        try {
            const response = await AdminService.get("/user/find-by-id/" + userid);
            setMyAccountDetail({ ...response.data })
        } catch (error) {
            if (error.response) {
                AlertifyService.alert(error.response.data.message)
                //navigate("/index");
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        loadUser();
        loadRoles();
    }, []);
    return (
        <div className="row">
            <div className="col-lg-6">
                {isLoading ? <Spinner /> :
                    myAccountDetail ? <UserCard roles={roles} user={myAccountDetail} /> : ""
                }
            </div>
        </div>
    );
};

export default UserPage;


