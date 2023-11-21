


import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Moment from 'react-moment';

const TurkishReactMonthDatePicker = (props) => {

    const {onChangeData, stateName,selected} = props;

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']

    const locale = {
        localize: {
            month: n => months[n],
            day: n => days[n]
        },
        formatLong: {}
    }
    const ExampleCustomInput = ({ value, onClick }) => (
        <button  type="button" className="btn border border-info" onClick={onClick} style={{width:"200px", height:"40px"}} >
          {selected && <Moment format="MM / YYYY">{selected}</Moment>}
        </button>
      );
    return (
        <>
        <ReactDatePicker
            className="form-control"
            locale={locale} 
            // selected={startDate}
            selected={selected}
            onChange={e => onChangeData(stateName, e)}
            dateFormat="MM/yyyy"
            //placeholderText="Tarih Seçiniz"
            showMonthYearPicker
            showFullMonthYearPicker
            customInput={<ExampleCustomInput />}
        />
    </>
    );
};

export default TurkishReactMonthDatePicker;
