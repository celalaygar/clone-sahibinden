import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import AlertifyService from '../../services/AlertifyService';
import ApiService from '../../services/base/ApiService';
import { selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';

const UserSignUpPage = () => {
    const selectedAuth = useSelector(selectedAuthentication);

    const { username: paramUsername } = useParams();
    const [bloodTypes, setBloodTypes] = useState([
        { value: "0 RH -", name: "0 RH -" },
        { value: "0 RH +", name: "0 RH +" },
        { value: "A RH -", name: "A RH -" },
        { value: "A RH +", name: "A RH +" },
        { value: "B RH -", name: "B RH -" },
        { value: "B RH +", name: "B RH +" },
        { value: "AB RH -", name: "AB RH -" },
        { value: "AB RH +", name: "AB RH +" },
    ]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        motherName: undefined,
        fatherName: undefined,
        tcNo: undefined,
        phoneNumber: undefined,
        bloodType: undefined,
        role: "Seçiniz",
    });
    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);


    const loadRoles = async () => {

        setPendingApiCall(true);
        try {
            const res = await ApiService.get("/roles");
            setRoles(res.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                }
                if (error.response.data.validationErrors) {
                    console.log(error.response.data.validationErrors);
                    setErrors({ ...error.response.data.validationErrors })
                }
                if (error.response.status === 401 && error.response.data) {
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
        setPendingApiCall(false);
    }

    const onChangeData = (type, event) => {

        const err = { ...errors }
        err[type] = undefined;

        const stateData = formData;
        if (event === "" || event === "Seçiniz")
            stateData[type] = undefined
        else
            stateData[type] = event

        setErrors({ ...err })
        setFormData({ ...stateData })
    }
    const onSave = async (event) => {
        setPendingApiCall(true);
        event.preventDefault();
        if (error) {
            setError(null);
        }
        try {
            const body = {
                name: formData.name,
                surname: formData.surname,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                motherName: formData.motherName,
                fatherName: formData.fatherName,
                tcNo: formData.tcNo,
                phoneNumber: formData.phoneNumber,
                bloodType: formData.bloodType,
                role: formData.role === "Seçiniz" ? null : formData.role
            }
            const response = await ApiService.post("/registration", body);
            console.log(response.data)
            AlertifyService.alert("Kayıt İşlemi Başarılı")
            clearState();
        } catch (error) {
            if (error.response) {
                console.log(error.response);

                if (error.response.data.validationErrors) {
                    console.log(error.response.data.validationErrors);
                    setErrors({ ...error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setPendingApiCall(false);
    }

    useEffect(() => {
        loadRoles();
    }, []);

    const clearState = () => {

        setFormData({
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            motherName: undefined,
            fatherName: undefined,
            tcNo: undefined,
            phoneNumber: undefined,
            bloodType: "Seçiniz",
            role: "Seçiniz",
        });
        setRoles([]);
        setPendingApiCall(false);
        setErrors({});
        setError();
        loadRoles();

    }
    if (selectedAuth.role === "ADMIN") {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Üye Kayıt</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 ">
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
                                <div className="col-lg-3 ">
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
                                <div className="col-lg-3 ">
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
                                <div className="col-lg-3 ">
                                    <Input
                                        label={"Email *"}
                                        error={errors.email}
                                        type="text"
                                        name="email"
                                        placeholder={"someone@example.com"}
                                        valueName={formData.email}
                                        onChangeData={onChangeData}
                                    />
                                </div>
                                <div className="col-lg-3 ">
                                    <Input
                                        label={"TC No"}
                                        error={errors.tcNo}
                                        type="text"
                                        name="tcNo"
                                        placeholder={"TC No"}
                                        valueName={formData.tcNo}
                                        onChangeData={onChangeData}
                                    />
                                </div>
                                <div className="col-lg-3 ">
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
                                <div className="col-lg-3 ">
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
                                <div className="col-lg-3 ">
                                    <Input
                                        label={"Şifre *"}
                                        error={errors.password}
                                        type="password"
                                        name="password"
                                        placeholder={"Şifre *"}
                                        valueName={formData.password}
                                        onChangeData={onChangeData}
                                    />
                                </div>
                                <div className="col-lg-3 ">
                                    <Input
                                        label={"Telefon Numarası"}
                                        error={errors.phoneNumber}
                                        type="text"
                                        name="phoneNumber"
                                        placeholder={"Telefon Numarası"}
                                        valueName={formData.phoneNumber}
                                        onChangeData={onChangeData}
                                    />
                                </div>

                                <div className="col-lg-3 ">
                                    <div className="form-group" style={{ textAlign: "left", margin: "15px" }} >
                                        <label htmlFor="exampleInputEmail1">Kan Grubu</label>
                                        <select className="form-control"
                                            value={formData.bloodType} onChange={e => onChangeData("bloodType", e.target.value)}>

                                            <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                            {bloodTypes.map((type, index) =>
                                                <option key={index} value={type.value}>{type.name}</option>
                                            )
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-3 ">
                                    <div className="form-group" style={{ textAlign: "left", margin: "15px" }} >
                                        <label htmlFor="exampleInputEmail1">Rol</label>
                                        <select className={errors.role ? "form-control is-invalid" : "form-control"}
                                            value={formData.role} onChange={e => onChangeData("role", e.target.value)}>

                                            <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                            {roles && roles.map((role, index) =>
                                                <option key={index} value={role.role}>{role.value}</option>
                                            )
                                            }
                                        </select>
                                        <div className="invalid-feedback">{errors.role}</div>
                                    </div>

                                </div>
                                <div className="col-lg-3 ">

                                </div>
                            </div>
                            <form >
                                {pendingApiCall ? <Spinner /> :
                                    <button
                                        className="btn"
                                        id="search-button"
                                        type="button"
                                        //disabled={!btnEnable}
                                        onClick={onSave}>
                                        <FontAwesomeIcon icon="save" > </FontAwesomeIcon> Kaydet</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (null)
    }
};

export default UserSignUpPage;