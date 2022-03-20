import React from 'react';
import Moment from 'react-moment';

const MomentComponentWithHour = (props) => {
    const {date} = props;
    if(!date)
        return null ;
    return (
        <>
            <Moment format="DD/MM/YYYY HH:mm:ss">{date}</Moment> 
        </>
    );
};

export default MomentComponentWithHour;