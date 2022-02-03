import React, {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate } from 'react-router-dom';
import TeamCalendarList from "../teamCalendarList/TeamCalendarList.js";
import SoccerService from '../../services/SoccerService.js';
import DateFilter from "../dateFilter/DateFilter.js";
import BreadCrumbs from "../breadCrumbs/BreadCrumbs.js";
import NotFound from "../notFound/NotFound.js";
import Error from "../error/Error.js";
import Spinner from "../spinner/Spinner.js";

/* eslint-disable react-hooks/exhaustive-deps */
const TeamCalendar = () => {

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);
        const [list, setList] = useState(null);
        const [team, setTeam] = useState(null);

        const {teamId} = useParams();
        const {search} = useLocation();
        const navigate = useNavigate();

        const soccerService = new SoccerService();

        const updateTeam = (res) => {
            setTeam(res.name);
            if(search){
                onSearchRequest();
            }else{
                onRequest(`https://api.football-data.org/v2/teams/${teamId}/matches/`);
            }
            
        }


const onFiltered = (dateStart, dateEnd) => {
    setLoading(true);
    navigate(`?dateFrom=${dateStart}&dateTo=${dateEnd}`, { replace: true });
    onRequest(`https://api.football-data.org/v2/teams/${teamId}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`);  
}

    const onRequestTeam = (offset) => {
          soccerService.request(offset)
          .then(updateTeam)
          .catch(e => onError(e))
    }

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

        const onSearchRequest = () => {
            const dateStart = search.split('&')[0].split('=')[1];
            const dateEnd = search.split('&')[1].split('=')[1];
            onRequest(`https://api.football-data.org/v2/teams/${teamId}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`); 
        }
    
        useEffect(()=>{

                onRequestTeam(`https://api.football-data.org/v2/teams/${teamId}`);
               
        }, []);


    const renderListItems = (list) => {

    if(list && list.matches.length > 0) {
     const listReverse = list.matches.slice().reverse();
       return  listReverse.map( (item, i) => {
            let clazz = '';
            switch(item.status) {
                case "FINISHED" : 
                    clazz = "status status_finished"
                break;
                case "SCHEDULED" :
                    clazz = "status status_scheduled"  
                break;
                default :
                    clazz = "status status_error";
            }

                return (
                            < TeamCalendarList key={i} item={item}  number={i} clazz={clazz} />
                )
    
            });

    
        } else {
    
    return <NotFound text="Items matching the search criteria were not found!" />
    
        }
    }
    
    const elements = renderListItems(list);
    const spinner = loading ?  <Spinner /> : null;
    const errorMessage = error ? <Error text={`An error occurred while loading data. Error text: ${error}`} /> : null;
    const content = !(loading || error || !list) ? elements : null;

     return(

        <>
                <div className="top-content">
                        <div className="top-content__item">
                                <BreadCrumbs list={[{'patch': "/", 'title': 'Home'}]} />
                        </div>
                    <div className="top-content__item">
                            <DateFilter onFiltered={onFiltered} getParam={search} />
                    </div>
                </div> 

            <div className="list">
            <h1 className="list__title">{team ? `${team} : team calendar` : null} </h1>
                {spinner}
                {errorMessage}
                {content} 
            </div>

    </>
    )
} 

export default TeamCalendar;