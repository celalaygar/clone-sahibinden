

import React from 'react';
import ReactDatePicker from 'react-datepicker';

const RangeTurkishDatePicker  = (props) => {


    const {onChangeData,error, stateName,selected, placeholderText, startDate } = props;

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']

    const locale = {
        localize: {
            month: n => months[n],
            day: n => days[n]
        },
        formatLong: {}
    }
    return (
        <>
        <ReactDatePicker
            locale={locale} 
            error={error}
            selected={selected}
            dateFormat={"yyyy/MM/dd"}
            className="form-control"
            onChange={e => onChangeData(stateName, e)}
            minDate={startDate}
            placeholderText={placeholderText}
            />

        </>
    );
};

export default RangeTurkishDatePicker;