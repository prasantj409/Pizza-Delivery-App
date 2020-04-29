import React, { Component } from 'react';


class NavBar extends Component {

    handleLogOut = e =>{
        localStorage.removeItem("login");
        window.location = "/Login";
    };
    render() {
        console.log("User Status" + localStorage.getItem("login"))
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a className="navbar-brand" href="/"><img src={process.env.PUBLIC_URL +`/images/Margherita.png`} alt="" style={{width:"70px"}} /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-right" id="navbarSupportedContent">
        <div  className="navbar-nav ml-auto ">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link text-light" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/PizzaHome">Menu</a>
            </li>
            {localStorage.getItem("login") !=null ? 
                <li className="nav-item">
                    <a className="nav-link text-light" href="/OrderHistory">Order History</a>
                </li>
                : ""                
            }
            
            {localStorage.getItem("login") !=null ? 
                <li className="nav-item">
                    <a className="nav-link text-light" href="#">Hello Admin</a>
                </li>
                :
                <li className="nav-item">
                    <a className="nav-link text-light" href="/Login">Login</a>
                </li>
            }

            {localStorage.getItem("login") !=null ? 
                <li className="nav-item">
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleLogOut} >Logout</button>
                </li>
                : ""
                
            }

            
          </ul>
          </div>
        </div>
      </nav>
        );
    }
}

export default NavBar;