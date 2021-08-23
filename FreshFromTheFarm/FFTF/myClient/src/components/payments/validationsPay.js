const isRequired = (value) => {
    if (value == " ") {
        return false;
    }
    return true;

}




const validId = (id) => {

    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;

}

const checkId = (IDValue) => {
    if (!isRequired(IDValue)) {
        return "this field is required";
    }
    if (!validId(IDValue)) {
        return "this ID is not valid";
    }
    return null;
}

/*  const iscreditcard = (creditCardNumber) => {

    var cardno1 = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var cardno2 = /^(?:3[47][0-9]{13})$/;
    var cardno3 = /^(?:5[1-5][0-9]{14})$/;

    if (creditCardNumber.match(cardno1) || creditCardNumber.match(cardno2) || creditCardNumber.match(cardno3)) {
        return true;
    }
    else {

        return false;


    }
} */

const iscreditcard = (creditCardNumber) => {
if(creditCardNumber==" "){return false;}
return true;
}



const checkcredit = (creditValue) => {
    if (!isRequired(creditValue)) {
        return "This field is required";
    }
    if (!iscreditcard(creditValue)) {
        return "the credit card number is incorrect"
    }
}


const isyear=(year)=>{
    var reg_exp='^[0-9]{2}$';
    if(year.match(reg_exp) && Number(year)>20) return true;
    else return false;
}


const checkyear = (yearValue) => {
    if (!isRequired(yearValue)){
        return "This field is required";
    }
    if (!isyear(yearValue)){
        return "this  year is incorrect"
    }
}


const ismonth=(month)=>{
    let reg_exp='^[0-9]{2}$';
    if(month.match(reg_exp) && Number(month)<13 && Number(month)>0) return true;
    else return false;
}

const checkNmonth= (monthValue) => {
    if (!isRequired(monthValue)){
        return "This field is required";
    }
    if (!ismonth(monthValue)){
        return "The month is incorrect"
    }
}

const isdigit=(digits)=>{
    let reg_exp='^[0-9]{3}$';
    if(digits.match(reg_exp)) return true;
    else return false;
}

const checkdigit = (digitValue) => {
    if (!isRequired(digitValue)){
        return "This field is required";
    }
    if (!isdigit(digitValue)){
        return "the three back digits are incorrect"
    }
}


const validateInputValues = (values) => {
    const errors = {};


    const errorsCredit = checkcredit(values.creditCardNumber);
    if (errorsCredit != null){
        errors.creditCardNumber=errorsCredit;
    }

    const errorsyear = checkyear(values.expireYear);
    if (errorsyear != null){
        errors.expireYear=errorsyear;
    }
    const errorsmonth= checkNmonth(values.expireMonth); 
    if (errorsmonth!= null){
        errors.expireMonth=errorsmonth;
    }
    const IDError = checkId(values.id);
    if (IDError != null) {
        errors.id = IDError;
    }
    const errorsdigit= checkdigit(values.threeBackDigits);
    if (errorsdigit != null){
        errors.threeBackDigits=errorsdigit;
    }

    return errors;

}
export { validateInputValues };