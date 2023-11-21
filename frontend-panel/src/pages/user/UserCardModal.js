import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UserCard from './UserCard';

const UserCardModal = (props) => {

    const { title, user, roles } = props;
    return (
        <div className="modal fade" id="openUserModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered  modal-lm" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="mb-0" className="modal-title" id="exampleModalLongTitle">{title} </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">

                            <div className="col-lg-12">
                                {
                                    user &&
                                    <UserCard user={user} roles={roles} />
                                }
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" id="close-button" data-dismiss="modal">
                            <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCardModal;