
import React, { useState, useEffect } from 'react'
import Home from '../home/Home'
import { Switch, Route, Link, BrowserRouter as Router, Redirect, withRouter } from 'react-router-dom'
import payment from '../payments/Payment';
import { connect } from 'react-redux';
import { actions } from '../../store/actions'
import './Cart.css'
import Product from '../product/product';
import { useHistory } from 'react-router-dom'
import { BiCreditCardAlt } from "react-icons/bi";



function mapStateToProps(state) {
    return {
        shop: state.shopReducer.productsList
    };
}

const mapDispatchToProps = (dispatch) => ({
    addProductToList: (product) => dispatch(actions.addProductToList(product)),
    deleteProductFromList: (product) => dispatch(actions.deleteProductFromList(product)),

})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Cart({ shop, addProductToList, deleteProductFromList, setList, onUpdate }) {
    const [cartSum, setCartSum] = useState(0);
    const [localStatus, setLocalStatus] = useState(true);
    useEffect(() => {
        if (localStorage.status == "false") {
            shop.map(function (item, i) {
                (deleteProductFromList(item))
            })
        }

        setLocalStatus(localStorage.status)
    }, [localStorage.status])


    let history = useHistory();
    const gotoPay = () => {
        history.push({
            pathname: '/payments',
            state: { cartSum: cartSum }
        })
    }

    useEffect(() => {
        let sum = 0;
        shop.map(function (item, i) {
            sum += (Number(item.quantity * item.price))
        })
        setCartSum(sum);
    }, [shop])


    function handleAddClick(item, price, quantity) {
        addProductToList(item);

    }

    function handleDeleteClick(item, price, quantity) {
        deleteProductFromList(item);

    }

    return (

        <div className="grid-container1">

            <h2>" "</h2>
            {shop.map(function (item, i) {
                return (<div className="grid-item1" ><Product picture={item.picture} name={item.name} price={item.price} totalWeight={item.quantity} quantity={item.quantity} ></Product>
                    <button className="btn2" onClick={() => { handleDeleteClick(item) }}>-</button>
                    <button className="btn2" onClick={() => { handleAddClick(item); }}>+</button>


                </div>)
            }
            )}

            <div className="sum"><h1>Subtotal: {cartSum.toFixed(1)}</h1></div>
            <button className="btn1" onClick={() => gotoPay()}>pay < BiCreditCardAlt /></button>




        </div>
    );
}))
