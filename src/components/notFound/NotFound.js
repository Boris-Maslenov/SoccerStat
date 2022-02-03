import React from "react";
import error from '../../assets/img/error.png';

const NotFound = ({text}) => {


return (

<div className="error">
        <img className="error__img" src={error} alt="error" />
        <p className="error__text">{text}</p>
</div>

)

}

export default NotFound;
