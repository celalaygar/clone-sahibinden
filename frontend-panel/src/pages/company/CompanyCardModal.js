


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CompanyCard from '../../components/CompanyCard';

const CompanyCardModal = (props) => {
    const {title,  singleCompany} = props;

    return (
        <div className="modal fade" id="openCompanyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{title} </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <CompanyCard {...singleCompany} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" id="close-button" data-dismiss="modal"><FontAwesomeIcon icon="window-close" > </FontAwesomeIcon> Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCardModal;