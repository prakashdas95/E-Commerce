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
import { auth, createUserProfileFileDocument } from "./firebase/firebase.utils";

//purpose - saving SHOP_DATA to firebase
// import { auth, createUserProfileFileDocument, addCollectionAndDocuments } from "./firebase/firebase.utils";

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

//purpose - saving SHOP_DATA to firebase
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser, collectionsArray } = this.props; //purpose - saving SHOP_DATA to firebase
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

      //purpose - saving SHOP_DATA to firebase
      // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })))
    });

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
  //purpose - saving SHOP_DATA to firebase
  // collectionsArray: selectCollectionsForPreview // convert array to object
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
