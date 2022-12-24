import axios from "axios";
import { toast } from "react-hot-toast";
import { loginFail, loginStart, loginSuccess } from "./userReducer";

const notifySuccess = msg => toast.success(msg)
  const notifyError = msg => toast.error(msg)
export const login = async (dispatch,user) => {
    dispatch(loginStart())
    try {
        const {data} = await axios.post(`http://localhost:5000/api/user/login`,user)
        dispatch(loginSuccess(data))
        notifySuccess("LoggedIn Successfully")
    } catch (error) {
        dispatch(loginFail())
        notifyError("Invalid email or password")
    }
}
export const verifyEmail = async (dispatch,user) => {
    dispatch(loginStart())
    try {
        const {data} = await axios.post(`http://localhost:5000/api/user/verify-email`,user)
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail())
    }
}

export const signup = async (dispatch,user) => {
    dispatch(loginStart())
    try {
        const {data} = await axios.post(`http://localhost:5000/api/user/create-user`,user)
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail())
    }
}