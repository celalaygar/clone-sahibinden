

import React, { useState } from 'react'
import Moment from 'react-moment';


const OrderChangingCustOrderDetailModal = (props) => {

    const { orderDetail } = props;


    return (
        <div className="modal fade bd-example-modal-lg" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Yurt dışı Sipariş Detayı </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        {orderDetail &&
                            <table className="table table-bordered table-sm">
                                <thead>
                                    <tr>
                                        <td>Yurt dışı Sipariş No:</td>
                                        <td> {orderDetail.customerOrderNo}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Yurt dışı Sipariş Tarihi: </td>
                                        <td><Moment format="DD/MM/YYYY">{orderDetail.orderDate ? orderDetail.orderDate : null}</Moment></td>
                                    </tr>
                                    <tr>
                                        <td>Yurt dışı Sipariş Durumu:</td>
                                        <td> {orderDetail.orderStatus.explanation}</td>
                                    </tr>
                                    <tr>
                                        <td> Müşteri Adı Soyadı:</td>
                                        <td> {orderDetail.customer.name} {orderDetail.customer.surname}</td>
                                    </tr>
                                    <tr>
                                        <td>Müşteri Ülkesi: </td>
                                        <td>{orderDetail.customer.country.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Siparişi Oluşturan ve Yetkisi:</td>
                                        <td>{orderDetail.user.name} {orderDetail.user.surname} - {orderDetail.user.role}</td>
                                    </tr>
                                </tbody>
                            </table>

                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderChangingCustOrderDetailModal;