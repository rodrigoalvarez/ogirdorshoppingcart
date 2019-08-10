import React from 'react';
import Product from './components/Product';
import CartItem from './components/CartItem';
import './App.css';

class App extends React.Component {

	// Array of Products
	products = [
		{
			id: 1,
			name: "Sledgehammer",
			price: 125.75
		},
		{
			id: 2,
			name: "Axe",
			price: 190.50
		},
		{
			id: 3,
			name: "Bandsaw",
			price: 562.13
		},{
			id: 4,
			name: "Chisel",
			price: 12.9
		},
		{
			id: 5,
			name: "Hacksaw",
			price: 18.45
		}
	];

    constructor() {
		super();
		// Get the previous Cart
		var array = JSON.parse(localStorage.getItem('ogirdor-cart')) || [];
		var total = 0;
		// Total cost calculation
		array.forEach(element => {
			total += element.quantity * element.price;
		});
		// Update the state of the Cart
        this.state = {
			cart: array,
			total: total
		}
        this.upCount = this.upCount.bind(this);
        this.downCount = this.downCount.bind(this);
	}

	// Update and save the current state of the Cart
	updateData(array) {
		// Save the current state of the Cart
		localStorage.setItem('ogirdor-cart', JSON.stringify(array));
		var total = 0;
		// Total cost calculation
		array.forEach(element => {
			total += element.quantity * element.price;
		});
		// Update the state of the Cart
		this.setState({
			cart: array,
			total: total
		});
	}

	// Increase the quantity of a product
    upCount(id) {
		var idx = this.state.cart.findIndex(x => x.id === id);
		var array = [...this.state.cart];
		if (idx >= 0) {
			// Update the quantity of the current Product
			array[idx].quantity = array[idx].quantity + 1;
		} else {
			// Add the Product to the Cart
			var product = this.products.find(x => x.id === id);
			array.push({
				id: id,
				name: product.name,
				price: product.price,
				quantity: 1
			});
		}
		// Update the state of the Cart
		this.updateData(array);
    }

	// Decrese the quantity of a product
    downCount(id) {
		var idx = this.state.cart.findIndex(x => x.id === id);
		var product = this.state.cart[idx];
		var array = [...this.state.cart];
		if (product.quantity > 1) {
			// Update the quantity of the current Product
			array[idx].quantity = array[idx].quantity - 1;
		} else {
			// Remove the current Product from the Cart
			array.splice(idx, 1);
		}
		// Update the state of the Cart
		this.updateData(array);
    }

    render() {
		const productList = this.products.map((product, i) => <Product product={product} key={i} upCount={this.upCount}></Product>);
		const cartList = this.state.cart.map((item, i) => <CartItem item={item} key={i} downCount={this.downCount}></CartItem>);
        return (
			<div className="app">
				<div className="app-header">
					<h1>Ogirdor Shopping Cart</h1>
				</div>
				<div className="app-content">
					<div className="product-list">
						<img className="list-image" src="https://image.flaticon.com/icons/svg/25/25679.svg" alt="logo" />
						<span className="list-title">Products</span>
						<div>
							<span className="list-empty">There are not products</span>
							{productList}
						</div>
					</div>
					<div className="product-list">
						<img className="list-image" src="https://image.flaticon.com/icons/svg/60/60992.svg" alt="logo" />
						<span className="list-title">Cart</span>
						<div>
							<span className="list-empty">The cart is empty</span>
							{cartList}
						</div>
						<span className="list-total">$ {this.state.total.toFixed(2)}</span>
					</div>
				</div>
			</div>
		);
    }
}

export default App;
