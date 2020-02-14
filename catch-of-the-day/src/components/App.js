import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object
    };

    state = {
        fishes: {},
        order: {},
    };

    componentDidMount() {
        const params = this.props.match.params;

        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes",
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const params = this.props.match.params;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // take copy of existing state (prevent mutations)
        const fishes = {...this.state.fishes};

        // add new fish to state
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };

    updateFish = (fishId, fish) => {
        const fishes = {...this.state.fishes};

        fishes[fishId] = fish;
        this.setState({ fishes });
    };

    deleteFish = (fishId) => {
        const fishes = {...this.state.fishes};

        fishes[fishId] = null;
        this.setState({ fishes });
    };

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (fishId) => {
        const order = {...this.state.order};

        order[fishId] = order[fishId] + 1 || 1;

        this.setState({ order });
    };

    removeFromOrder = (fishId) => {
        const order= {...this.state.order};

        delete order[fishId];
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"></Header>
                    <ul className="fishes">
                        {Object.entries(this.state.fishes).map(
                            ([fishId, fishValues]) => (
                                <Fish
                                    key={fishId}
                                    fishId={fishId}
                                    details={fishValues}
                                    addToOrder={this.addToOrder}
                                ></Fish>
                            )
                        )}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                ></Order>
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    storeId={this.props.match.params.storeId}
                ></Inventory>
            </div>
        )
    };
}

export default App;