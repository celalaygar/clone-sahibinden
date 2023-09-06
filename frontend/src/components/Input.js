import React from 'react'


// css ınput                border border-info shadow-sm p-2 bg-body rounded
const Input = (props) => {
    const { label, error, name, valueName, onChangeData, type, placeholder, defaultValue, disabled } = props;
    let className = "form-control";
    if (type === "file") {
        className += "-file";
    }
    if (error !== undefined) {
        className += " is-invalid";
    }
    return (
        <div style={{ textAlign: "left", margin: "10px" }} className="form-group">
            <label htmlFor="exampleInputEmail1">{label}</label>
            <input
                type={type}
                className={className && className + " mt-2 "}
                name={name}
                disabled={disabled && disabled}
                onChange={event => onChangeData(name, type === "file" ? event : event.target.value)}
                value={valueName ? valueName : ""}
                defaultValue={defaultValue}
                placeholder={placeholder} />
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}
export default Input;