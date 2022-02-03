import React from "react";

const LeagueTeamsList = ({number, item}) => {


    return(

            <div className="col">
                    <div className="col__item col__number">
                    {number+1}
                    </div>
                    <div className="col__item col__img">
                        {item.crestUrl ? <img className="flag" src={item.crestUrl} alt={item.shortName} /> : null }
                    </div>

                    <div className="col__item col__lang">
                    {item.tla} 
                    </div>
                    <div className="col__item col__league-name">
                        <span>{item.name}</span>
                    </div>
                    <div className="col__item">
                        <div className="col__contacts">
                            <a className="col__link" href={`tel:${item.phone}`} >{item.phone}</a>
                            <a className="col__link col__mail" href={`mailto:${item.email}`}>{item.email}</a>
                        </div>
                            
                    </div>
                    <div className="col__item"> <a href={`/team-calendar/${item.id}`} className="col__link col__link_calendar">Calendar</a> </div>

            </div>


    )

}

export default LeagueTeamsList;