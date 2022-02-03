import React, {useEffect, useState} from "react";
import LeaguesList from "../leaguesList/LeaguesList.js";
import {useLocation, useNavigate } from 'react-router-dom';
import SoccerService from '../../services/SoccerService.js';
import Spinner from "../spinner/Spinner.js";
import NotFound from "../notFound/NotFound.js";
import Error from "../error/Error.js";
import SearchFilter from "../searchFilter/searchFilter.js";
/* eslint-disable react-hooks/exhaustive-deps */

const Leagues = () => {

const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [list, setList] = useState([]);
const [filters, setFilters] = useState({
    filtered: false,
    search: '',
});

const {search} = useLocation();
const navigate = useNavigate();

const onFiltered = (e) => {
    e.preventDefault();
        if(filters.search !== "" && !filters.filtered) {
            navigate("/?search=" + filters.search, { replace: true });
            setFilters({
                ...filters,
                filtered:true     
                    });
        }
}
const filterList = (list) => {
    if(!filters.filtered) return list;
    return list.filter(elem => elem.name.toLowerCase().indexOf(filters.search.trim()) > -1);
}
const onGetSearch = () => {
    if(search){
        setFilters( 
            { filtered: true,
                'search':search.split('=')[1]
            }
           )
    }
}
const onSearchValue = (e) => {
    e.preventDefault();
    setFilters({
        ...filters,
        filtered: false,
        [e.target.name]: e.target.value
    });
    if(e.target.value ==='') navigate("/", { replace: true });
}
const updateList = (list) => {
    onLoaded();
    setList(list.competitions);

}
const soccerService = new SoccerService();

const onRequest = (offset) => {
    soccerService.request(offset)
    .then(updateList)
    .catch(e => onError(e))
}

const onLoaded = () => {
    setLoading(false);
}

const onError = (e) => {
    setError(e);
    onLoaded();
}

useEffect(()=>{
    onRequest('https://api.football-data.org/v2/competitions/?plan=TIER_ONE');
    onGetSearch();
},[]);

const renderListItems = (list) => {
    if(list.length > 0){
     return  list.map((item, i) => {

            return (
                <LeaguesList key={i} item={item} number={i}/>
            )
        });

    } else {return <NotFound text="Items matching the search criteria were not found!" />}
}

const elements = renderListItems( filterList(list) );
const spinner = loading ?  <Spinner /> : null;
const errorMessage = error ? <Error text={`При загрузке данных произошла ошибка. Текст ошибки: ${error}`}  /> : null;
const content = !(loading || error || !list) ? elements : null;

return(
    <>
        <div className="top-content">
            
                <div className="top-content__item">                         
                </div>
            <div className="top-content__item">
                    <SearchFilter onFiltered={onFiltered}  onSearchValue={onSearchValue} value={filters.search} />
            </div>
        </div>    
        <div className="list">
            <h1 className="list__title">Leagues</h1>
                {spinner}
                {errorMessage}
                {content} 
        </div>
    </>
);
}
export default Leagues;