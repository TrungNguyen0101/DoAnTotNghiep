import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import StartMaster from "./components/start/StartMaster";
import HomePage from "./components/home/HomePage";
import ChangeAvatar from "./components/changeAvatar/ChangeAvatar";
import LoginMaster from "./components/login/LoginMaster";
import RegisterMaster from "./components/register/RegisterMaster";
import UnitAphabet from "./components/unit-aphabet/UnitAphabet";
import LearnAlphabet from "./components/unit-aphabet/LearnAlphabet";
import LearnNumber from "./components/UnitNumber/LearnNumber";
import UnitNumber from "./components/UnitNumber/UnitNumber";
import Learn_color from "./components/Unit_Color/Learn_color";
import UnitColor from "./components/Unit_Color/UnitColor";
import Learn_animal from "./components/Unit_Animal/Learn_animal";
import UnitAnimal from "./components/Unit_Animal/UnitAnimal";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home"/>
                </Route>
                <Route component={StartMaster} path="/home" exact/>
                <Route component={LoginMaster} path="/login" exact/>
                <Route component={HomePage} path="/home-page" exact/>
                <Route component={ChangeAvatar} path="/change-avatar" exact/>
                <Route component={RegisterMaster} path="/register" exact/>
                <Route component={UnitAphabet} path="/unit-aphabet" exact/>
                <Route component={LearnAlphabet} path="/learn-aphabet" exact/>
                <Route component={LearnNumber} path="/learn-number" exact/>
                <Route component={UnitNumber} path="/unit-number" exact/>
                <Route component={Learn_color} path="/learn-color" exact/>
                <Route component={UnitColor} path="/unit-color" exact/>
                <Route component={Learn_animal} path="/learn-animal" exact/>
                <Route component={UnitAnimal} path="/unit-animal" exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
