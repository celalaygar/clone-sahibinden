import React from 'react';

const NotFoundData = (props) => {

    const{message} = props;
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <center>{message}</center>
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
    );
};

export default NotFoundData;