import React from 'react';
import Moment from 'react-moment';

const DrugExprationComponent = (props) => {
    const {date} = props;
    if(!date)
        return null ;
    return (
        <>
            <Moment format="MM/YYYY">{date}</Moment> 
        </>
    );
};

export default DrugExprationComponent;
