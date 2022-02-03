import React from "react";
import { useState, useEffect } from "react";

const DateFilter = ({onFiltered, getParam}) => {

const [filterValue, setFilterValue] = useState({
    'dateStart': '',
    'dateEnd': '',
});

const [validate, setValidate] = useState(false);

const onFilterValue = (e) => {
    setFilterValue({
        ...filterValue,
        [e.target.name] : e.target.value.trim(),
    });
};

useEffect( () => {
  
    if(getParam){
        setFilterValue({
                    'dateStart': getParam.split('&')[0].split('=')[1],
                    'dateEnd': getParam.split('&')[1].split('=')[1],
                    })  
    }

}, [] );


useEffect( () => {
    validateInput();
}, [filterValue] );

const validateInput = () => {
    const regExp = /\d{4}(-)\d{2}(-)\d{2}/i;
 
    
    

(filterValue.dateStart.search(regExp) !== -1 && filterValue.dateEnd.search(regExp) !== -1 ) || (filterValue.dateStart === '' && filterValue.dateEnd === '') ? setValidate(true) : setValidate(false);  
        }

    const onSubmit = (e) => {
        e.preventDefault();
            if(validate) {
                onFiltered(filterValue.dateStart, filterValue.dateEnd);
            }
    }

    const clazz = validate ? 'sort__input sort__input_active' : 'sort__input sort__input_error';

return(

    <form className="sort">

            <span className="sort__title">Sort by Dater</span>
            <div className="input-wrap">
                <div className="sort__label" >from: <input onChange={e=>onFilterValue(e)} value={filterValue.dateStart} className={clazz} placeholder="2021-01-01"  name="dateStart" /> </div>

                <div className="sort__label" >to: <input onChange={e=>onFilterValue(e)} className={clazz} value={filterValue.dateEnd} placeholder="2022-01-01" name="dateEnd" /> </div>
            </div>
            <button onClick={e=>onSubmit(e)} className="sort__button" type="submit">Sort</button>

    </form>



)

}

export default DateFilter;