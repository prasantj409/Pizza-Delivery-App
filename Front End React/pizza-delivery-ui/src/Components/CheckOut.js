import React, { Component } from 'react';
import NavBar from './NavBar';
import './CheckOut.css';
import { formatEuro, GetDollar } from '../util';
import { Link} from 'react-router-dom'

const formValid = (formErrors, fname, lname, phone, address) =>{
    let valid = true;

    //Validate Form Inputs
    Object.values(formErrors).forEach(val=> {
        val.length > 0 && (valid = false);
    });

    //Validate Required fields
    if(fname ===null || lname === null || phone===null || address===null)
    {
        valid=false;
    }

    return valid;
};

const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

class CheckOut extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = { 
            fname : null,
            lname : null,
            phone : null,
            email : null,
            address1 :null,
            city : null,
            state : null,
            zip : null,
            pizzas : [],
            formErrors : {fname : "", lname:"",phone:"",email:"",address1:"",city:""},
            postMessage : null,
            displayLoader : false,
            errorMessage : null,
            delivery_cost : 5
         }
        
    }
    componentDidMount()
    {
        
        if(localStorage.getItem("cartItems") !='')
        {            
            //Get Cart Items
            const orders =  JSON.parse(localStorage.getItem("cartItems"));             
            this.setState({pizzas : orders});
            console.log("state="+ this.state.pizzas);            
        }
    }

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case "fname":
                formErrors.fname = 
                value.length < 3 && value.length > 0 
                ? "minimum 3 character requires" 
                : "";
                break;
            case "lname":
                formErrors.lname = 
                value.length == 0 
                ? "last name required" 
                : "";
                break;
            case "phone":
                formErrors.phone = 
                value.length == 0 > 0 
                ? "phone required" 
                : "";
                break;
            case "email":
                formErrors.email = 
                value.length > 0 && !regEmail.test(value) 
                ? "invalid email" 
                : "";
                break;
            case "address1":
                formErrors.address1 = 
                value.length == 0 > 0 
                ? "address required" 
                : "";
                break; 
            case "address1":
                formErrors.address1 = 
                value.length == 0 > 0 
                ? "address required" 
                : "";
                break;            
            default:
                break;
        }

        this.setState({formErrors,[name] : value});
    };

    handleSubmit = e=> {
        e.preventDefault();
        this.setState({displayLoader:true});

        const {formErrors, fname, lname, phone, address1} = this.state;

        if(formValid(formErrors, fname, lname, phone, address1))
        {
            //Create JSON to Submit Order
            var obj= {};
            obj.fname = this.state.fname;
            obj.lname=this.state.lname;
            obj.phone=this.state.phone;
            obj.email = this.state.email;
            obj.address1 = this.state.address1;
            obj.city=this.state.city;
            obj.state=this.state.state;
            obj.zip = this.state.zip;
            obj.delivery_cost = this.state.delivery_cost;
            obj.pizza = [];

            this.state.pizzas.forEach(pizza=>{
                obj.pizza.push({pizza_id : pizza.id,
                    quantity : pizza.quantity,
                    total_price : pizza.quantity * pizza.price})
            });

            console.log(JSON.stringify(obj));

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };

            //Call Laravel API to submit order
            fetch('https://safe-lake-22225.herokuapp.com/api/PlaceOrder', requestOptions)
                .then(response => response)
                .then(data => { this.setState({ postMessage: data.status }) 
                this.setState({displayLoader:false}); 
                if(data.status == 200)
                    localStorage.removeItem("cartItems");              
                });

                console.log(this.state.postMessage);
        }
        else
        {
            this.setState({displayLoader:false}); 
        }
    };
    
    render() {
        const {formErrors,pizzas,displayLoader,delivery_cost} = this.state;
        let totalPrice = 0;
        let totalCount = 0;
        if(pizzas != null){
        pizzas.forEach(pizza=>{
            totalPrice = totalPrice + pizza.price * pizza.quantity;
            totalCount = totalCount + pizza.quantity;
        });
    }

        return (
            
            <div class="Container">
                <NavBar></NavBar>
                <div id="loader" className={displayLoader ? 'show' : 'hidden'}>
                    <img src={process.env.PUBLIC_URL +`/images/smart_loading.gif`} style={{width:"100px"}}/>
                </div>
                <br/>
                <form>
                <div class="row justify-content-center">
                    <div className="col-md-4">
                    <div class="row">                            
                            <div class="col-12 text-center">
                                <h4>Contact Details</h4>
                            </div>
                        </div>
                        <br/>
                        <div class="row"> 
                                                   
                            <div class="col-11">
                               <input type="text" name="fname" placeholder="First Name"  className="form-control" onChange={this.handleChange}/>
                                {formErrors.fname.length>0 && ( 
                                <span className="errorMessage">{formErrors.fname}</span>
                                )}
                            </div>
                            <div className="col-md-1"><span className="errorMessage">*</span></div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="lname" placeholder="Last Name" className="form-control" onChange={this.handleChange}/>
                                {formErrors.lname.length>0 && ( 
                                <span className="errorMessage">{formErrors.lname}</span>
                                )}
                            </div>
                            <div className="col-md-1"><span className="errorMessage">*</span></div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="phone" placeholder="Phone Number" required className="form-control" onChange={this.handleChange}/>
                                {formErrors.phone.length>0 && ( 
                                <span className="errorMessage">{formErrors.phone}</span>
                                )}
                            </div>
                            <div className="col-md-1"><span className="errorMessage">*</span></div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="email" placeholder="Email" className="form-control" onChange={this.handleChange}/>
                                {formErrors.email.length>0 && ( 
                                <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                        </div>
                        
                        <br/>
                        <div class="row">
                            <div className="col-md-12 text-center">
                                <h4>Address Details</h4>
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="address1" placeholder="Address" className="form-control" onChange={this.handleChange}/>
                                {formErrors.address1.length>0 && ( 
                                <span className="errorMessage">{formErrors.address1}</span>
                                )}
                            </div>
                            <div className="col-md-1"><span className="errorMessage">*</span></div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="city" placeholder="City" className="form-control" onChange={this.handleChange}/>
                                {formErrors.city.length>0 && ( 
                                <span className="errorMessage">{formErrors.city}</span>
                                )}
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" placeholder="State" name="state" className="form-control" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11">
                                <input type="text" name="zip" placeholder="Zip" className="form-control" onChange={this.handleChange}/>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 text-center ckeckout-container">
                        <br/><br/><br/><br/>
                        <div class="row">                            
                            <div class="col-md-5">
                                <b>No. of Pizzaz :</b>
                            </div>
                            <div class="col-md-2">
                                {totalCount}
                            </div>
                            <div class="col-md-2">
                                
                            </div>
                        </div>
                       
                        <br/>
                        <div class="row">                            
                            <div class="col-md-5">
                                <b>Price : </b>
                            </div>
                            <div class="col-md-2">
                                {formatEuro(totalPrice)}
                            </div>
                            <div class="col-md-2">
                                {GetDollar(totalPrice)}
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-5">
                                <b>Delivery Cost :</b>
                            </div>
                            <div class="col-md-2">
                                {formatEuro(delivery_cost)}
                            </div>
                            <div class="col-md-2">
                            {GetDollar(delivery_cost)}
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-5">
                                <b>Total Price : </b>
                            </div>
                            <div class="col-md-2 text-success">
                                {formatEuro(totalPrice + delivery_cost)}
                            </div>
                            <div class="col-md-2 text-success">
                                {GetDollar(totalPrice + delivery_cost)}
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-5">
                            <button onClick={this.handleSubmit} className="btn btn-secondary" disabled={this.state.postMessage == 200 ? true : false } >Place Order</button>
                            </div>
                            <div class="col-md-4">
                            <Link to="/PizzaHome">Back to Menu</Link>
                            </div>
                        </div>
                        <br/>
                        <div class="row">                            
                            <div class="col-md-11 message-color">
                            {this.state.postMessage == 200 ? "Order Placed Successfully" : (this.state.postMessage == 500 ? "Unable to place order" : "")}
                            </div>
                        </div>                      
                        
                        
                    </div>
                
                </div>
                </form>
            </div>
        );
    }
}

export default CheckOut;