

import React, { Component } from 'react'
import { connect } from 'react-redux';
import CompanyCard from '../../components/CompanyCard';
import AlertifyService from '../../services/AlertifyService';
import CompanyService from '../../services/CompanyService';

class CompanyDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId:this.props.match.params.companyId,
            companyName: '',
            taxNo: '',
            address: '',
            companyPhone: '',
            companyFax: '',
            countryId: 0,
            city: '',
            country: {},
            errors: {
            },
            pendingApiCall: false,
            countries: []
        };
    }
    componentDidMount(){
        const companyId = this.props.match.params.companyId;
        //console.log(companyId)
        this.loadCompany(this.props.match.params.companyId);
    }
    loadCompany = async (companyId) =>{
        //localhost:8500/api/admin/company/find-by-id/3
        try {
            const response = await CompanyService.get("/find-by-id/"+companyId);
            //console.log(response.data)
            this.setState({...response.data})

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if(error.response.data.status === 500){
                    console.log(error.response.data.status);
                    AlertifyService.alert("Lütfen Tekrar giriş yapınız...");
                }
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


    render() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <CompanyCard {...this.state} />
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

export default connect(mapStateToProps)(CompanyDetailPage);