/* import React, { useEffect, useState } from 'react';
function checkForm(){
const [productsList, setProductsList] = useState([])
function getData() {
    fetch('dataBase/DB.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((messages) => {
            setProductsList(messages["Product"])
        })

}
useEffect(getData, []);

const isRequired = (value)=>{
    if(value==" "){
         return false;
        }
    return true;
    
}
const isValidMail=(email)=>{
    var pattern = /^\(?([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/;
    return (pattern.test(email)) ;
   
}

const checkMail=(emailValue)=>{
    if(!isRequired(emailValue)){
       return "this field is required";
    }
    if(isValidMail(emailValue)){
        return "this email is not valid";
     }
    return null;
}


const validateInputValues=(values)=>{
    const errors={};

    
    const emailError=checkMail(values.email);
    if(emailError!=null){
        errors.email=emailError;
    }
    
    /* const passwordError=checkPassword(values.password1,values.password2);
    if(passwordError!=null){
        errors.password2=passwordError;
    } */
/*   
    return errors;
    
}





export{validateInputValues} ;
 */ 