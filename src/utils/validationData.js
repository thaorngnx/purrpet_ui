//validate email
export const validateEmail = (email) => {
    //email regex can have 1 or 2 dots in the domain name
    const emailRegex = /^[a-zA-Z0-9]+([.]{1,2}[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.]{1,2}[a-zA-Z0-9]+)*[.]{1}[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

//validate password: min 8 characters, 1 special character
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}$/;
    return passwordRegex.test(password);
}

//validate name: min 2 characters, no special characters
export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]{2,}$/;
    return nameRegex.test(name);
}

//validate phone number: 10 digits, no special characters
export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

//validate otp: 4 digits, no special characters
export const validateOtp = (otp) => {
    const otpRegex = /^[0-9]{4}$/;
    return otpRegex.test(otp);
}