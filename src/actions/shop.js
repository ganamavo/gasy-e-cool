import axios from "axios";
import { setShops, setShouldRefreshShopsData } from "../slices/shop";

export const addShop = (params, setError) => {
    return async(dispatch) => {
        try {
            await axios.post('http://localhost:4000/online-shops', params);
            dispatch(setShouldRefreshShopsData(true));
        } catch (error) {
            setError(error?.response?.data?.msg);
        };
    };
};

export const getAllShops = (setError) => {
    return async(dispatch) => {
        try {
            const res = await axios.get('http://localhost:4000/online-shops/all');
            dispatch(setShops(res.data));
        } catch (error) {
            setError(error?.response?.data?.msg);
        };
    };
};

export const editSingleShop = (id, params) => {
    return async(dispatch) => {
        try {
            const res = await axios.put(`http://localhost:4000/online-shops/${id}`, params);
            dispatch(setShops(res.data));
        } catch (error) {
            return error?.response?.data?.msg;
        };
    };
};

export const deleteShop = (id) => {
    return async() => {
        try {
            await axios.delete(`http://localhost:4000/online-shops/${id}`);
        } catch (error) {
            return error?.response?.data?.msg;
        };
    };
};