import React from 'react'
import defaultPicture from "../assets/menuIcon.png" 

const MenuIconComponent = (props) => {

    const {width, height } = props;
    let source = defaultPicture ;
    return (
            <img 
                // className="shadow" 
                width={width} 
                height={height}
                src={ source }  
                //onError={event => event.target.src = defaultPicture } 
                alt={"menu-icon"} />
    )
}

export default MenuIconComponent