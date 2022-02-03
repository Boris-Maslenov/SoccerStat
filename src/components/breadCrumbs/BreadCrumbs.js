import React from "react"
import { Link } from "react-router-dom"

const BreadCrumbs = ({list}) => {


const items = list.map((elem, i) => <span key={i} className="breadcrumbs__item"><Link  to={elem.patch}>{elem.title}</Link> <span>{'>'}</span></span>)

return(

    <div className="breadcrumbs">

        {items}

    </div>

)


}

export default BreadCrumbs;