import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Preloader from '../../components/preloader/Preloader';
import Spinner from '../../components/Spinner';
import CompanyService from '../../services/CompanyService';
import CountryService from '../../services/CountryService';
import CompanyInsertPage from './CompanyInsertPage';
import CompanyListPage from './CompanyListPage';
import PaginationComponent from '../../components/PaginationComponent';
import { ROLE_ADMIN } from '../../constant/roleConstant';


class CompanySearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: undefined,
            createdDate: undefined,
            countryId: undefined,
            city: undefined,
            countries: [],
            users: [],
            role: [],
            userId: undefined,
            //companies: [],
            page: {
                content: [],
                number: 0,
                size: 10,
            },
            isOpenCompanyListPanel: false,
            isOpenCompanyInsertPanel: false,
            pendingApiCall: false,
        };

    }
    componentDidMount() {
        this.loadCountry();
        this.loadCompanies();

    }
    refreshPage = () => {
        this.loadCountry();
        this.loadCompanies();
    }
    onClickPagination = (event, value) => {
        event.preventDefault();
        if (value === "next") {
            const nextPage = this.state.page.number + 1;
            this.searchCompanies(nextPage, this.state.page.size);
        }
        else if (value === "back") {
            const nextPage = this.state.page.number - 1;
            this.searchCompanies(nextPage, this.state.page.size);
        }
        else if (value === "last") {
            const nextPage = this.state.page.totalPages - 1;
            this.searchCompanies(nextPage, this.state.page.size);
        }
        else if (value === "first") {
            const nextPage = 0;
            this.searchCompanies(nextPage, this.state.page.size);
        }
    }
    loadCompanies = () => {
        this.setState({ isOpenCompanyListPanel: true, isOpenCompanyInsertPanel: false });
        const nextPage = 0;
        this.searchCompanies(nextPage, this.state.page.size);
    }
    openCompanyListPanel = (event) => {

        this.setState({ isOpenCompanyListPanel: true, isOpenCompanyInsertPanel: false });
        //const nextPage = this.state.page.number;
        const nextPage = 0;
        this.searchCompanies(nextPage, this.state.page.size);

    }
    openCompanyInsertPanel = () => {
        this.setState({ isOpenCompanyInsertPanel: true, isOpenCompanyListPanel: false })
    }
    closePanels = () => {
        this.setState({ isOpenCompanyInsertPanel: false, isOpenCompanyListPanel: false })
    }
    clearState = () => {
        this.setState({
            companyName: undefined,
            createdDate: undefined,
            countryId: "Seçiniz",
            city: undefined,
            userId: "Seçiniz"
        })
        window.location.reload();
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
        if (this.state.error)
            this.setState({ error: null })
        const stateData = this.state;
        if (event === "" || event === "Seçiniz") {

            stateData[type] = undefined
        }
        else {
            if (type === "size") {

                stateData["page"][type] = event

                this.setState({ isOpenCompanyListPanel: true, isOpenCompanyInsertPanel: false });
                const nextPage = 0;
                this.searchCompanies(nextPage, stateData["page"][type]);
                console.log(stateData["page"][type])
            }
            else
                stateData[type] = event

        }

        //İNPUT'A GÖRE OTOMATİK ARAMA BAŞLANGIÇ
        if ((type === "companyName") || (type === "countryId") || (type === "userId") || (type === "city")) {
            const nextPage = 0;
            this.searchCompanies(nextPage, this.state.page.size);
        }
        //İNPUT'A GÖRE OTOMATİK ARAMA SON

        this.setState({ stateData });
    }
    searchCompanies = async (number, size) => {
        this.setState({ pendingApiCall: true })
        try {
            let body = {
                companyName: this.state.companyName,
                //createdDate: this.state.createdDate,
                countryId: this.state.countryId === "Seçiniz" ? undefined : this.state.countryId,
                city: this.state.city,
                userId: this.state.userId === "Seçiniz" ? undefined : this.state.userId,
            }
            //console.log(body)
            const response = await CompanyService.searchCompany(number, size, body);
            this.setState({ page: response.data });
            //console.log(response.data)

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

    searchCompaniesWithKeyPress = async (event) => {
        this.setState({ pendingApiCall: true })
        try {
            let body = {
                companyName: this.state.companyName,
                //createdDate: this.state.createdDate,
                countryId: this.state.countryId === "Seçiniz" ? undefined : this.state.countryId,
                city: this.state.city,
                userId: this.state.userId === "Seçiniz" ? undefined : this.state.userId
            }
            if (event.charCode === 13) {
                const response = await CompanyService.searchCompany(this.state.page.number, this.state.page.size, body);
                this.setState({ page: response.data });
                //console.log(response.data)
            }
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
    render() {
        const { countries, users } = this.state;
        const { content: companies, first, last, number, totalPages } = this.state.page;
        return (
            <div className="row ">
                <div className="col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <div className=" justify-content-center">
                                <h5 className="mb-0" >Şirket Sorgula</h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onKeyPress={e => this.searchCompaniesWithKeyPress(e)}  >
                                <div className="row">
                                    <div className="col-lg-3">
                                        <Input
                                            label={"Şirket Adı"}
                                            type="text"
                                            name="companyName"
                                            placeholder={"Şirket Adı"}
                                            valueName={this.state.companyName}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Ülke </label>
                                            <select className="form-control" value={this.state.countryId} onChange={e => this.onChangeData("countryId", e.target.value)}>
                                                <option value={"Seçiniz"}>Seçiniz</option>
                                                {countries.length > 0 && countries.map((country, index) =>
                                                    <option key={index} value={country.countryId}>{country.name}</option>
                                                )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-3">
                                        <Input
                                            label={"Şehir"}
                                            type="text"
                                            name="city"
                                            placeholder={"Şehir"}
                                            valueName={this.state.city}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>


                                    {
                                        this.props.role === ROLE_ADMIN &&

                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Plasiyer</label>
                                                <select className="form-control" value={this.state.userId} onChange={e => this.onChangeData("userId", e.target.value)}>
                                                    <option value={"Seçiniz"}>Seçiniz</option>
                                                    {users.length > 0 && users.map((user, index) =>
                                                        <option key={index} value={user.userId}>{user.name} {user.surname}</option>
                                                    )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        {
                                            this.state.pendingApiCall === true ? <Spinner /> :
                                                <>
                                                    <button
                                                        type="button"
                                                        id="clear-button"
                                                        className="btn btn-sm"
                                                        onClick={e => this.clearState(e)}  >
                                                        <FontAwesomeIcon icon="backspace" > </FontAwesomeIcon> Temizle
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm ml-2"
                                                        id="add-button"
                                                        onClick={e => this.openCompanyInsertPanel(e)}  >
                                                        <FontAwesomeIcon icon="plus" > </FontAwesomeIcon> Şirket Ekle
                                                    </button>
                                                </>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                        {this.state.pendingApiCall ?
                            <Preloader width={50} height={50} />
                            :
                            <div className="row">
                                {this.state.isOpenCompanyListPanel === true &&
                                    <>
                                        <div className="col">
                                        </div>

                                        <div className="col-lg-12">
                                            <CompanyListPage
                                                companies={companies}
                                                onChangeData={this.onChangeData}
                                                refreshPage={this.refreshPage}
                                                page={this.state.page} />
                                        </div>

                                    </>
                                }
                                {this.state.isOpenCompanyInsertPanel === true &&
                                    <>
                                        <div className="col-lg-12">
                                            <div className="card ">
                                                <CompanyInsertPage />
                                            </div>
                                        </div>
                                    </>
                                }


                            </div>
                        }

                        {companies.length > 0 &&

                            <div className="col-sm-12 ml-2 ">
                                <PaginationComponent
                                    first={first}
                                    last={last}
                                    number={number}
                                    onClickPagination={this.onClickPagination}
                                    totalPages={totalPages}
                                />
                            </div>
                        }
                    </div>



                </div>


            </div>
        );
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

export default connect(mapStateToProps)(CompanySearchPage);