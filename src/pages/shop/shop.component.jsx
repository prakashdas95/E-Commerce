import React from "react";
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';


import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');


        //fetch - way  -- need to check correct url 
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-202f1/databases/(default)/documents')
        //     .then(response => response.json())
        //     .then(collections => console.log(collections))


        // //Promise - way
        // collectionRef.get()
        //     .then(snapshot => {
        //         const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //         // storing data to our shop reducer
        //         updateCollections(collectionMap);
        //         this.setState({ loading: false });
        //     })

        // obversable - way
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            // storing data to our shop reducer
            updateCollections(collectionMap);
            this.setState({ loading: false });
        });
    }

    // componentWillUnmount() {
    //     this.unsubscribeFromSnapshot();
    // }


    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page" >
                <Route
                    exact
                    path={`${match.path}`}
                    render={
                        props => (<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)
                    } />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={
                        props => (<CollectionsPageWithSpinner isLoading={loading} {...props} />)
                    } />
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage);