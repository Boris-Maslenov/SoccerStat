import React from "react";

const LeaguesList = ({item, number}) => {
return(
    <div className="col">
            <div className="col__item col__number">
                {number+1}
            </div>
            <div className="col__item col__img">
                {item.area.ensignUrl ? <img className="flag" src={item.area.ensignUrl} alt={item.code} /> : null }
            </div>
            <div className="col__item col__lang">
                {item.code}
            </div>
            <div className="col__item col__league-name">
                {item.name}
            </div>
            <div className="col__item col__data-start">
                <span className="col__data">{item.currentSeason.startDate}</span>
                <span className="col__data"> - </span>
                <span className="col__data">{item.currentSeason.endDate}</span>
            </div>
            {/* <div className="col__item col__winner"></div> */}
            <div className="col__item cool__item_calendar">
                    <a href={`/league-teams/${item.id}`} className="col__link_competitors">Competitors</a>
                    <a href={`/league-calendar/${item.id}`} className="col__link_calendar">Calendar</a>
            </div>
            {/* <div className="col__item">
                
            </div> */}
    </div>
)

}

export default LeaguesList;