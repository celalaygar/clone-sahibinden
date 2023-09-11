

import React, { Component, useState } from 'react'
import CompanyCard from '../../components/CompanyCard';
import AlertifyService from '../../services/AlertifyService';
import CompanyService from '../../services/CompanyService';
import { useParams } from 'react-router-dom';


const CompanyDetailPage = () => {

    const { companyId } = useParams();
    const [companyDetail, setCompanyDetail] = useState({
        companyName: '',
        taxNo: '',
        address: '',
        companyPhone: '',
        companyFax: '',
        countryId: 0,
        city: '',
    });

    const [roles, setRoles] = useState();
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        loadCompany(companyId);
    }, []);
    const loadCompany = async (companyId) => {
        setPendingApiCall(true);
        try {
            const response = await CompanyService.get("/find-by-id/" + companyId);
            //console.log(response.data)
            setCompanyDetail({ ...response.data })

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                    console.log(error.response.data.status);
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
        }
        setPendingApiCall(false);
    }
    return (
        <div className="row">
            <div className="col-lg-6">
                <CompanyCard {...companyDetail} />
            </div>
        </div>
    );
};



export default CompanyDetailPage;