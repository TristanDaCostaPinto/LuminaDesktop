import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, HashRouter } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import Settings from "./components/settings";
import Appointment from "./components/appointment";
import AddAppointment from './components/addAppointment';
import ModifyAppointment from "./components/modifyAppointment";
import Agencies from "./components/agencies";
import ModifyAgency from "./components/modifyAgency";
import AddAgency from "./components/addAgency";
import Properties from "./components/properties";
import AddProperty from "./components/addProperty";
import ModifyProperty from "./components/modifyProperty";

import { clearMessage } from "./actions/message";

import { History } from "./helpers/history";



export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        History.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    return (
        <HashRouter history={History}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/appointment" component={Appointment} />
                <Route path='/addAppointment' component={AddAppointment} />
                <Route path="/modifyAppointment/:infoAppointment" component={ModifyAppointment} />
                <Route path="/agencies" component={Agencies} />
                <Route path="/addAgency" component={AddAgency} />
                <Route path="/modifyAgency/:infoAgency" component={ModifyAgency} />
                <Route path="/properties" component={Properties} />
                <Route path="/addProperty" component={AddProperty} />
                <Route path="/modifyProperty/:infoProperty" component={ModifyProperty} />
            </Switch>
        </HashRouter>
    );
};
