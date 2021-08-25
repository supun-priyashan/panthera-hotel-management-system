/*

=========================================================
* Now UI Kit React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2021 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/main/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";

// styles for this kit
import './index.css';
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

import LandingPage from "views/pages/LandingPage.js";
import ProfilePage from "views/pages/ProfilePage.js";
import RoomsPage from "views/pages/RoomsPage";
import RestaurantsPage from "views/pages/RestaurantsPage";
import FoodsPage from "views/pages/FoodsPage";
import HallsPage from "views/pages/HallsPage";


ReactDOM.render(
    <Router>
      <div>
        <Switch>
          <Route path='/rooms' exact component={RoomsPage} />
          <Route path='/halls' exact component={HallsPage} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/profile' exact component={ProfilePage} />
          <Route path='/restaurants' exact component={RestaurantsPage} />
          <Route path='/foods' exact component={FoodsPage} />

        </Switch>
      </div>
    </Router>,
  document.getElementById("root")
);
