import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Preloader from '../../components/preloader/Preloader';
import Spinner from '../../components/Spinner';
import CompanyService from '../../services/CompanyService';
import CountryService from '../../services/CountryService';
import CompanyInsertPage from './CompanyInsertPage';
import CompanyListPage from './CompanyListPage';
import PaginationComponent from '../../components/PaginationComponent';
import { ROLE_ADMIN } from '../../constant/roleConstant';
import { selectedAuthentication } from '../../redux/redux-toolkit/authentication/AuthenticationSlice';




const CompanySearchPage = () => {


    const selectedAuth = useSelector(selectedAuthentication);
    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 10,
    });
    const [formBody, setFormBody] = useState({
        countryId: undefined,
        createdDate: undefined,
        companyName: undefined,
        city: undefined,
        userId: undefined,

    });
    const [isOpenCompanyListPanel, setIsOpenCompanyListPanel] = useState([]);
    const [isOpenCompanyInsertPanel, setIsOpenCompanyInsertPanel] = useState([]);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const refreshPage = () => {
        loadCountry();
        loadCompanies();
    }
    const onClickPagination = (event, value) => {
        event.preventDefault();
        if (value === "next") {
            const nextPage = page.number + 1;
            searchCompanies(nextPage, page.size);
        }
        else if (value === "back") {
            const nextPage = page.number - 1;
            searchCompanies(nextPage, page.size);
        }
        else if (value === "last") {
            const nextPage = page.totalPages - 1;
            searchCompanies(nextPage, page.size);
        }
        else if (value === "first") {
            const nextPage = 0;
            searchCompanies(nextPage, page.size);
        }
    }
    const loadCompanies = () => {
        setIsOpenCompanyListPanel(true);
        setIsOpenCompanyInsertPanel(false);
        const nextPage = 0;
        searchCompanies(nextPage, page.size);
    }
    const openCompanyListPanel = (event) => {
        setIsOpenCompanyListPanel(true);
        setIsOpenCompanyInsertPanel(false);
        const nextPage = 0;
        searchCompanies(nextPage, page.size);
    }
    const openCompanyInsertPanel = () => {
        setIsOpenCompanyListPanel(false);
        setIsOpenCompanyInsertPanel(true);
    }
    const closePanels = () => {
        setIsOpenCompanyListPanel(true);
        setIsOpenCompanyInsertPanel(false);
    }
    const clearState = () => {
        setFormBody({
            companyName: undefined,
            createdDate: undefined,
            countryId: "Seçiniz",
            city: undefined,
            userId: "Seçiniz"
        })
        setIsOpenCompanyListPanel(true);
        setIsOpenCompanyInsertPanel(false);
        refreshPage()
    }
    const loadCountry = async () => {

        setIsLoading(true);
        try {
            const response = await CountryService.getAll();
            setCountries(response.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }

        setIsLoading(false);
    }
    const onChangeData = (type, event) => {
        if (error)
            setError(null)
        const searchBody = formBody;
        if (event === "" || event === "Seçiniz") {

            searchBody[type] = undefined
        }
        else {
            if (type === "size") {
                page[type] = event;
                setIsOpenCompanyListPanel(true);
                setIsOpenCompanyInsertPanel(false);
                const nextPage = 0;
                this.searchCompanies(nextPage, page[type]);
            }
            else
                searchBody[type] = event
        }
        setFormBody({ ...searchBody });
    }
    const searchCompanies = async (number, size) => {
        setIsLoading(true);
        try {
            let body = {
                companyName: formBody.companyName,
                countryId: formBody.countryId === "Seçiniz" ? undefined : formBody.countryId,
                city: formBody.city,
                userId: formBody.userId === "Seçiniz" ? undefined : formBody.userId,
            }
            const response = await CompanyService.searchCompany(number, size, body);
            setPage(response.data);

        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);
    }

    const searchCompaniesWithKeyPress = async (event) => {
        setIsLoading(true);
        try {
            let body = {
                companyName: this.state.companyName,
                countryId: this.state.countryId === "Seçiniz" ? undefined : this.state.countryId,
                city: this.state.city,
                userId: this.state.userId === "Seçiniz" ? undefined : this.state.userId
            }
            if (event.charCode === 13) {
                const response = await CompanyService.searchCompany(this.state.page.number, this.state.page.size, body);
                this.setState({ page: response.data });
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

        setIsLoading(false);
    }

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
                        <form onKeyPress={e => searchCompaniesWithKeyPress(e)}  >
                            <div className="row">
                                <div className="col-lg-3">
                                    <Input
                                        label={"Şirket Adı"}
                                        type="text"
                                        name="companyName"
                                        placeholder={"Şirket Adı"}
                                        valueName={formBody.companyName}
                                        onChangeData={onChangeData}
                                    />
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Ülke </label>
                                        <select className="form-control"
                                            value={formBody.countryId}
                                            onChange={e => onChangeData("countryId", e.target.value)}>
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
                                        valueName={formBody.city}
                                        onChangeData={onChangeData}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    {isLoading === true ? <Spinner /> :
                                        <>
                                            <button
                                                type="button"
                                                id="clear-button"
                                                className="btn btn-sm"
                                                onClick={e => clearState(e)}  >
                                                <FontAwesomeIcon icon="backspace" > </FontAwesomeIcon> Sorgula
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm ml-2"
                                                id="add-button"
                                                onClick={e => openCompanyInsertPanel(e)}  >
                                                <FontAwesomeIcon icon="plus" > </FontAwesomeIcon> Şirket Ekle
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    {isLoading ? <Preloader width={50} height={50} /> :
                        <div className="row">
                            {isOpenCompanyListPanel === true &&
                                <>
                                    <div className="col">
                                    </div>

                                    <div className="col-lg-12">
                                        <CompanyListPage
                                            companies={page.content}
                                            onChangeData={onChangeData}
                                            refreshPage={refreshPage}
                                            page={page} />
                                    </div>

                                </>
                            }
                            {isOpenCompanyInsertPanel === true &&
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
                    {page.content.length > 0 &&
                        <div className="col-sm-12 ml-2 ">
                            <PaginationComponent
                                first={page.first}
                                last={page.last}
                                number={page.number}
                                onClickPagination={onClickPagination}
                                totalPages={page.totalPages}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CompanySearchPage;