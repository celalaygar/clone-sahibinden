

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import BackButton from '../../components/BackButton';
import Input from '../../components/Input';
import AlertifyService from '../../services/AlertifyService';
import CompanyService from '../../services/CompanyService';
import CountryService from '../../services/CountryService';

class CompanyUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: this.props.singleCompany.companyId,
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyMobilePhone: '',
            companyFax: '',
            emailAddress:undefined,
            countryId: undefined,
            country: {},
            city: '',
            errors: {
            },
            pendingApiCall: false,
            countries: []
        };
    }

    componentDidMount() {
        //const country = CountryService.getAll()
        this.loadCountry();
        this.loadCompany(this.props.singleCompany.companyId);
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
    loadCountry = async () => {
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
    }

    loadCompany = async (companyId) => {
        //localhost:8500/api/admin/company/find-by-id/3
        try {
            const response = await CompanyService.get("/find-by-id/" + companyId);
            
            this.setState({ ...response.data, countryId: response.data.country.countryId })

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                AlertifyService.alert(error.response.data.message);
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
    }
    onChangeData = (type, event) => {
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        stateData[type] = event

        this.setState({ stateData });
    }
    updateCompany = async (event) => {
        this.setState({ pendingApiCall: true })
        event.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
        try {
            let body = {
                ...this.state
            }
            const response = await CompanyService.update(this.props.singleCompany.companyId, body); 
 
            AlertifyService.delaySuccessMessage(5,"Güncelleme İşlemi Başarılı");
            this.props.closeCompanyUpdatePanel()
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
                    AlertifyService.delayErrorMessage(8,"Güncelleme İşlemi Sırasında Bir Hata Oluştu. Lütfen Tekrar Deneyiniz");
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
        this.setState({ pendingApiCall: false });

    }
    clearState = () => {
        this.setState({
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyFax: '',
            countryId: 1,
            city: '',
            errors: {
            },
            pendingApiCall: false
        })
    }
    render() {
        const { companyName, taxNo, address, companyPhone, companyFax, city, companyMobilePhone } = this.state.errors;
        const { countries } = this.state;
        return (
                <div className="card m-1">
                    <div className="card-header">
                        <h5  className="card-title mb-0">
                            Şirket Bilgilerini Düzenle
                        </h5>
                    </div>

                    <hr />
                    <p className="description-p" style={{ color: "red" }}>  ( * ) Zorunlu alanlar </p>
                    
                    <div className="card-body">
                    <form >
                        <div className="row">
                            <div className="col-lg-4">
                                <Input
                                    label={"Şirket Adı *"}
                                    error={companyName}
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
                                    error={taxNo}
                                    type="number"
                                    name="taxNo"
                                    placeholder={"Vergi No"}
                                    valueName={this.state.taxNo}
                                    onChangeData={this.onChangeData}
                                />
                            </div>
                            <div className="col-lg-4">
                                <Input
                                    label={"Açık Adres"}
                                    error={address}
                                    type="text"
                                    name="address"
                                    placeholder={"Açık Adresi"}
                                    valueName={this.state.address}
                                    onChangeData={this.onChangeData}
                                />
                            </div>
                            <div className="col-lg-4">
                                <Input
                                    label={"Şirket Telefonu * (+903124445566)"}
                                    error={companyPhone}
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
                                    error={companyFax}
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
                                <Input
                                    label={"Mail Adresi"}
                                    type="text"
                                    name="emailAddress"
                                    placeholder={"someone@example.com"}
                                    valueName={this.state.emailAddress}
                                    onChangeData={this.onChangeData}
                                />
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Şirketin Bulunduğu Ülke *</label>
                                    <select className="form-control" value={this.state.countryId} onChange={e => this.onChangeData("countryId", e.target.value)}>
                                        {countries.map((country, index) =>
                                            <option key={index} value={country.countryId}>{country.name}</option>
                                        )
                                        }
                                    </select>
                                </div>
                            </div>
                            </div>
                        {
                            this.state.pendingApiCall ? <Spinner /> :
                                <button
                                    className="btn float-right"
                                    id="edit-button"
                                    type="button"
                                    //disabled={!btnEnable}
                                    onClick={this.updateCompany}><FontAwesomeIcon icon="edit"></FontAwesomeIcon>Güncelle</button>
                        }

                    </form>
                            </div>
                    <br />
                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>


                    }
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

export default connect(mapStateToProps)(CompanyUpdatePage);
