import React from 'react';
import './CartItem.css';

function CartItem(props) {
	return (
		<div className="product">
            <div className="product-group">
                <span className="product-quantity">{props.item.quantity} x </span>
                <div className="product-block">
                    <span className="product-name">{props.item.name}</span>
                    <span className="product-price">$ {props.item.price.toFixed(2)}</span>
                </div>
            </div>
            <span className="product-total">$ {(props.item.price * props.item.quantity).toFixed(2)}</span>
			<button className="remove" onClick={function(){props.downCount(props.item.id)}}></button>
		</div>
	);
}

export default CartItem;
