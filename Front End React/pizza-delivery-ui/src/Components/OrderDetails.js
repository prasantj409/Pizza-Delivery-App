import React, { Component } from 'react';

class OrderDetails extends Component {
    render() {

        const {order,index} = this.props;
        console.log(order);
        return (
            // <div key={ index}>
            //     {order.created_at}
            // </div>
            <div>Hello</div>
        );
    }
}

export default OrderDetails;