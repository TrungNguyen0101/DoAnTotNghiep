import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeMaster extends Component {
    render() {
        return (
            <div className="home">
                <div className="cloud">
                    <img className="cloud1"  src="Images/Startpage/Cloud.png" alt="" width="12%" ></img>
                    <img className="cloud2" src="Images/Startpage/Cloud.png" alt="" width="15%" ></img>
                    <img className="cloud3" src="Images/Startpage/Cloud.png" alt="" width="15%" ></img>
                    <img className="cloud4" src="Images/Startpage/Cloud.png" alt="" width="10%" ></img>
                </div>
                <div id="logo" className="center">
                    <img src="Images/StartPage/Logo_KIDE.png" alt="" />

                </div>
                <div id="login-button">
                    <Link to="/login">
                        <img style={{width: "10%"}} src="Images/StartPage/Login_Button.png" alt="" className="heart"/>
                    </Link>
                </div>
                <div className="letgo-button center zoom">
                    <Link to="/home-page">
                        <img src="Images/StartPage/LetGo_Button.png" alt=""/>
                    </Link>
                </div>
            </div>   
        );
    }
}

export default HomeMaster;