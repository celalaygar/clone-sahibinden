import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react'
import CompanyService from '../services/CompanyService';

export default class CompanyCombobox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyValue: undefined,
            companyInputValue: "",
            companyName: undefined,
            companies: [],

        };
    }

    loadCompanies = async (companyName) => {

        if (companyName.length > 1 && (this.props.companyId === undefined || this.props.companyId === null)) {
            try {
                const response = await CompanyService.findBySearching(companyName);
                this.setState({ companies: response.data });
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
            this.setState({ companies: [] });
            this.props.onChangeData("companyId", null)
        }
    }

    render() {
        const { companyValue, companyInputValue } = this.props;
        return (
            <div>
                <Autocomplete
                    placeholder="Şirketler"
                    id="combo-box-demo"
                    size="small"
                    value={companyValue}
                    onChange={(event, value) => {
                        this.props.onChangeData("companyId", value ? value.companyId : null)
                        this.props.onChangeData("companyValue", (value !== undefined || value !== null) ? value.companyName : "")
                    }}
                    inputValue={companyInputValue}
                    onInputChange={(event, newInputValue) => {
                        this.props.onChangeData("companyInputValue", newInputValue);
                        this.props.onChangeData("companyValue", newInputValue === null && "");
                        this.loadCompanies(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={this.state.companies}
                    getOptionLabel={(option) => option.companyName}
                    noOptionsText={'Şirket Bulunamadı'}
                    renderInput={(params) => <TextField  {...params} label="Şirketler" variant="outlined" />}
                />

            </div>
        )
    }
}
