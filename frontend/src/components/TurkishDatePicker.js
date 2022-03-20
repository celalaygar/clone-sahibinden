
import React from 'react';
import ReactDatePicker from 'react-datepicker';

const TurkishDatePicker = (props) => {


    const {onChangeData,error, stateName,selected, placeholderText} = props;

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
            dateFormat={"yyyy/MM/dd"}
            className="form-control"
            error={error}
            selected={selected}
            onChange={e => onChangeData(stateName, e)}
            placeholderText={placeholderText}
        />
        </>
    );
};

export default TurkishDatePicker;