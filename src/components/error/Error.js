import React from "react";
import error from '../../assets/img/error_2.png';

const Error = ({text}) => {

return(

<div className="error">
    <img className="error__img" src={error} alt="error" />
    <p className="error__text">{text}</p>
</div>


)






}

export default Error;