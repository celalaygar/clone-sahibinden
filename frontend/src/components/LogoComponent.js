import React from 'react'
import { Link } from 'react-router-dom';

const LogoComponent = (props) => {

    const { width, height } = props;
    let source = null;
    return (
        <Link to="/index">
        <img
            className="center"
            width={width}
            height={height}
            src={source}
            alt={"logo-icon"} />
        </Link>
            
    )
}

export default LogoComponent