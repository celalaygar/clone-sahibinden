


import React from 'react';
import Moment from 'react-moment';

const MomentComponent = (props) => {
    const {date} = props;
    if(!date)
        return null ;
    return (
        <>
            <Moment format="DD/MM/YYYY">{date}</Moment> 
        </>
    );
};

export default MomentComponent;