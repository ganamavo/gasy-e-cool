import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalState'; 
import { BoldText, Flag, Frame, SimpleText } from '../stylesComponents/allCountries';
import { Container, ImageContainer, BordersContainer, Button } from '../stylesComponents/countryDetails';


interface RouteParams {
    countryName: string;
}

export const CountryDetails  = ( ) => {
    const { countryName } = useParams<RouteParams>();
    const {loading, allCountries } = useContext(GlobalContext);
     
    const countryToShowObj = allCountries.find(country => country.name == countryName )
    console.log(countryToShowObj)     
    
    return (
        <Container>
        <ImageContainer>
            <Flag src={countryToShowObj?.flag} alt="flag"/>
        </ImageContainer>
         <Frame>
            <BoldText>
                Native Name: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.nativeName}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Population: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.population}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Region: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.region}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Sub Region: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.subregion}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Capital: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.capital}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Top Level Domain: 
            </BoldText>
            <SimpleText>
                {countryToShowObj?.topLevelDomain}
            </SimpleText>
        </Frame>
        <Frame>
            <BoldText>
                Currencies: 
            </BoldText>
            {countryToShowObj?.currencies.map(currency => {
                return <SimpleText>{currency.name}</SimpleText> 
            })
           }
        </Frame>
        <Frame>
            <BoldText>
                Languages: 
            </BoldText>
            {
               countryToShowObj && countryToShowObj.languages.map(language => {
                        return <SimpleText>{language?.name}</SimpleText> 
                })

            }
        </Frame> 
        <BordersContainer>
            <BoldText>
                Languages: 
            </BoldText>
            {
                countryToShowObj?.borders.map(border => {
                    return <Button>{border}</Button>
                })
            }
        </BordersContainer>
    </Container>

    )
}