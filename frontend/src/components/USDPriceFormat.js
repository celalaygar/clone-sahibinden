import React from 'react';

const USDPriceFormat = (props) => {
    const { price, currencyType } = props;
    return (
        <div>
            {currencyType === "USD" && "$ "}
            {currencyType === "EURO" && "€ "}
            {currencyType === "STERLIN" && "£ "}
            {currencyType === "TL" && "₺ "}
            {price && price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
    );
};

export default USDPriceFormat;