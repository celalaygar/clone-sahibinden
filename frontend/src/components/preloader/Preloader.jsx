
import React from 'react'
import preloader from "./preloader.gif"

import "./preloader.css"
const Preloader = (props) => {

    const { width, height } = props;
    let source = preloader;
    return (
        <div className="d-flex justify-content-center">
            <img
                width={width}
                height={height}
                src={source}
                alt={"menu-icon"} />
        </div>
    )
}

export default Preloader;