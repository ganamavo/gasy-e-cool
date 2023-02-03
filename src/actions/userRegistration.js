import axios from 'axios';
import { setIsLoggedIn, setIsRegistered, setUserInfo } from '../slices/userRegistration';
import { setUsers } from '../slices/users';

export const signUp = (params, setError) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('http://localhost:4000/users', params);
            dispatch(setIsRegistered(true));
            dispatch(setUsers(res.data));
        } catch (error) {
            setError(error?.response?.data?.msg);
            dispatch(setIsRegistered(false));
        };
    };
};

export const logIn = (params) => {
    return async(dispatch) => {
        try {
            await axios.post('http://localhost:4000/login', params);
            const res = await axios.get(`http://localhost:4000/users/${params.email}`);
            dispatch(setUserInfo(res.data));
            dispatch(setIsLoggedIn(true));
        } catch (error) {
            dispatch(setUserInfo(null));
            dispatch(setIsLoggedIn(true));
        }
    };
};
