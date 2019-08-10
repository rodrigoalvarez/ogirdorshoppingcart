import React from 'react';
import './Product.css';

function Product(props) {
	return (
		<div className="product">
			<span className="product-name">{props.product.name}</span>
			<span className="product-price">$ {props.product.price.toFixed(2)}</span>
			<button className="add" onClick={function(){props.upCount(props.product.id)}}></button>
		</div>
	);
}

export default Product;
