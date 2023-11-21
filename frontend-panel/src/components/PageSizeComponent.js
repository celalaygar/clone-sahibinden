import React from 'react';

const PageSizeComponent = (props) => {
    const { onChangeData, page } = props;
    return (
        <>
            <div className="form-group float-left  ">
                <select 
                style= {{width:"60px", height:"25px", fontFamily: "Lucida Console",fontSize:"12px"}}
                id= "page-size-component " 
                className="form-control p-1 form-control-lg" 
                value={page && page.size}
                onChange={e => onChangeData("size", e.target.value)}>

                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"10"}>10</option>
                    <option value={"20"}>20</option>
                    <option value={"25"}>25</option>
                    <option value={"50"}>50</option>
                    <option value={"100"}>100</option>
                </select>
            </div>
        </>
    );
};

export default PageSizeComponent;