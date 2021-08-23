import React, { useState } from 'react'
import { validateInputValues } from './validation';
import './NewUser.css';
import Modal from 'react-bootstrap/Modal';

function NewUser(props) {
    const [formValues, setFormValues] = useState({
        id: "", name: "", email: "", password: "", password2: "", errors: {}
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


        const addUser = async (name, email, id, password) => {
            let newUser = {
                name: name,
                id: id,
                email: email,
                password: password,
                confirmedPassword:password

            }

           let response= await fetch('http://localhost:27017/users/createUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

        };


        const isNotError = Object.keys(erroeValues).length == 0;
        if (isNotError) {

            addUser(formValues.name, formValues.email, formValues.id, formValues.password);
            localStorage.name = formValues.name;
            localStorage.email = formValues.email;
            localStorage.status = true;
            handleShow();
            props.onUpdate();
            setFormValues({
                id: "", name: "", email: "", password: "", password2: "", errors: {

                }
            });

        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>You have been added successfully to our users</Modal.Title>
                </Modal.Header>
                <Modal.Body>Welcome to our shoppimng site!
                now you can start your shop for the best fruit and vegtables
        </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        OK
          </button>

                </Modal.Footer>
            </Modal>


            <div className='container1'>
                <div className="row1">
                    <div className="colum">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="name-input"> ENTER NAME
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.name}
                                        id="name-input"
                                        type="text"
                                        name="name" />
                                    {formValues.errors.name && <pl className="errorMessage">{formValues.errors.name}</pl>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="email-input">Enter Email Adress
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.email}
                                        id="email-input"
                                        type="text"
                                        name="email" />
                                    {formValues.errors.email && <pl className="errorMessage">{formValues.errors.email}</pl>}
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="id-input">Enter YOUR ID
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.id}
                                        id="id-input"
                                        type="text"
                                        name="id" />
                                    {formValues.errors.id && <pl className="errorMessage">{formValues.errors.id}</pl>}
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="id-input">PASSWORD
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.password1}
                                        password1="pasword-input"
                                        type="password"
                                        name="password" />
                                    {formValues.errors.password2 && <pl className="errorMessage">{formValues.errors.password2}</pl>}
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="id-input">CONFIRM YOUR PASSWORD
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.password2}
                                        password2="password-input"
                                        type="password"
                                        name="password2" />
                                    {formValues.errors.password2 && <pl className="errorMessage">{formValues.errors.password2}</pl>}
                                </div>
                            </div>
                            <button className="btn_Submit" type="submit">submit</button>
                        </form>
                    </div>
                </div>
                <div class="alert alert-success" role="alert"></div>
            </div>

        </>


    )





}
export default NewUser