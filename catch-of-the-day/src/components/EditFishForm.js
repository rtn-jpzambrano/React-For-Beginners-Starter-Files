import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
    static propTypes = {
        fishId: PropTypes.string,
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
    };

    handleChange = ({ currentTarget }) => {
        const valueAsNumber = parseFloat(currentTarget.value);
        const isNumber = !isNaN(valueAsNumber);

        const updatedFish = {
            ...this.props.fish,
            [currentTarget.name]: isNumber ? valueAsNumber : currentTarget.value,
        };

        this.props.updateFish(this.props.fishId, updatedFish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={this.props.fish.name}
                    onChange={this.handleChange}
                />
                <input
                    name="price"
                    type="text"
                    placeholder="Price"
                    value={this.props.fish.price}
                    onChange={this.handleChange}
                />

                <select
                    name="status"
                    placeholder="Status"
                    value={this.props.fish.status}
                    onChange={this.handleChange}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea
                    name="desc"
                    placeholder="Desc"
                    value={this.props.fish.desc}
                    onChange={this.handleChange}
                />
                <input
                    name="image"
                    type="text"
                    placeholder="Image"
                    value={this.props.fish.image}
                    onChange={this.handleChange}
                />

                <button onClick={() => this.props.deleteFish(this.props.fishId)}>Remove Fish</button>
            </div>
        );
    }
}

export default EditFishForm;