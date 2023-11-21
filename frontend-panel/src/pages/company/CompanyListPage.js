import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PageSizeComponent from '../../components/PageSizeComponent';
import Preloader from '../../components/preloader/Preloader';
import Spinner from '../../components/Spinner';
import CompanyCardModal from './CompanyCardModal';
import CompanyUpdatePage from './CompanyUpdatePage';
import { Dialog } from '@mui/material';

class CompanyListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            singleCompany: {},
            isOpenCompanyUpdatePanel: false,
            page: {
                content: [],
                number: 0,
                size: 20,
            },
            pendingApiCall: false,
        };
    }
    componentDidMount() {


    }

    loadSingCompany = (e, company) => {
        this.setState({ singleCompany: company })
    }
    openCompanyUpdatePanel = (e, singleCompany) => {
        this.setState({ isOpenCompanyUpdatePanel: true, singleCompany: singleCompany })
    }
    closeCompanyUpdatePanel = () => {
        this.setState({ isOpenCompanyUpdatePanel: false, singleCompany: undefined })
        this.props.refreshPage()
    }
    render() {
        //const { content, first, last, number, totalPages } = this.state.page;
        const { companies } = this.props;
        return (
            <div className="row ">
                <div className="col-sm-12 mt-0">
                    <div className="card">
                        <div className="card-header">
                            <div className=" justify-content-center ">
                                <h5 className="mb-0">Şirketler</h5>
                            </div>
                        </div>
                        {this.state.pendingApiCall ?
                            <Preloader width={50} height={50} />
                            :
                            <div className="card-body ">
                                {
                                    !(companies.length > 0) ?
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <p className="text-center font-italic"> Kayıt Bulunamadı.</p>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        :
                                        <table className="table table-hover table-sm table-striped">
                                            <thead>
                                                <tr className="d-flex">
                                                    <th scope="col" className="col-sm-2">İşlemler</th>
                                                    <th scope="col" className="col-sm-2">Şirket Adı</th>
                                                    <th scope="col" className="col-sm-1">Ülke</th>
                                                    <th scope="col" className="col-sm-1">Şehir</th>
                                                    <th scope="col" className="col-sm-2">Plasiyer</th>
                                                    <th scope="col" className="col-sm-2" >Telefon</th>
                                                    <th scope="col" className="col-sm-2">Mail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {companies && companies.length > 0 && companies.map((company, index) =>
                                                    <tr key={index} className="d-flex">
                                                        <td scope="col" className="col-2">
                                                            <button type="button" onClick={e => this.loadSingCompany(e, company)} className="btn btn-sm" id="detail-button" data-toggle="modal" data-target="#openCompanyModal">
                                                                <FontAwesomeIcon icon="id-card"></FontAwesomeIcon>
                                                            </button>
                                                            <button type="button" onClick={e => this.openCompanyUpdatePanel(e, company)} className="btn btn-sm " id="drugCard-button" >
                                                                <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                                            </button>

                                                        </td>
                                                        <td scope="col" className="col-sm-2" >{company.companyName}</td>
                                                        <td scope="col" className="col-sm-1">{company.country.name}</td>
                                                        <td scope="col" className="col-sm-1">{company.city}</td>
                                                        <td scope="col" className="col-sm-2">{company.user && company.user.fullname}</td>
                                                        {company.companyPhone ?
                                                            <td scope="col" className="col-sm-2 " >{company.companyPhone}</td> :
                                                            <td scope="col" className="col-sm-2 " >{company.companyMobilePhone}</td>
                                                        }
                                                        <td scope="col" className="col-sm-2 " >{company.emailAddress}</td>

                                                    </tr>
                                                )
                                                }
                                            </tbody>
                                        </table>
                                }
                            </div>

                        }
                        <CompanyCardModal title="Şirket Bilgileri" singleCompany={this.state.singleCompany} />
                    </div>

                    <Dialog
                        fullWidth={true}
                        maxWidth={"lg"}
                        open={this.state.isOpenCompanyUpdatePanel}
                        onClose={this.closeCompanyUpdatePanel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        {this.state.singleCompany !== undefined &&
                            <CompanyUpdatePage
                                refreshPage={this.props.refreshPage}
                                singleCompany={this.state.singleCompany}
                                closeCompanyUpdatePanel={this.closeCompanyUpdatePanel}
                            />
                        }
                        {this.state.pendingApiCall ? <Spinner /> :
                            <div className="modal-footer">
                                <button
                                    className="btn btn-sm"
                                    id="close-button"
                                    type="button"
                                    onClick={this.closeCompanyUpdatePanel}>
                                    <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                                </button>
                            </div>
                        }
                    </Dialog>

                </div>
                {companies && companies.length > 0 ?
                    <div className="col-lg-12 mt-1">
                        <PageSizeComponent
                            onChangeData={this.props.onChangeData}
                            page={this.props.page} />
                    </div>
                    : null}

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

export default connect(mapStateToProps)(CompanyListPage);