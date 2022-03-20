import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import UserCard from './UserCard';

const UserCardModal = (props) => {
    
    const{title, user,roles} = props;
    return (
        <div class="modal fade" id="openUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered  modal-lm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 className="mb-0" class="modal-title" id="exampleModalLongTitle">{title} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="row">

                        <div className="col-lg-12">
                            <UserCard user={user} roles={roles} />
                        </div>
                    
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" id="close-button" data-dismiss="modal">
                        <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCardModal;