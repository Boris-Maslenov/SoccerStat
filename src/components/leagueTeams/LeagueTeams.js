import React, {useState, useEffect} from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LeagueTeamsList from "../leagueTeamsList/LeagueTeamsList.js";
import BreadCrumbs from "../breadCrumbs/BreadCrumbs.js";
import SoccerService from '../../services/SoccerService.js';
import NotFound from "../notFound/NotFound.js";
import Error from "../error/Error.js";
import Spinner from "../spinner/Spinner.js";
import SearchFilter from "../searchFilter/searchFilter.js";
/* eslint-disable react-hooks/exhaustive-deps */
const LeagueTeams = () => {

    const {search} = useLocation();
    const navigate = useNavigate();
    const {leagueId} = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [filters, setFilters] = useState({
        filtered: false,
        search: '',
    });
    const soccerService = new SoccerService();

    const onRequest = (offset) => {
        soccerService.request(offset)
        .then(updateList)
        .catch(e => onError(e))
    }

    const updateList = (list) => {
        onLoaded();
        setList(list);
    }

    const onLoaded = () => {
          setLoading(false);
    }
    
    const onError = (e) => {
        setError(e);
        onLoaded();
    }

    useEffect(()=>{
        onRequest(`https://api.football-data.org/v2/competitions/${leagueId}/teams/`);
        onGetSearch();
    }, []);

    const onFiltered = (e) => {
        e.preventDefault();
            if(filters.search !== "" && !filters.filtered) {
                navigate("?search=" + filters.search, { replace: true });
                setFilters({
                    ...filters,
                    filtered:true     
                        });
            }
}

    const filterList = (list) => {
        
            if(!filters.filtered) return list.teams;

            if(list.teams){
                return list.teams.filter(elem => elem.name.toLowerCase().indexOf(filters.search.toLowerCase().trim()) > -1);
            }      
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

        if(e.target.value ==='') navigate("", { replace: true });

    }

    const renderListItems = (list) => {
        if(list && list.length > 0){
        return  list.map((item, i) => {
                return (
                    <LeagueTeamsList key={i} item={item} number={i} />
                )
            });

        } else {
                return < NotFound text={`Items matching the search criteria were not found!`}  />
            }
    }

    const elements = renderListItems( filterList(list) );
    const spinner = loading ?  <Spinner /> : null;
    const errorMessage = error ? < Error text={`При загрузке данных произошла ошибка. Текст ошибки: ${error}`} /> : null;
    const content = !(loading || error || !list) ? elements : null;

    return(
        <>
            <div className="top-content">

                        <div className="top-content__item">
                                <BreadCrumbs list={[{'patch': "/", 'title': 'Home'}]} />
                        </div>

                        <div className="top-content__item">
                                <SearchFilter onFiltered={onFiltered}  onSearchValue={onSearchValue} value={filters.search} />
                        </div>
            </div>
            <div className="list">
            <h1 className="list__title">{list.teams ? `${list.competition.name} : competitions teams` : null}     </h1>
                {spinner}
                {errorMessage}
                {content} 
            </div>
        </>

    )
}
export default LeagueTeams;