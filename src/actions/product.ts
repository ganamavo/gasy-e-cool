import axios from 'axios';
import { setProducts } from '../slices/product';
import { User } from './../types/User';

export const addProduct = (params: User, setError: (err: string) => void) => {
    return async(dispatch: any) => {
        try {
            const res = await axios.post('http://localhost:4000/products', params);
            dispatch(setProducts(res.data))
        } catch (error: any) {
            setError(error?.response?.data?.msg);
        };
    };
};