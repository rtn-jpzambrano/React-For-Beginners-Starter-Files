import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../helpers';

class Order extends Component {
    static propTypes = {
        fishes: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        order: PropTypes.object,
        removeFromOrder: PropTypes.func,
    };

    renderOrder = (id) => {
        const fish = this.props.fishes[id];
        const count = this.props.order[id];
        const isAvailable = fish && fish.status === "available";

        const transitionOptions = {
            classNames: "order",
            key: id,
            timeout: { enter: 500, exit: 500 },
        };

        return isAvailable ? (
            <CSSTransition {...transitionOptions}>
                <li key={id}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500}}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.removeFromOrder(id)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
        ) : fish ? (
            <CSSTransition {...transitionOptions}>
                <li key={id}>
                    Sorry {fish ? fish.name : "fish"} is no longer available
                </li>
            </CSSTransition>
        ) : null;
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
                <TransitionGroup component="ul" className="order">
                    {fishIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;