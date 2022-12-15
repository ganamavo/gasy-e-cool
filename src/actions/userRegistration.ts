import axios from 'axios';
import { setIsLoggedIn, setIsRegistered, setUserInfo } from '../slices/userRegistration';
import { setUsers } from '../slices/users';
import { User } from './../types/User';

export const signUp = (params: User, setError: (err: string) => void) => {
    return async(dispatch: any) => {
        try {
            const res = await axios.post('http://localhost:4000/users', params);
            dispatch(setIsRegistered(true));
            dispatch(setUsers(res.data));
        } catch (error: any) {
            setError(error?.response?.data?.msg);
            dispatch(setIsRegistered(false));
        };
    };
};

export const logIn = (params: any) => {
    return async(dispatch: any) => {
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
