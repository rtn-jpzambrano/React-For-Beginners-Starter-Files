import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends Component {
    static propTypes = {
        fishId: PropTypes.string,
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        addToOrder: PropTypes.func,
    };

    render() {
        const { name, image, price, desc, status } = this.props.details;
        const isAvailable = status === "available";

        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button
                    disabled={!isAvailable}
                    onClick={() => this.props.addToOrder(this.props.fishId)}
                >
                    {isAvailable ? "Add To Order" : "Sold Out!"}
                </button>
            </li>
        );
    }
}

export default Fish;