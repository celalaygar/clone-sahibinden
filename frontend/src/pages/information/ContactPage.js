import React, { Component } from 'react'
import { connect } from 'react-redux';
import './InfoPageCss.css';

class ContactPage extends Component {
    render() {
        return (
            <div className="row ">
                <div className="col-sm-12 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <div className=" justify-content-center">
                                <h5 className="mb-0" >İletişim</h5>
                            </div>
                        </div>
                </div>
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
        role: store.role,
        userId: store.userId
    };
};
export default connect(mapStateToProps)(ContactPage);
