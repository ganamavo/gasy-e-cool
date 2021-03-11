import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../components/GlobalState';
import Filters from '../components/Filters';
import { AllCountries } from '../components/countriesList';

const Section = styled.section`
    a {
        text-decoration: none;
    }
`;
const SectionContainer = styled.div`
    max-width: 1114px;
    margin-top: 32px;
    margin-left: 32px;
    margin-right: 32px;

    @media(min-width:1114px) {
        margin-left: auto;
        margin-right: auto;
        display: grid;
        grid-template-columns: 23% 23% 23% 23%;
        column-gap: 32px;
    }
`;

export const Home = () => {
    const { loading, allCountries } = useContext(GlobalContext);
    const [search, setSearch] = useState<string>('');
    const [region, setRegion] = useState<string>('');

    const setFilter = (param: { name: string, value: string }) => {
        const method = param.name === 'search' ? setSearch : setRegion;
        method(param.value);
    }
    const filteredCountries = allCountries.filter(({ name }) => search === '' || name.toLowerCase().includes(search.toLowerCase())).filter((country) => region === '' || country.region.toLowerCase() === region);
    console.log(filteredCountries);
    const countriesEl = loading ?
        <div className="loading">Loading...</div>
        :
        !loading && filteredCountries.length < 1
            ?
            <div className="result"> No result found </div>
            :
            filteredCountries?.map(country => {
                return <AllCountries key={country.name}  {...country} />
            })


    return (
        <Section>
              <Filters
                    search={search}
                    region={region}
                    filterFunction={setFilter}
                />
            <SectionContainer>
                {countriesEl}
            </SectionContainer>
        </Section>
    )
}