import React, { Component } from 'react';
import NavBar from './NavBar';

const formValid = (formErrors, user, password) =>{
    let valid = true;

    Object.values(formErrors,user,password).forEach(val=> {
        val.length > 0 && (valid = false);
    });

    if(user === null || password == null)
        valid = false

    return valid;
};

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = { 
            user : null,
            password : null,            
            formErrors : {user : "", password:""},
            postMessage : null,
            login : null
         }
        
    }

    handleLogin = e =>{

        e.preventDefault();
        const {user, password} = this.state;
        const formErrors = this.state.formErrors;
        if(formValid(formErrors, user, password))
        {
            if(user !== null && password !== null && user.toLowerCase() === "admin" && password === "1234")
            {            
                this.setState({login : "Success"});
                localStorage.setItem("login","Success");
                window.location="/OrderHistory";
            }
            else
            this.setState({login : "Fail"});

        }
    }

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case "user":
                formErrors.user = 
                value.length == 0  
                ? "user name required" 
                : "";
                break;
            case "password":
                formErrors.password = 
                value.length == 0 
                ? "password required" 
                : "";
                break;
            
            default:
                break;
        }

        this.setState({formErrors,[name] : value});
    };


    render() {
        const {login} = this.state;
        return (
                
            <div>
                <NavBar></NavBar><br/><br/>
            <div className="row justify-content-center">
                <div class="col-12 text-center text-danger">
                    {login == "Fail" ? "Invalid User and/or password" : ""}
                </div>
            </div>
                <div className="row justify-content-center">
            <div class="col-12 col-md-2">
                USERNAME / EMAIL
            </div>
            <div className="col-12 col-md-4">
                <input type="text" className="form-control" name="user" placeholder="User ID" onChange={this.handleChange}/>
                
            </div>
        </div>
        <br/>
        <div className="row justify-content-center">
            <div className="col-12 col-md-2">
                PASSWORD
            </div>
            <div className="col-12 col-md-4">
                <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}/>                
            </div>
        </div>
        <br/>     
        
        <div className="row justify-content-center">
            <div className="col-12 col-md-2">               
            </div>
            <div className="col-12 col-md-2">             
                
                <button className="btn btn-secondary btn-block" onClick={this.handleLogin} >LOG IN</button>
            </div>
            
            <div className="col-12 col-md-2">
                <div className="d-block d-sm-block d-md-none" > <br /></div>
                <a href="#" className="btn  btn-block" style={{backgroundColor:"#73C01C" ,color:"white"}}>REGISTER</a> 
                
            </div>
        </div>
        <br />
        
            </div>
        );
    }
}

export default Login;