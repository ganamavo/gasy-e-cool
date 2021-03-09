import { createContext, useReducer, useEffect } from 'react';

interface StateNames {
    loading: boolean;
    allCountries?:[]; 
}
   
const initialValues: StateNames = {
    loading: true,
    allCountries: [], 
}
  
type Action = { type: "GET_COUNTRIES", allCountries: []}  
function reducer(state: StateNames, action: Action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return { loading: false, allCountries: action.allCountries}
        default:
            return state;
    }
}

const GlobalContext = createContext(initialValues);

const GlobalProvider: React.FC = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, initialValues);
    const fetchCountries = async () => {
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        const countryData = await res.json()
        dispatch({type: "GET_COUNTRIES", allCountries: countryData})
    } 

    useEffect(() => {
         fetchCountries()
    }, [])

    

    return <GlobalContext.Provider value={{
        loading: state.loading,
        allCountries: state.allCountries
    }}>
        {children} 
    </GlobalContext.Provider>
}
export { GlobalContext, initialValues, GlobalProvider }