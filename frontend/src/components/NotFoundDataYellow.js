import React from 'react';

const NotFoundDataYellow = (props) => {

    const{message} = props;
    return (
        <div className="alert alert-warning alert-dismissible fade show font-italic" role="alert">
            <center>{message}</center>
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
    );
};

export default NotFoundDataYellow;