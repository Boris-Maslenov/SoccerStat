import React, {useState, useEffect} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import LeagueCalendarList from "../leagueCalendarList/LeagueCalendarList.js";
import SoccerService from '../../services/SoccerService.js';
import DateFilter from "../dateFilter/DateFilter.js";
import NotFound from "../notFound/NotFound.js";
import Error from "../error/Error.js";
import Spinner from "../spinner/Spinner.js";
/* eslint-disable react-hooks/exhaustive-deps */
const LeagueCalendar = () => {

    const {leagueId} = useParams();
    const {search} = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);

    const onFiltered = (dateStart, dateEnd) => {
        setLoading(true);
        navigate(`?dateFrom=${dateStart}&dateTo=${dateEnd}`, { replace: true });
        onRequest(`https://api.football-data.org/v2/competitions/${leagueId}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`);  
    }

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
        if(search){
            const dateStart = search.split('&')[0].split('=')[1];
            const dateEnd = search.split('&')[1].split('=')[1];
            onRequest(`https://api.football-data.org/v2/competitions/${leagueId}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`);
        }else{
            onRequest(`https://api.football-data.org/v2/competitions/${leagueId}/matches/`);
        }
 
    }, []);

    const renderListItems = (list) => {
        if(list && list.length > 0){
        return  list.map( (item, i) => {
            const clazz = item.status === "FINISHED" ? 'status status_finished' : 'status status_scheduled';
                return (
                    <LeagueCalendarList key={i} item={item} number={i} clazz={clazz}  />
                )
            });
        } else {
        return  <NotFound text="Элементов не найдено" />
        }
    }

    const elements = renderListItems(list.matches);
    const spinner = loading ?  <Spinner /> : null;
    const errorMessage = error ? <Error text={`An error occurred while loading data. Error text: ${error}`} /> : null;
    const content = !(loading || error || !list) ? elements : null;

    return(
                <>
                    <div className="top-content">
                        <div className="top-content__item">
                                <DateFilter onFiltered={onFiltered} getParam={search} />
                        </div>
                    </div> 

                    <div className="list">

                        <h1 className="list__title">{list.matches ? `${list.competition.name} : calendar matches` : null }</h1>
                        {spinner}
                        {errorMessage}
                        {content} 
                    </div>
                </>
    )
}

export default LeagueCalendar;