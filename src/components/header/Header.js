import React from "react";
import logo from '../../assets/img/logo.svg';


const Header = () => {

        return(
                    <header className="header">  
                        <div className="container">
                            <div className="header__inner">
                                <a href="/" className="logo header__elem">
                                    <img className="logo__img" src={logo} alt="logo" />
                                    <span className="logo__name">SoccerStat</span>          
                                </a>
                            </div>
                        </div> 
                    </header>

        )

}

export default Header;