import React from 'react';
import { BoldText, Flag, Frame, SimpleText } from '../stylesComponents/allCountries';
import { Container, ImageContainer } from '../stylesComponents/countryDetails';

type Props = {
    flag: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies?: [];
    languages?: [];
}
export const CountryDetailsContainer: React.FC<Props> = ({
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages }) => {
    return (
        <Container>
            <ImageContainer>
                <Flag src={flag} alt="flag"/>
            </ImageContainer>
            <Frame>
                <BoldText>
                    Native Name: 
                </BoldText>
                <SimpleText>
                    {nativeName}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Population: 
                </BoldText>
                <SimpleText>
                    {population}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Region: 
                </BoldText>
                <SimpleText>
                    {region}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Sub Region: 
                </BoldText>
                <SimpleText>
                    {subregion}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Capital: 
                </BoldText>
                <SimpleText>
                    {capital}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Top Level Domain: 
                </BoldText>
                <SimpleText>
                    {topLevelDomain}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Currencies: 
                </BoldText>
                <SimpleText>
                    {currencies}
                </SimpleText>
            </Frame>
            <Frame>
                <BoldText>
                    Languages: 
                </BoldText>
                <SimpleText>
                    {languages}
                </SimpleText>
            </Frame>
        </Container>
    )
}