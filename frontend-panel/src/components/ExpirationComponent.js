import React from 'react';
import Moment from 'react-moment';

const ExpirationComponent = (props) => {
    const {date} = props;
    if(!date)
        return null ;
    return (
        <>
            <Moment format="MM/YYYY">{date}</Moment> 
        </>
    );
};

export default ExpirationComponent;