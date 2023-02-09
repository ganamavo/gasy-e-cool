import axios from "axios";
import { setShops, setShouldRefreshShopsData } from "../slices/shop";

export const addShop = (params, setError) => {
    return async(dispatch) => {
        try {
            await axios.post('http://localhost:4000/online-shop', params);
            dispatch(setShouldRefreshShopsData(true));
        } catch (error) {
            setError(error?.response?.data?.msg);
        };
    };
};

export const getAllShops = (setError) => {
    return async(dispatch) => {
        try {
            const res = await axios.get('http://localhost:4000/online-shop/all');
            dispatch(setShops(res.data));
        } catch (error) {
            setError(error?.response?.data?.msg);
        };
    };
};
