import { createContext, useReducer, useEffect, useState } from 'react'; 
 interface Countries {
    name: string;
    flag: string; 
    topLevelDomain: string[];
    currencies: [
        {code: string; name: string; symbol: string}
    ];
    languages: [{
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName: string;
    }]; 
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[],
    capital: string;
    altSpellings: string[],
    region: string;
    subregion: string; 
    population: number; 
    latlng: string[];
    demonym: string;
    area: number;
    gini:number;
    timezones: number[];
    borders: string[];
    nativeName: string;
    numericCode: string; 
    cioc: string;
}
interface StateNames {
    loading: boolean;
    allCountries: Countries[];  
}
   
const initialValues: StateNames = {
    loading: true,
    allCountries: [],   
}
 
type Action = { type: "GET_COUNTRIES", allCountries: []};  
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
         fetchCountries();
    }, [])
 

    return <GlobalContext.Provider value={{
        loading: state.loading,
        allCountries: state.allCountries, 
    }}>
        {children} 
    </GlobalContext.Provider>
}
export { GlobalContext, initialValues, GlobalProvider }