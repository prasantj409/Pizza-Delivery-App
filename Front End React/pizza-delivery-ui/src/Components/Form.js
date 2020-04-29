import React from 'react';
import NavBar from './NavBar';
import { Link} from 'react-router-dom'

const Form = () => (

    <form>
        <NavBar/>
        <div className = "Container">

            <div className="row justify-content-center mt-5">
                <div className="col-md-8 text-center">
                    <h1>Pizza Delivery React App</h1>
                </div>
            </div>            
            <div className="row justify-content-center">
                <div className="col-md-4">
                <img src={process.env.PUBLIC_URL +`/images/Veg Extravaganza.png`} style={{width:"100%"}}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <Link to="/PizzaHome">ORDER PIZZA</Link>
                </div>
            </div>
        </div>
    </form>

);

export default Form;