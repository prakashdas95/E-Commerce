import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import './App.css';

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import Header from "./components/header/header.component";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth, createUserProfileFileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from './redux/user/user.actions';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // storing user data in our firebase database
        const userRef = await createUserProfileFileDocument(userAuth);
        // updating the user details in state 
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
          // console.log(snapshot.data());
          // console.log(this.state);
        });
      }
      // if user logout or null then null will be update there
      setCurrentUser(userAuth);
    });

    console.log(this.props.currentUser);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


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


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
