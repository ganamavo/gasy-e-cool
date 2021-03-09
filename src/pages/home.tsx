import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../components/GlobalState';
import { AllCountries } from '../components/allCountries';

const Section = styled.section``;
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

type Props = {
    key: string
}
export const Home = () => {
    const { loading, allCountries } = useContext(GlobalContext);
    console.log(allCountries)
    const countriesEl = loading ? <div>Loading...</div> : allCountries?.map(country => {
        return <AllCountries   {...country} />
    })
    return (
        <Section>
            <SectionContainer>
                {countriesEl}
            </SectionContainer>
        </Section>
    )
}