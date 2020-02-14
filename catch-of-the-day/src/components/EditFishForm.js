import React, { Component } from 'react';

class EditFishForm extends Component {
    handleChange = (event) => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value,
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
            </div>
        );
    }
}

export default EditFishForm;