import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from "../../service/Auth";

class HeaderChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: Auth.getCurrentUser(),
        };
    }

    componentDidMount() {
        this.getWidthExp();
    }

    getLevel = () => {
        const {exp} = this.state.currentUser;
        const e = parseInt(exp / 100);
        if (e < 1) {
            return 0;
        }
        if (e > 50) {
            return 50;
        }
        return e;
    }

    getExperience = () => {
        const {exp} = this.state.currentUser;
        const e = exp % 100;
        if (e !== 0) {
            return e;
        }
        return 0;
    }

    getWidthExp() {
        if(this.state.currentUser) {
            const {exp} = this.state.currentUser;
            const progressbar = document.getElementById("progressbar");
            const e = exp % 100;
            if (e !== 0) {
                progressbar.style.width = `${exp % 100}%`;
            } else {
                progressbar.style.width = `${0}%`;
            }
        }
    }

    render() {
        const {currentUser} = this.state;
        return (
            <div id="header" className="header" style={{backgroundColor: '#36becc'}}>
                <Link to="/change-avatar" style={{width: '15%', marginRight: "15px"}}>
                    <img
                        src={currentUser.avatar === "AVATAR_CAT" ? "Images/HomePage/Cat_avatar.png" : currentUser.avatar === "AVATAR_DINOSAUR"
                            ? "Images/HomePage/Dinosaur_avatar.png" : "Images/HomePage/Dolphin_avatar.png"}
                        style={{width: '100%', borderRadius: '15px', backgroundColor: 'white'}} id="avatar"/>
                </Link>
                <label className="text-left">{currentUser.username}</label>
                <ul className="text-center w-100" style={{listStyle: 'none', fontWeight: 'bold', fontStyle: 'italic'}}>
                    <li>Level {this.getLevel()}</li>
                    <div className="progress ml-5 " style={{width: '80%'}}>
                        <div className="progress-bar bg-info" role="progressbar"  id="progressbar"
                             aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                    </div>
                    <li>{this.getExperience()}/100 exp</li>
                </ul>
                <Link to="/login" className="text-right box-shadow" style={{width: '13%', borderRadius: '12px'}}>
                    <img src="Images/HomePage/Logout_Icon.png"
                         className="logout"
                         style={{width: '100%', backgroundColor: 'white', borderRadius: '8px'}}/>
                </Link>
            </div>
        );
    }
}

export default HeaderChange;