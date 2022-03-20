import React from 'react';

const TurkishPriceFormat = (props) => {
    const {price} = props;
    return (
        <div>
            {price && "₺" + parseFloat(price).toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </div>
    );
};

export default TurkishPriceFormat;