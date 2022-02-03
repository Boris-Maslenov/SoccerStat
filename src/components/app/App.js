import React from "react";
import Leagues from "../leagues/Leagues";
import LeagueTeams from "../leagueTeams/LeagueTeams";
import LeagueCalendar from "../leagueCalendar/LeagueCalendar";
import TeamCalendar from "../teamCalendar/TeamCalendar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {

return(

    <Router>
        <div className="wrapper">
            <Header />
                <div className="content">  
                    <div className="container container_white">
                        <Routes>
                            <Route path='/' element={<Leagues />} /> 
                            <Route path='/league-teams/:leagueId' element={<LeagueTeams />} />
                            <Route path='/league-calendar/:leagueId/' element={<LeagueCalendar />} />
                            <Route path='/team-calendar/:teamId/' element={<TeamCalendar />} />             
                        </Routes>    
                    </div>
                </div>
            <Footer />
        </div> 
    </Router>
)
    
}

export default App;