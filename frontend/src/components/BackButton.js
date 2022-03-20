import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = (props) => {
    const{url} = props;

    if(typeof url === 'string' || url instanceof String)
    return (
        <span>
            <Link to={url}><FontAwesomeIcon icon="arrow-circle-left"></FontAwesomeIcon></Link>
        </span>
    );

    return null;
}

export default BackButton;