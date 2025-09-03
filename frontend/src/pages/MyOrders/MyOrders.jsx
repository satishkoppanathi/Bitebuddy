import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, {
                headers: { token }
            });

            const result = response.data.data;

            // Only set if it's a valid array
            if (Array.isArray(result)) {
                setData(result);
            } else {
                console.warn("Expected array, got:", result);
                setData([]);
            }
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setData([]);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, url]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="parcel" />
                            <p>
                                {order.items.map((item, i) => 
                                    `${item.name} x ${item.quantity}${i !== order.items.length - 1 ? ', ' : ''}`
                                )}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Trake order</button>
                        </div>
                    ))
                ) : (
                    <p>Loading or No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
