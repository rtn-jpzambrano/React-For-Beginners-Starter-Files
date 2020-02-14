import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import Login from './Login';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        loadSampleFishes: PropTypes.func,
        addFish: PropTypes.func,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    };

    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, { context: this });
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();

        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = <button onClick={this.logout}>Log out</button>

        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>;
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>You no owner :?</p>
                    {logout}
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                <ul>
                    {Object.entries(this.props.fishes).map(([fishId, values]) => (
                        <EditFishForm
                            key={fishId}
                            fish={values}
                            fishId={fishId}
                            updateFish={this.props.updateFish}
                            deleteFish={this.props.deleteFish}
                        ></EditFishForm>
                    ))}
                </ul>
                <AddFishForm
                    addFish={this.props.addFish}
                ></AddFishForm>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
         );
    }
}

export default Inventory;