/* eslint-disable react-hooks/exhaustive-deps */
 
import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  //to store delivery information
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  // with this function we update the data 
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  //redirecting to place order page==>
  /* When the user clicks "Place Order":You stop the default page reload.

Go through all the food items.

For each item that the user added to cart (> 0 quantity):

Add it to an order list along with the quantity.

Print that list.*/


  const placeOrder = async (event) => {
    event.preventDefault();
    // now we have to call the api before calling we have to structured all the order data created in the api
    let orderItems = []; // this is an empty array to store the data
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);

      }
    })

    /* we generate order data
      and send this to api
      if success if statement executes */
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);



    }
    else {
      alert("Error coming");
    }
  }


  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()==0){
      navigate('/cart') 
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email adress' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div required className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
