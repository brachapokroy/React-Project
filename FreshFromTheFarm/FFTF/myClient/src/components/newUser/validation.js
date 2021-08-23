const isRequired = (value) => {
    if (value == " ") {
        return false;
    }
    return true;

}

const isValidMail = (emailValue) => {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (pattern.test(emailValue));

}
const checkMail = (emailValue) => {
    if (!isRequired(emailValue)) {
        return "this field is required";
    }
    if (!isValidMail(emailValue)) {
        return "this email is not valid";
    }
    return null;
}

const checkName = (nameValue) => {
    if (!isRequired(nameValue)) {
        return "this field is required";
    }
    if (!validName(nameValue)) {
        return "this name is not valid";
    }
    return null;
}

const validName = (name) => {
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);

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


const validPassword = (password1) => {
    var size = 0,
        key;
    for (key in password1) {
        size++;
    }
    return size >= 6;

}


const checkPassword = (password1, password2) => {
    if (!isRequired(password1) || !isRequired(password2)) {
        return "this field is required";
    }
    if (password1 !== password2) {
        return "couldn't confirm your password";
    }
    if (!validPassword(password1)) {
        return "the password must contain at least 6 characters";
    }
    return null;

}

const validateInputValues = (values) => {
    const errors = {};

    const nameError = checkName(values.name);
    if (nameError != null) {
        errors.name = nameError;
    }
    const emailError = checkMail(values.email);
    if (emailError != null) {
        errors.email = emailError;
    }
    const IDError = checkId(values.id);
    if (IDError != null) {
        errors.id = IDError;
    }
    const passwordError = checkPassword(values.password, values.password2);
    if (passwordError != null) {
        errors.password2 = passwordError;
    }

    return errors;

}
export { validateInputValues };