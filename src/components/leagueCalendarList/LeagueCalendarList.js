import React from "react";

const LeagueCalendarList = ({clazz, item, number}) => {

    return(

        <div className="col">
                <div className="col__item col__number">{number+1}</div>
                <div className="col__item">
                    <span className="col__data">{item.utcDate.split('T')[0]}</span>
                </div>
                <div className="col__item col__league-name">
                        <div className="score">
                                <div className="score__name">
                                    <a className="score__link" href={`/team-calendar/${item.homeTeam.id}`}>{item.homeTeam.name}</a>
                                    <a className="score__link"  href={`/team-calendar/${item.awayTeam.id}`} >{item.awayTeam.name}</a>
                                </div>
                            <div className="score__score">
                                <div>{item.score.fullTime.homeTeam}</div>
                                <div>{item.score.fullTime.awayTeam}</div>
                            </div>
                        </div>
                </div>

                <div className="col__item col__item_status">

                    <div className={clazz}>{item.status}</div>

                </div>
        </div>

    )

}

export default LeagueCalendarList;