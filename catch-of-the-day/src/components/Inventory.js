import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                <ul>
                    {Object.entries(this.props.fishes).map(([fishId, values]) => (
                        <EditFishForm
                            key={fishId}
                            fish={values}
                            fishId={fishId}
                            updateFish={this.props.updateFish}
                        ></EditFishForm>
                    ))}
                </ul>
                <AddFishForm addFish={this.props.addFish}></AddFishForm>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
         );
    }
}

export default Inventory;