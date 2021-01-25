import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect'

import './App.css';

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from './pages/checkout/checkout.component';

import Header from "./components/header/header.component";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";

import { selectCurrentUser } from './redux/user/user.selectors';

//purpose - saving SHOP_DATA to firebase
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
class App extends React.Component {

  render() {
    return (
      //header is always present and rendered despite whatever 
      //react - touter - dom and switch component and route component 
      //decide to render onto the page
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)
            }
          />
        </Switch>
      </div >
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
