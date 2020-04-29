import React,{ Component } from "react";
import { formatEuro, GetDollar } from "../util";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class Basket extends Component{

constructor(props)
  {
    super(props);
    
  }

    render(){
        const {cartItems,handleIncrementToCart,handleDecrementToCart,handleRemoveFromCart} = this.props;
        return(
            <div className="alert alert-info">
                {cartItems.length===0?"Cart is empty" : <div>You have {cartItems.length} items in the basket.</div>}
                {cartItems.length>0 &&
                    <div>
                    {cartItems.map(item=>
                    
                    <div className="row mt-4" key={item.id}>
                        <div className="col-md-4">
                            <img style={{width:"70px"}}  src={process.env.PUBLIC_URL +`/images/${item.name}.png`}></img> 
                            <p style={{fontSize:"small"}}>{item.name}</p> 
                                                    
                        </div>

                        <div className="col-md-2">
                            <b>{formatEuro(item.price * item.quantity)}</b> <br/>
                            <b>{GetDollar(item.price * item.quantity)}</b>
                        </div>
                        
                        <div className="col-md-6">
                            <button onClick={(e)=> handleIncrementToCart(e,item)}>+</button>
                            <button onClick={(e)=> handleDecrementToCart(e,item)}>-</button>                            
                            Qty: {item.quantity} <br/><br/>
                            <button className="btn btn-link" onClick={(e)=> handleRemoveFromCart(e,item)}>Remove</button>
                        </div>
                    </div>
                    )}
                        
                        <hr></hr>
                        <div className="row" >
                            <div className="col-md-5 text-success">
                            <b>Total :</b>  {formatEuro(cartItems.reduce((a,c) => a + c.price * c.quantity, 0))} <br/>
                                
                            </div>
                            <div className="col-md-2 text-left text-success">
                                {GetDollar(cartItems.reduce((a,c) => a + c.price * c.quantity, 0))}
                            </div>
                            <div className="col-md-5">                                
                                <Link to="/CheckOut">Check Out</Link>
                            </div>
                        </div>
                    </div>

                        
                
                    
                }
            </div>
        )
    }
}

export default Basket;