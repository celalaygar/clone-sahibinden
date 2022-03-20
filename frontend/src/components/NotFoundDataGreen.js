import React from 'react';

const NotFoundDataGreen = (props) => {

    const{message} = props;
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
    );
};

export default NotFoundDataGreen;