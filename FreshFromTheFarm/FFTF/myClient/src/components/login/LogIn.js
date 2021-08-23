
import NewUser from './../newUser/NewUser'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from '../../store/actions';
import './LogIn.css'
import { timeout } from 'q';
function mapStateToProps(state) {
    return {
        shop: state.shopReducer.productsList
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadProductToList: (product) => dispatch(actions.addProductToList(product)),
    deleteProductFromList: (product) => dispatch(actions.deleteProductFromList(product)),

})

export default connect(mapStateToProps, mapDispatchToProps)(function LogIn({ props, shop, changeStatus, onUpdate,loadProductToList }) {
    const [formValues, setFormValues] = useState({
        password: "", email: "", errors: {}
    });

    const updateFormValues = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        let logData={
            email:formValues.email,
            password:formValues.password
        }
        var loginUser = await getData(logData)
        console.log("new user"+loginUser)
        const erroeValues = validateInputValues(formValues, loginUser);
        setFormValues({
            ...formValues,
            errors: erroeValues
        });

        const isNotError = Object.keys(erroeValues).length == 0;
        if (isNotError) {
            localStorage.setItem('name', loginUser.name);
            localStorage.setItem('email', loginUser.email);
            localStorage.setItem('password', loginUser.password);
            loadProductToList(loginUser.currentShopping);
            localStorage.status = true;

            setFormValues({
                password: "", email: "", errors: {

                }

            });

        }


        function isRequired(value) {
            if (value == "") {
                return false;
            }
            return true;
        }
        function checkValidMail(Value, loginUser) {
            if (!(isRequired(Value))) {
                return "this field is required";
            }
            else if (!(loginUser)) {
                return "The username or password is incorrect";
            }
            else {

                return null
            }
        }


        function checkValidPassword(Value, loginUser) {
            if (!(isRequired(Value))) {
                return "this field is required";
            }
            else if (!(loginUser)) {
                return "The username or password is incorrect";
            }


            else {

                return null
            }
        }



        function validateInputValues(values, loginUser) {
            const errors = {};
            const emailError = checkValidMail(values.email, loginUser);
            if (emailError != null) {
                errors.email = emailError;
            }

            const passwordError = checkValidPassword(values.password, loginUser);
            if (passwordError != null) {
                errors.password = passwordError;
            }
            return errors;
        }
    }

    const getData  = async(logData)=>{
        let response = await fetch ('http://localhost:27017/users/logUser',{
        method:'PUT',
        headers:{'content-type':'application/json',
        },
        body:JSON.stringify(logData),
        
    });
        let result1= await response.text();
        if(!(result1=="The username or password is incorrect")){
            var string = JSON.parse(result1);
            return string
        }
       
     }
       



    return (
        <div>
            <div className='container1'>
                <div className="row1">
                    <div className="colum">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
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
                                <label className='form-label' htmlFnpm or="id-input">PASSWORD
                            </label>
                                <div className="span">
                                    <input className="form-control"
                                        onChange={updateFormValues}
                                        value={formValues.password}
                                        password="pasword-input"
                                        type="password"
                                        name="password" />
                                    {formValues.errors.password && <pl className="errorMessage">{formValues.errors.password}</pl>}
                                </div>
                            </div>

                            <button className="btn_Submit" type="submit">submit</button>
                            <div className="unvisible">"
                                "</div>
                            <Link to="/NewUser"><button className="Mybtnl">new user</button></Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    )
}

)

