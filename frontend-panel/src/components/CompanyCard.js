import React, { useState } from 'react'
import MomentComponent from './MomentComponent';

const CompanyCard = (props) => {
    const [company, setcompany] = useState(props);

    return (
        <div className="col-sm-12 mt-3">
            <table className="table table-bordered table-sm">
                <tbody>
                    <tr>
                        <td><b>Şirket Adı :</b></td><td>{props.companyName}</td>
                    </tr>
                    <tr>
                        <td><b>Açık Adres :</b></td><td>{props.address}</td>
                    </tr>
                    <tr>
                        <td><b>Şirket Telefonu :</b></td><td>{props.companyPhone}</td>
                    </tr>
                    <tr>
                        <td><b>Şirket Fax :</b></td><td>{props.companyFax}</td>
                    </tr>
                    <tr>
                        <td><b>Email :</b></td><td>{props.emailAddress}</td>
                    </tr>
                    <tr>
                        <td><b>Cep Telefonu :</b></td><td>{props.companyMobilePhone}</td>
                    </tr>
                    <tr>
                        <td><b>Ülke :</b></td><td>{props.country && props.country.name}</td>
                    </tr>
                    <tr>
                        <td><b>Şehir :</b></td><td>{props.city}</td>
                    </tr>
                    <tr>
                        <td><b>Kayıt Tarihi :</b></td><td><MomentComponent date={props.createdDate} /></td>
                    </tr>
                    <tr>
                        <td><b>Plasiyer :</b></td><td>{props.user && props.user.fullname}</td>
                    </tr>
                    <tr>
                        <td><b>Vergi No :</b></td><td>{props.taxNo}</td>
                    </tr>
                </tbody>
            </table>

        </div>

    )
}

export default CompanyCard;