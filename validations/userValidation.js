import validator from "validator"
export const isName=(name)=>{
    if(!name){
        return "Name is required"
    }
    if(typeof name !=="string"){
        return "Name must be a string"
    }
    if(!validator.isLength(name,{min:4,max:15})){
        return "Name must be between 4 and 15 characters"
    }
    if (!validator.isAlphanumeric(name)) {
        return "Name must contain only letters and numbers";
    }
    return true
}
export const isEmail=(email)=>{
    if(!email){
        return "Email is required"
    }
    if(typeof email !=="string"){
        return "Email must be a string"
    }
    if(!validator.isEmail(email)){
        return "Invalid email format"
    }

    return true
}
export const isPassword=(pass1,pass2)=>{
    if(!pass1){
        return "password is required"
    }
    if(!pass1 || !pass2){
        return "password and confirmation are required"
    }
    if(pass1!==pass2){
        return "Passwords dont match"
    }
    if (typeof pass1 !== "string" || typeof pass2 !== "string") {
        return "Passwords must be strings";
    }
    if(!validator.isStrongPassword(pass1)){
        return "Password must be at least 8 characters long, with at least 1 uppercase and lowercase letter, 1 number, and 1 symbol"
    }
    return true
}
const userValidation = {
  isName,
  isEmail,
  isPassword
};
export default userValidation;