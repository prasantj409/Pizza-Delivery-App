import React, { Component } from 'react';
import NavBar from './NavBar';
import OrderDetails from './OrderDetails';
import { formatEuro, GetDollar } from '../util';
import './CheckOut.css';

class OrderHistory extends Component {

    constructor(props)
    {   if(localStorage.getItem("login") ===null)
        {
            window.location = "/Login";
        }
        super(props);
        this.state = { OrderData : [], displayLoader : false, }
        
    }

    componentDidMount()
    {
        this.setState({displayLoader:true});
        fetch('https://safe-lake-22225.herokuapp.com/api/OrderHistory')
        .then(res => res.json())
        .then((data) => {
        this.setState({OrderData : data})
        this.setState({displayLoader:false});
        })
        .catch(console.log)    

        console.log(localStorage.getItem("cartItems"));    
        
    }

    render() {
        const {OrderData,displayLoader} = this.state;

        

        const getTotalPrice = pizzas =>{
            let totalPrice = 0; 
            pizzas.map(pizza=>{
                totalPrice = totalPrice + pizza.price * pizza.pivot.quantity;
            })

            return totalPrice;
        }

        const abc = OrderData.map(item=>
                    
            <tr>
                            <td>{item.id}</td>
                            <td>{new Date( item.created_at).toLocaleDateString()}</td>
                            <td>{item.customer.fname}</td>
                            <td>{item.customer.lname}</td>
                            <td>{item.customer.phone}</td>
                            <td>{item.customer.email}</td>
                            <td>{item.customer.address1}</td>
                            <td>{item.customer.city}</td>                           
                            <td>                               
                                {item.pizza.map(pizza=>( 
                                    <div>
                                        <div>{pizza.name}, Qty: {pizza.pivot.quantity}, 
                                            Price: <b>{formatEuro( pizza.price * pizza.pivot.quantity)}</b>
                                            
                                        </div>
                                        {/* <div><b>Qty:</b> {pizza.pivot.quantity}</div>
                                        <div><b>Price:</b> {formatEuro( pizza.price * pizza.pivot.quantity)}</div> */}
                                    </div>
                                ))}
                    
                            </td>
                            <td> {formatEuro(item.delivery_cost)} </td>   
                                    <td><b>{formatEuro(item.delivery_cost + getTotalPrice(item.pizza))}<br/>
                                    {GetDollar(item.delivery_cost + getTotalPrice(item.pizza))}</b></td>                         
                        </tr>
            
            )
        
        return (            
            <div>
                <NavBar></NavBar>
                <h1>Order History</h1>
                
                
                <div id="loader" className={displayLoader ? 'show' : 'hidden'}>
                    <img src={process.env.PUBLIC_URL +`/images/smart_loading.gif`} style={{width:"100px"}}/>
                </div>
                <table className="table" style={{width:"100%"}}>
                    <tr>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>                        
                        <th>Order Detail</th> 
                        <th>Del. Cost</th>
                        <th>Total Price</th>                       
                    </tr>
                    {abc}
                </table> 
                  
            </div>
        )
    }
}

export default OrderHistory;