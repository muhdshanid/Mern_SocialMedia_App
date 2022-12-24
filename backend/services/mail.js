
export const generateOTP = () => {
    let OTP = ""
    for(let i = 0; i <=3 ; i ++){
        let randomValue = Math.round(Math.random()*9)
        OTP = OTP+randomValue
    }
    return OTP
}