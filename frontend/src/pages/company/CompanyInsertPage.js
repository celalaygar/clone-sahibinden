
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import CountryService from '../../services/CountryService';
import CompanyService from '../../services/CompanyService';
import AlertifyService from '../../services/AlertifyService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class CompanyInsertPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyFax: '',
            companyMobilePhone: '',
            currencyType: '',
            emailAddress: '',
            customerRepresentative: '',
            corroborative: '',
            countryId: 1,
            city: '',
            errors: {
            },
            pendingApiCall: false,
            countries: []
        };
    }

    componentDidMount() {
        this.loadCountry();
        this.setState({ errors: {} })

    }
    loadCountry = async () => {
        this.setState({ pendingApiCall: true })
        try {
            const response = await CountryService.getAll();
            this.setState({ countries: response.data });
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false })
    }
    onChangeData = (type, event) => {
        const errors = { ...this.state.errors }
        errors[type] = undefined;

        const stateData = this.state;
        if (event === "" || event === "Seçiniz")
            stateData[type] = undefined
        else
            stateData[type] = event

        this.setState({ stateData, errors: errors });
    }
    save = async (event) => {
        this.setState({ pendingApiCall: true })
        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
        try {
            const response = await CompanyService.post(this.state);
            console.log(response)
            if (response.data === true) {
                this.clearState();
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
                    this.setState({ errors: error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        this.setState({ pendingApiCall: false })

    }
    clearState = () => {
        this.setState({
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyFax: '',
            companyMobilePhone: '',
            currencyType: '',
            emailAddress: '',
            customerRepresentative: '',
            corroborative: '',
            countryId: 1,
            city: '',
            errors: {
            },
            pendingApiCall: false
        })
    }
    render() {
        const { companyName, taxNo, address, companyPhone, companyFax, city, companyMobilePhone, currencyType, emailAddress } = this.state.errors;
        const { countries } = this.state;
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
                                    error={companyName && "Şirket Adı " + companyName}
                                    type="text"
                                    name="companyName"
                                    placeholder={"Şirket Adı"}
                                    valueName={this.state.companyName}
                                    onChangeData={this.onChangeData}
                                />
                            </div>

                            <div className="col-lg-4">
                                <Input
                                    label={"Vergi No (123456789012)"}
                                    error={taxNo && "Vergi No " + taxNo}
                                    type="number"
                                    name="taxNo"
                                    placeholder={"Vergi No"}
                                    valueName={this.state.taxNo}
                                    onChangeData={this.onChangeData}
                                />
                            </div>


                            {/* <div className="col-lg-4">
                                <Input
                                    label={"Döviz Cinsi"}
                                    error={currencyType}
                                    type="text"
                                    name="currencyType"
                                    placeholder={"Döviz Cinsi"}
                                    valueName={this.state.currencyType}
                                    onChangeData={this.onChangeData}
                                />
                            </div> */}

                            <div className="col-lg-12">
                                <p className="font-weight-bold"><u>Adres Bilgileri</u></p>
                            </div>


                            <div className="col-lg-4">
                                <Input
                                    label={"Açık Adres"}
                                    error={address && "Şirket Adresi " + address}
                                    type="text"
                                    name="address"
                                    placeholder={"Açık Adresi"}
                                    valueName={this.state.address}
                                    onChangeData={this.onChangeData}
                                />
                            </div>
                            <div className="col-lg-4">
                                <Input
                                    label={"Şehir"}
                                    error={city}
                                    type="text"
                                    name="city"
                                    placeholder={"Şehir"}
                                    valueName={this.state.city}
                                    onChangeData={this.onChangeData}
                                />
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Şirketin Bulunduğu Ülke </label>
                                    <select className="form-control" value={this.state.countryId} onChange={e => this.onChangeData("countryId", e.target.value)}>
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
                                    error={companyPhone && "Şirket Telefonu " + companyPhone}
                                    type="text"
                                    name="companyPhone"
                                    placeholder={"Şirket Telefonu"}
                                    valueName={this.state.companyPhone}
                                    onChangeData={this.onChangeData}
                                />
                            </div>

                            <div className="col-lg-4">
                                <Input
                                    label={"Şirket Fax No (+903124445566)"}
                                    error={companyFax && "Şirket Fax No " + companyFax}
                                    type="text"
                                    name="companyFax"
                                    placeholder={"Şirket Fax No"}
                                    valueName={this.state.companyFax}
                                    onChangeData={this.onChangeData}
                                />
                            </div>

                            <div className="col-lg-4">
                                <Input
                                    label={"Cep Telefonu * (+905324445566)"}
                                    error={companyMobilePhone && "Cep Telefonu " + companyMobilePhone}
                                    type="text"
                                    name="companyMobilePhone"
                                    placeholder={"Cep Telefonu"}
                                    valueName={this.state.companyMobilePhone}
                                    onChangeData={this.onChangeData}
                                />
                            </div>


                        </div>

                        <div className="row">



                        </div>
                        <div className="row mx-1">
                            <div className="col-lg-4">
                                <Input
                                    label={"Mail Adresi"}
                                    error={emailAddress && "Mail Adresi " + emailAddress}
                                    type="text"
                                    name="emailAddress"
                                    placeholder={"someone@example.com"}
                                    valueName={this.state.emailAddress}
                                    onChangeData={this.onChangeData}
                                />
                            </div>

                        </div>

                        {
                            this.state.pendingApiCall ? <Spinner /> :
                                <button
                                    className="btn ml-3"
                                    id="add-button"
                                    type="button"
                                    //disabled={!btnEnable}
                                    onClick={this.save}><FontAwesomeIcon icon="save"></FontAwesomeIcon> Kaydet</button>
                        }

                    </form>
                    <br />
                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>


                    }
                </div>
                <div className="col-lg-12">
                    <hr />
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

export default connect(mapStateToProps)(CompanyInsertPage);
