import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Order extends Component {
    renderOrder = (id) => {
        const fish = this.props.fishes[id];
        const count = this.props.order[id];
        const isAvailable = fish && fish.status === "available";

        return isAvailable ? (
            <li key={id}>
                {count} lbs {fish.name}
                {formatPrice(count * fish.price)}
            </li>
        ) : (
            <li key={id}>
                Sorry {fish ? fish.name : "fish"} is no longer available
            </li>
        );
    }

    render() {
        const fishIds = Object.keys(this.props.order);
        const total = fishIds.reduce((prevTotal, id) => {
            const fish = this.props.fishes[id];
            const count = this.props.order[id];
            const isAvailable = fish && fish.status === "available";

            return isAvailable ? prevTotal + (count * fish.price) : prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {fishIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;