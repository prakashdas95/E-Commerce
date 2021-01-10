import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import Header from "./components/header/header.component";

function App() {
  return (
    //header is always present and rendered despite whatever 
    //react - touter - dom and switch component and route component 
    //decide to render onto the page
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
