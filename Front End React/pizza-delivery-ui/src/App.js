import React, {Component} from 'react';

import './App.css';
import Form from './Components/Form';
import Pizzas from './Components/Pizzas';
import Basket from './Components/Basket';
import CheckOut from './Components/CheckOut';
import NavBar from './Components/NavBar';


class App extends Component{

  constructor(props)
  {
    super(props);
    this.state = { pizzas : [], cartItems : [], displayLoader : false }
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleIncrementToCart = this.handleIncrementToCart.bind(this);
    this.handleDecrementToCart = this.handleDecrementToCart.bind(this);
  }
  
  componentDidMount()
  {
    this.setState({displayLoader : true});
    //Call Laravel API to Load Pizzas
    fetch('https://safe-lake-22225.herokuapp.com/api/PizzaHome')
    .then(res => res.json())
    .then((data) => {
      this.setState({pizzas : data})
      console.log(this.state.pizzas);
      this.setState({displayLoader : false});
    })
    .catch(console.log)    
    
    //Load cached cart items if any
    const savedItems = localStorage.getItem("cartItems");

    if(savedItems!== null && savedItems !== undefined && savedItems !=='')
    {
      try{
        
        this.setState({cartItems : JSON.parse(localStorage.getItem("cartItems"))});
      }
      catch(err)
      {
        console.log(err);
      }
    }
        
  }

  //Add Items to cart
  handleAddToCart(e,pizza){
    
    const cartItems = this.state.cartItems;
    let productAlreadyInCart = false;
    cartItems.forEach(item =>{
      if(item.id===pizza.id){
        productAlreadyInCart = true;
        item.quantity ++;
      }
    });

    if(!productAlreadyInCart){
      cartItems.push({...pizza, quantity:1});
    }

    localStorage.removeItem("cartItems");    
    this.setState({cartItems : cartItems}); 
    e.preventDefault();
  }


  handleIncrementToCart(e,pizza){

    const cartItems = this.state.cartItems;
      
      cartItems.forEach(item =>{
        if(item.id===pizza.id){          
          item.quantity ++;
        }
      });

      this.setState({cartItems : cartItems});      
      localStorage.setItem("cartItems",JSON.stringify(cartItems)); 
    
      
  }

  handleDecrementToCart(e,pizza){

    const cartItems = this.state.cartItems;
      
      cartItems.forEach(item =>{        
        if(item.id===pizza.id && item.quantity >1){          
          item.quantity =item.quantity -1;
        }
      });
      
      this.setState({cartItems : cartItems});
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      
  }

  handleRemoveFromCart(e,item)
  {
    const cartItems= this.state.cartItems.filter(x=>x.id !== item.id);
    this.setState({cartItems : cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
     
  }
  
  render(){
    const {pizzas,cartItems, displayLoader} = this.state;
    return (
      <div className = "App">
        <NavBar></NavBar>       
        <div id="loader" className={displayLoader ? 'show' : 'hidden'}>
            <img src={process.env.PUBLIC_URL +`/images/smart_loading.gif`} style={{width:"100px"}}/>
        </div>        
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Pizzas pizzas={pizzas} handleAddToCart={this.handleAddToCart}/>
            </div>
            <div className="col-md-4">
              <h1>Cart</h1>
              <Basket cartItems={cartItems} 
              handleRemoveFromCart={this.handleRemoveFromCart} 
              handleIncrementToCart={this.handleIncrementToCart}
              handleDecrementToCart={this.handleDecrementToCart}/>
            </div>

          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
