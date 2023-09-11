import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/Input';
import PaginationComponent from '../../../components/PaginationComponent';
import Preloader from '../../../components/preloader/Preloader';
import Spinner from '../../../components/Spinner';
import ApiService from '../../../services/base/ApiService';
import UserService from '../../../services/UserService';
import UserInsertPage from './../UserInsertPage';
import UserPersonelListPage from './UserPersonelListPage';

class UserPersonelSearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: undefined,
            name: undefined,
            surname: undefined,
            username: undefined,
            email: undefined,
            tcNo: undefined,
            role: undefined,
            //companies: [],
            page: {
                content: [],
                number: 0,
                size: 10,
            },
            errors: {
            },
            isOpenUserInsertPanel: false,
            isOpenUserListPanel: true,
            pendingApiCall: false,
        };

    }
    componentDidMount() {
        //this.loadCountry();
        this.loadRoles();
        this.setState({ isOpenUserInsertPanel: false, isOpenUserListPanel: true })
        const nextPage = 0;
        this.searcUser(nextPage, this.state.page.size);
    }

    resetPage = () => {
        const nextPage = 0;
        this.searcUser(nextPage, this.state.page.size);
    }
    onClickPagination = (event, value) => {
        event.preventDefault();
        if (value === "next") {
            const nextPage = this.state.page.number + 1;
            this.searcUser(nextPage, this.state.page.size);
        }
        else if (value === "back") {
            const nextPage = this.state.page.number - 1;
            this.searcUser(nextPage, this.state.page.size);
        }
        else if (value === "last") {
            const nextPage = this.state.page.totalPages - 1;
            this.searcUser(nextPage, this.state.page.size);
        }
        else if (value === "first") {
            const nextPage = 0;
            this.searcUser(nextPage, this.state.page.size);
        }
    }
    loadRoles = async () => {

        try {
            const roles = await ApiService.get("/roles");
            this.setState({ roles: roles.data }, () => {
                console.log(this.state.roles)
            })
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
    searcUser = async (number, size) => {
        this.setState({ pendingApiCall: true })
        try {
            let body = {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                tcNo: this.state.tcNo,
                role: this.state.role === "Seçiniz" ? undefined : this.state.role
            }
            const response = await UserService.search(number, size, body);
            this.setState({ page: response.data });
            //     const response = await CountryService.getAll();
            //    this.setState({ countries: response.data });
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

        const errors = { ...this.state.errors }
        errors[type] = undefined;
        const stateData = this.state;
        if (event === "")
            stateData[type] = ""
        else if (event === "Seçiniz") {
            if (type === "inputValue")
                stateData[type] = ""
            else
                stateData[type] = undefined
        } else if (type === "size") {

            stateData["page"][type] = event

            const nextPage = 0;
            this.searcUser(nextPage, stateData["page"][type]);
        }
        else
            stateData[type] = event

        if ((type === "name") || (type === "surname") || (type === "username") || (type === "role")) {
            const nextPage = 0;
            this.searcUser(nextPage, this.state.page.size);
        }

        console.log(type)
        this.setState({ stateData });
    }

    openUseristPanel = () => {
        this.setState({ isOpenUserInsertPanel: false, isOpenUserListPanel: true })
        const nextPage = 0;
        this.searcUser(nextPage, this.state.page.size);
    }

    openUserInsertPanel = () => {
        this.setState({ isOpenUserInsertPanel: true, isOpenUserListPanel: false })
    }

    closePanels = () => {
        this.setState({
            isOpenUserInsertPanel: false,
            isOpenUserListPanel: false,
        })
    }

    clearState = () => {
        this.setState({

            name: undefined,
            surname: undefined,
            username: undefined,
            email: undefined,
            tcNo: undefined,
            role: "Seçiniz",
            value: undefined,
            inputValue: "",
            errors: {
            },
            pendingApiCall: false,
        })
        window.location.reload();
    }
    render() {
        const { name, surname, role } = this.state.errors;
        return (
            <div className="row ">
                <div className="col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <div className=" justify-content-center">
                                <h5 className="mb-0" >Kullanıcılar</h5>
                            </div>
                        </div>
                        <div className="card-body">
                            <form   >
                                <div className="row">
                                    <div className="col-lg-3  ">
                                        <Input
                                            label={"İsim"}
                                            error={name}
                                            type="text"
                                            name="name"
                                            placeholder={"İsim"}
                                            valueName={this.state.name}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Soyisim"}
                                            error={surname}
                                            type="text"
                                            name="surname"
                                            placeholder={"Soyisim "}
                                            valueName={this.state.surname}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <Input
                                            label={"Kullanıcı Adı"}
                                            type="text"
                                            name="username"
                                            placeholder={"Kullanıcı Adı"}
                                            valueName={this.state.username}
                                            onChangeData={this.onChangeData}
                                        />
                                    </div>
                                    <div className="col-lg-3 ">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Rolü</label>
                                            <select className={role ? "form-control is-invalid" : "form-control"} value={this.state.role} onChange={e => this.onChangeData("role", e.target.value)}>
                                                <option key={1} value={"Seçiniz"}>{"Seçiniz"}</option>
                                                {this.state.roles && this.state.roles.map((role, index) =>
                                                    <option key={index} value={role.role}>{role.value}</option>
                                                )
                                                }
                                            </select>
                                            <div className="invalid-feedback">{role}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        {
                                            this.state.pendingApiCall === true ? <Spinner /> :
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm "
                                                        id="clear-button"
                                                        onClick={e => this.clearState(e)}
                                                    >
                                                        <FontAwesomeIcon icon="backspace" > </FontAwesomeIcon> Temizle
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm ml-2"
                                                        id="add-button"
                                                        onClick={e => this.openUserInsertPanel(e)}
                                                    >
                                                        <FontAwesomeIcon icon="plus" > </FontAwesomeIcon> Kullanıcı Ekle
                                                    </button>
                                                    {
                                                        this.state.isOpenCompanyListPanel === true || this.state.isOpenCompanyInsertPanel === true
                                                            ?
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm ml-2 float-right"
                                                                id="close-button"
                                                                onClick={e => this.closePanels(e)}  >
                                                                <FontAwesomeIcon icon="window-close" > </FontAwesomeIcon> Kapat
                                                            </button>
                                                            :
                                                            null
                                                    }
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
                                {this.state.isOpenUserListPanel === true && this.state.page && this.state.page.content.length > 0 &&
                                    <div className="col-lg-12">
                                        <UserPersonelListPage
                                            resetPage={this.resetPage}
                                            page={this.state.page}
                                            roles={this.state.roles}
                                            onChangeData={this.onChangeData} />

                                        {this.state.page && this.state.page.content.length > 0 ?
                                            <div className="col-sm-12 ml-2 ">
                                                <PaginationComponent
                                                    first={this.state.page.first}
                                                    last={this.state.page.last}
                                                    number={this.state.page.number}
                                                    onClickPagination={this.onClickPagination}
                                                    totalPages={this.state.page.totalPages}
                                                />
                                            </div>
                                            : null}
                                    </div>
                                }
                                {this.state.isOpenUserInsertPanel === true &&
                                    <>
                                        <div className="col-lg-12">
                                            <UserInsertPage />
                                        </div>
                                    </>
                                }
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

export default connect(mapStateToProps)(UserPersonelSearchPage);