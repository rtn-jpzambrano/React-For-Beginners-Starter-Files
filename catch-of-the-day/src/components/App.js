import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    };

    addFish = (fish) => {
        // take copy of existing state (prevent mutations)
        const fishes = {...this.state.fishes};

        // add new fish to state
        fishes[`fish${Date.now()}`] = fish;
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
                                        addToOrder={this.addToOrder}></Fish>
                            )
                        )}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                ></Order>
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                ></Inventory>
            </div>
        )
    };
}

export default App;