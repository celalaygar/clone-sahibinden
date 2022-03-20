import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react'
import DrugService from '../services/DrugService';


//const options = ['Option 1', 'Option 2', '%20'];

export default class DrugCombobox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            inputValue: "",
            drugName: undefined,
            drugCards: [],

        };
    }

    loadDrugCard = async (drugName) => {
 

        if (drugName.length > 2 && ( this.props.drugCardId === undefined || this.props.drugCardId === null)) {
            try { 
                const response = await DrugService.findBySearching(drugName);
                this.setState({ drugCards: response.data });
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                }
                else if (error.request)
                    console.log(error.request);
                else
                    console.log(error.message);
            }
        } else {
            this.setState({ drugCards: [] });
            this.props.onChangeData("drugCardId",  null)
        } 
    }
    render() { 
        const { value, inputValue } = this.props;
        return (
            <div>
                {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                <div>{`inputValue: '${inputValue}'`}</div>
                <br /> */}
                <Autocomplete
                    placeholder="İlaçlar"
                    id="combo-box-demo"
                    size="small"
                    value={value} 
                    onChange={(event, value) => {
                        this.props.onChangeData("drugCardId", value ? value.drugCardId : null) 
                        this.props.onChangeData("value", (value !== undefined && value !== null ) ? value.drugName : "") 
                        this.props.onChangeData("singleDrugCard", value ? value : null) 
                        //this.setState({ value: (value != null &&  value.drugName != null) ? value.drugName : "" });
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        this.props.onChangeData("inputValue", newInputValue ) ;
                        this.props.onChangeData("value", newInputValue === null &&  "" ) ;
                        //this.setState({ inputValue: newInputValue,value: newInputValue === null &&  "" }); 
                        this.loadDrugCard(newInputValue); 
                    }}
                    id="controllable-states-demo"
                    options={this.state.drugCards}
                    getOptionLabel={(option) => option.drugName}
                    noOptionsText={'İlaç Bulunamadı'}
                    renderInput={(params) => <TextField  {...params} label="İlaçlar" variant="outlined" />}
                />
            </div>
        )
    }
}