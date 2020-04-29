import React, { Component } from 'react';
import { formatEuro, GetDollar } from '../util';

class Pizzas extends Component{

    
   render()
   { 
    const {pizza,handleAddToCart} = this.props;      
        const productItems =  this.props.pizzas.map(pizza=>(        
        
            <div key={ pizza.id}  className = "col-md-4 mt-4">
                <div >
                    <div className = "col-md-12">
                        <img style={{width:"200px",height:"150px"}}  src={process.env.PUBLIC_URL +`/images/${pizza.name}.png`}></img>
                        <p>{pizza.name}</p>                    
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-6">
                        <b>{formatEuro(pizza.price)}</b>
                    </div>
                    <div className = "col-md-6">
                        <b>{GetDollar(pizza.price)}</b> <br/>
                    </div>
                </div>
                <div className="row">
                    <div className = "col-md-12">
                        <button className="btn btn-secondary"
                            onClick={(e)=>this.props.handleAddToCart(e,pizza)}>  Add</button> 
                    </div>
                </div>                
            </div> 
                  
        ))

       return(
        <div className="row">
            {productItems}      
        </div>
       )
   }
}

export default Pizzas;

