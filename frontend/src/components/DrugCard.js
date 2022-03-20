import React, { Component } from 'react'

const DrugCard = (props) => {

    return (
        <div className="row">
            <div className="col-lg-12  mt-3">
                <div className="card">
                    <div className="card-header">
                        <h5>İlaç Bilgileri</h5>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title"><b>{props.drugName}</b></h5>
                    </div>
                    <ul className="list-group list-group-flush">
                         <li className="list-group-item">Barkodu : {props.drugCode} </li>
                        <li className="list-group-item">Atc Kodu : {props.atcCode} </li>
                        <li className="list-group-item">Atc Adı : {props.atcName} </li>
                        <li className="list-group-item">Üretici Firma : {props.company} </li>
                        
                        <li className="list-group-item"></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DrugCard;
