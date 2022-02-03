 import React from "react";

 const  SearchFilter = ({onSearchValue, value, onFiltered}) => {

return(

    <form  className="search">
        <input className="search__input" onChange={e=>onSearchValue(e)} value={value} placeholder="Search..."  type="text" name="search" />
        <button onClick={e=>onFiltered(e)} className="search__submit"  type="submit"></button>
    </form> 

)



 }

 export default SearchFilter;