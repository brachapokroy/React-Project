
import emailjs from 'emailjs-com'
import React, { useState } from 'react'
import Paypal from './../paypal/Paypal'
import { validateInputValues } from './validationsPay';
import './Payment.css';
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

import { Switch, Route, Link, useLocation } from 'react-router-dom'



export default function Payment(props, onUpdate) {
    const total = props.location.state.cartSum;
    let history = useHistory();

    const path = useLocation().pathname;
    const [effective, seteffective] = useState(path);
    const [formValues, setFormValues] = useState({
        id: " ", creditCardNumber: " ", expireYear: " ", expireMonth: " ", threeBackDigits: " ", errors: {}
    });

    const updateFormValues = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const erroeValues = validateInputValues(formValues);
        setFormValues({
            ...formValues,
            errors: erroeValues
        });
        const isNotError = Object.keys(erroeValues).length == 0;
        if (isNotError) {
            localStorage.status = false;

            handleShow();
            <Link to='./' className={effective === "/" ? "active" : "notActive"}>Home</Link>
            setFormValues({
                id: "", creditCardNumber: "", expireYear: "", expireMonth: "", threeBackDigits: "", errors: {}
            });

            let userData={
                email:localStorage.email,
                password:localStorage.password
            }
            
            fetch ('http://localhost:27017/users/payment',{
            method:'PUT',
            headers:{'content-type':'application/json',
            },
            body:JSON.stringify(userData),
            
        });
            
        
        }

    }
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        localStorage.name = " ";
        localStorage.email = " ";
        props.onUpdate();

        setFormValues({
            id: "", creditCardNumber: "", expireYear: "", expireMonth: "", threeBackDigits: "", errors: {}
        });
        <Link to='./' className={effective === "/" ? "active" : "notActive"}>Home</Link>

    }


    const handleShow = () => setShow(true);


    return (
        <>
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Thank's for buying here</Modal.Title>
            </Modal.Header>
            <Modal.Body>an email will be sent to you once your order is ready</Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={handleClose}>
                    Close
          </button>


            </Modal.Footer>
        </Modal>
        <div>
            <div className='container1'>
                <div className="row1">
                    <div className="colum">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                            </div>
                            <Paypal history={history} total={total} />
                            <label className='total' >total={total}
                            </label>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="id-input">Enter ID OF CREDIT CARD OWNER
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.id}
                                        id="id-input"
                                        type="text"
                                        name="id" />
                                    {formValues.errors.id && <p className="errorMessage">{formValues.errors.id}</p>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="creditCardNumberinput">CREDIT CARD NUMBER
                      </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.creditCardNumber}
                                        id="creditCardNumber-input"
                                        type="text"
                                        name="creditCardNumber" />
                                    {formValues.errors.creditCardNumber && <p className="errorMessage">{formValues.errors.creditCardNumber}</p>}
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="expireYear-input"> LAST 2 DIGITS EXPIRE YEAR
                      </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.expireYear}
                                        password="expireYear-input"
                                        type="text"
                                        name="expireYear" />
                                    {formValues.errors.expireYear && <p className="errorMessage">{formValues.errors.expireYear}</p>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="expireMonth-input">EXPIRE MONTH
                      </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.expireMonth}
                                        password="expireMonth-input"
                                        type="text"
                                        name="expireMonth" />
                                    {formValues.errors.expireMonth && <p className="errorMessage">{formValues.errors.expireMonth}</p>}
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="threeBackDigits-input">CVV
                      </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.threeBackDigits}
                                        password="threeBackDigits-input"
                                        type="text"
                                        name="threeBackDigits" />
                                    {formValues.errors.threeBackDigits && <p className="errorMessage">{formValues.errors.threeBackDigits}</p>}
                                </div>
                            </div>
                            <button className="btn_Submit" type="submit">submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

