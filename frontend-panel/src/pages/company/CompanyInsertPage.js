import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import CountryService from '../../services/CountryService';
import CompanyService from '../../services/CompanyService';
import AlertifyService from '../../services/AlertifyService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const CompanyInsertPage = () => {

    const [formData, setFormData] = useState({
        companyName: '',
        taxNo: '',
        address: '',
        companyPhone: '',
        companyFax: '',
        companyMobilePhone: '',
        currencyType: '',
        emailAddress: '',
        countryId: 1,
        city: '',
    });
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    const loadCountry = async () => {
        setIsLoading(true)

        try {
            const response = await CountryService.getAll();
            setCountries(response.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false)

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
    const save = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        if (error) {
            setError(null)
        }
        try {
            const response = await CompanyService.post(formData);
            if (response.data === true) {
                clearState();
                AlertifyService.delaySuccessMessage(5, "Kayıt işlemi Başarılı")
            }
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
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false)


    }
    const clearState = () => {
        setFormData({
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyFax: '',
            companyMobilePhone: '',
            currencyType: '',
            emailAddress: '',
            countryId: 1,
            city: '',
        })
        setErrors({})
        setIsLoading(false)
    }

    useEffect(() => {
        loadCountry();
    }, []);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card-header"><h5 clasName="mb-0" className="card-title">Şirket Ekle</h5></div>

                <p className="description-p ml-3 mt-2" style={{ color: "red" }}>  ( * ) Zorunlu alanlar </p>
                <form >
                    <div className="row mx-1">
                        <div className="col-lg-4">
                            <Input
                                label={"Şirket Adı *"}
                                error={errors.companyName && "Şirket Adı " + errors.companyName}
                                type="text"
                                name="companyName"
                                placeholder={"Şirket Adı"}
                                valueName={formData.companyName}
                                onChangeData={onChangeData}
                            />
                        </div>

                        <div className="col-lg-4">
                            <Input
                                label={"Vergi No (123456789012)"}
                                error={errors.taxNo && "Vergi No " + errors.taxNo}
                                type="number"
                                name="taxNo"
                                placeholder={"Vergi No"}
                                valueName={formData.taxNo}
                                onChangeData={onChangeData}
                            />
                        </div>

                        <div className="col-lg-12">
                            <p className="font-weight-bold"><u>Adres Bilgileri</u></p>
                        </div>


                        <div className="col-lg-4">
                            <Input
                                label={"Açık Adres"}
                                error={errors.address && "Şirket Adresi " + errors.address}
                                type="text"
                                name="address"
                                placeholder={"Açık Adresi"}
                                valueName={formData.address}
                                onChangeData={onChangeData}
                            />
                        </div>
                        <div className="col-lg-4">
                            <Input
                                label={"Şehir"}
                                error={errors.city}
                                type="text"
                                name="city"
                                placeholder={"Şehir"}
                                valueName={formData.city}
                                onChangeData={onChangeData}
                            />
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Şirketin Bulunduğu Ülke </label>
                                <select className="form-control" value={formData.countryId} onChange={e => onChangeData("countryId", e.target.value)}>
                                    {countries.map((country, index) =>
                                        <option key={index} value={country.countryId}>{country.name}</option>
                                    )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-1">

                        <div className="col-lg-12">
                            <p className="font-weight-bold"><u>İletişim Bilgileri</u></p>
                        </div>


                        <div className="col-lg-4">
                            <Input
                                label={"Şirket Telefonu (+903124445566)"}
                                error={errors.companyPhone && "Şirket Telefonu " + errors.companyPhone}
                                type="text"
                                name="companyPhone"
                                placeholder={"Şirket Telefonu"}
                                valueName={formData.companyPhone}
                                onChangeData={onChangeData}
                            />
                        </div>

                        <div className="col-lg-4">
                            <Input
                                label={"Şirket Fax No (+903124445566)"}
                                error={errors.companyFax && "Şirket Fax No " + errors.companyFax}
                                type="text"
                                name="companyFax"
                                placeholder={"Şirket Fax No"}
                                valueName={formData.companyFax}
                                onChangeData={onChangeData}
                            />
                        </div>

                        <div className="col-lg-4">
                            <Input
                                label={"Cep Telefonu * (+905324445566)"}
                                error={errors.companyMobilePhone && "Cep Telefonu " + errors.companyMobilePhone}
                                type="text"
                                name="companyMobilePhone"
                                placeholder={"Cep Telefonu"}
                                valueName={formData.companyMobilePhone}
                                onChangeData={onChangeData}
                            />
                        </div>
                    </div>
                    <div className="row">
                    </div>
                    <div className="row mx-1">
                        <div className="col-lg-4">
                            <Input
                                label={"Mail Adresi"}
                                error={errors.emailAddress && "Mail Adresi " + errors.emailAddress}
                                type="text"
                                name="emailAddress"
                                placeholder={"someone@example.com"}
                                valueName={formData.emailAddress}
                                onChangeData={onChangeData}
                            />
                        </div>
                    </div>

                    {isLoading ? <Spinner /> :
                        <button
                            className="btn ml-3"
                            id="add-button"
                            type="button"
                            //disabled={!btnEnable}
                            onClick={save}><FontAwesomeIcon icon="save"></FontAwesomeIcon> Kaydet</button>
                    }

                </form>
                <br />
                {error &&
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                }
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
};

export default CompanyInsertPage;