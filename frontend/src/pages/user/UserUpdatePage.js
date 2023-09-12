import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import alertify from 'alertifyjs';
import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import AdminService from '../../services/AdminService';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';



const UserUpdatePage = (props) => {
    const [formData, setformData] = useState({
        id: props.singleUser.userId,
        name: '',
        surname: '',
        username: '',
        email: '',
        error: null,
        role: "ADMIN",
        motherName: undefined,
        fatherName: undefined,
        tcNo: undefined,
    });

    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const loadRoles = async () => {
        setIsLoading(true);

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
        setIsLoading(false);
    }
    const loadUser = async (userId) => {
        setIsLoading(true);
        try {
            const response = await AdminService.get("/user/find-by-id/" + userId);
            setformData({ ...response.data })

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
        setIsLoading(false);
    }

    const onChangeData = (name, value) => {
        if (error) {
            setError(null);
        }
        const stateData = formData;
        stateData[name] = value

        setformData({ ...stateData });
    }

    const refreshPage = () => {
        const userId = props.userId;
        loadRoles();
        loadUser(props.userId);
    }


    const updateUser = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (error) {
            setError(null);
        }
        try {
            let body = {
                name: formData.name,
                surname: formData.surname,
                role: formData.role,
                email: formData.email,
                username: formData.username,
                motherName: formData.motherName,
                fatherName: formData.fatherName,
                tcNo: formData.tcNo
            };
            if (formData.role !== undefined) {
                const response = await AdminService.update("/user/" + props.userId, body);
                props.closeUpdateUser();
                alertify.alert('Uyarı', "Güncelleme İşlemi Başarılı").set({ onclosing: function () { window.location.reload(); } });

            } else {
                let errors = {
                    role: "Lütfen Rol Belirleyiniz",
                }
                setErrors({ ...errors })
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                }
                if (error.response.data.validationErrors) {
                    setErrors({ ...error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);
        this.refreshPage();

    }

    const clearState = () => {

        setformData({
            name: '',
            surname: '',
            username: '',
            email: '',
            error: null,
            userId: 1,
            role: "ADMIN",
        });
        setErrors(null)
        setIsLoading(false);
    }
    useEffect(() => {
        loadRoles();
        loadUser(props.singleUser.userId);
    }, []);

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
                                    error={errors.username}
                                    type="text"
                                    name="username"
                                    placeholder={"Kullanıcı İsmi *"}
                                    valueName={formData.username}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label={"Email *"}
                                    error={errors.email}
                                    type="text"
                                    name="email"
                                    placeholder={"Email *"}
                                    valueName={formData.email}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label={"İsim *"}
                                    error={errors.name}
                                    type="text"
                                    name="name"
                                    placeholder={"İsim *"}
                                    valueName={formData.name}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">

                                <Input
                                    label={"Soyisim *"}
                                    error={errors.surname}
                                    type="text"
                                    name="surname"
                                    placeholder={"Soyisim *"}
                                    valueName={formData.surname}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label={"Anne Adı"}
                                    error={errors.motherName}
                                    type="text"
                                    name="motherName"
                                    placeholder={"Anne Adı"}
                                    valueName={formData.motherName}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label={"Baba Adı"}
                                    error={errors.fatherName}
                                    type="text"
                                    name="fatherName"
                                    placeholder={"Baba Adı"}
                                    valueName={formData.fatherName}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <Input
                                    label={"TC NO"}
                                    error={errors.tcNo}
                                    type="text"
                                    name="tcNo"
                                    placeholder={"TC NO"}
                                    valueName={formData.tcNo}
                                    onChangeData={onChangeData}
                                />
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Rol</label>
                                    <select
                                        className={errors.role ? "form-control is-invalid" : "form-control"}
                                        value={formData.role}
                                        onChange={e => onChangeData("role", e.target.value)}>
                                        <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                        {roles && !!roles.length && roles.map((role, index) =>
                                            <option key={index} value={role.role}>{role.value}</option>
                                        )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.role}</div>
                                </div>

                            </div>
                        </div>
                        {isLoading ? <Spinner /> :
                            <div>
                                <button
                                    className="btn"
                                    id="search-button"
                                    type="button"
                                    //disabled={!btnEnable}
                                    onClick={updateUser}><FontAwesomeIcon icon="save"></FontAwesomeIcon> Güncelle</button>
                            </div>
                        }

                    </form>
                    <br />
                    {error &&
                        <div className="alert alert-danger" role="alert">{error}</div>
                    }
                </div>
                <div className="col"></div>
                <div className="col-lg-12">
                </div>
            </div>
        </>
    );
};


export default UserUpdatePage;

