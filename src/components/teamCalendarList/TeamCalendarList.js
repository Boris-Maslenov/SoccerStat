import React from "react";

const TeamCalendarList = ({item, number, clazz}) => {

return(
    <div tabIndex="1" className="col">
                <div className="col__item col__number">{number+1}</div>
                <div className="col__item col__img">
                        {item.competition.area.ensignUrl ? <img className="flag" alt={item.competition.area.code} src={ item.competition.area.ensignUrl } /> : null }
                </div>
                <div className="col__item col__data">
                    <span className="">{item.utcDate.split('T')[0]}</span>
                </div>
                <div className="col__item col__score">

                        <div className="score">
                                <div className="score__name">
                                        <a className="score__link" href={`/team-calendar/${item.homeTeam.id}/`} >{item.homeTeam.name}</a>
                                        <a className="score__link" href={`/team-calendar/${item.awayTeam.id}/`} >{item.awayTeam.name}</a>
                                </div>

                                <div className="score__score">
                                       <div className="">{item.score.fullTime.homeTeam}</div>
                                       <div className="">{item.score.fullTime.awayTeam}</div>
                                </div>

                        </div>

                </div>
                        <div className="col__item leguage-team">
                                <div className="col__data">{item.competition.name}</div>
                        </div>
                        <div className="col__item">
                                <div className={clazz}>{item.status}</div>
                        </div>
                      

    </div>
)

}

export default TeamCalendarList;