/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './Department.css'
import { Switch, Route, Link } from 'react-router-dom'
import Product from '../product/product';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { actions } from '../../store/actions';
import { useHistory } from 'react-router-dom'



function mapStateToProps(state) {
    return {
        shop: state.shopReducer.productsList
    };
}

const mapDispatchToProps = (dispatch) => ({
    addProductToList: (product) => dispatch(actions.addProductToList(product)),
    deleteProductFromList: (product) => dispatch(actions.deleteProductFromList(product)),

})

export default connect(mapStateToProps, mapDispatchToProps)(function Department({ title, addProductToList, deleteProductFromList }) {

    const [productsList, setProductsList] = useState([]);
    let history = useHistory();
    const getProducts  = async()=>{
        let response = await fetch ('http://localhost:27017/products/allProducts'
    );
        setProductsList(await response.json());
        }
        useEffect(async () => { await getProducts(); }, []);

    useEffect(() => {
        if (localStorage.status == "false") {
            handleShow();
        }
    }, [localStorage.status])

    const [show, setShow] = useState(!localStorage.status);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>


        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to fresh from the farm!</Modal.Title>
            </Modal.Header>
            <Modal.Body>you must sign in to start shopping</Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={handleClose}>
                    Ok
                </button>

            </Modal.Footer>
        </Modal>

        <h3>'' </h3>

        <div className="grid-container">
        {productsList!==undefined && productsList.map(function (item, i)  {
                if (!item.department.localeCompare(title)) {
                    return (<div className="grid-item"><Product picture={item.picture} name={item.name} price={item.price} totalWeight={item.totalWeight}></Product>
                        <button disabled={localStorage.status == "false" ? true : false} className={localStorage.status == "true" ? "Mybtn1" : "btnUnable"} onClick={() => { addProductToList(item); }}>add to cart</button></div>)
                }
            }
            )
            }
        </div>

        </>

    );
})



