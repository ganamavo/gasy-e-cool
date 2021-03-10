import React, { useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalState';
import { Group, SubHeading, Article } from '../stylesComponents/countryDetails';
import { BoldText, Flag, Frame, SimpleText } from '../stylesComponents/countriesList';
import { Section, Container, ImageContainer, BordersContainer, Button, GoBackButton } from '../stylesComponents/countryDetails';


interface RouteParams {
    countryName: string;
}

export const CountryDetails = () => {
    const { countryName } = useParams<RouteParams>();
    const { allCountries } = useContext(GlobalContext);
    const history = useHistory();

    const countryToShowObj = allCountries.find(country => country.alpha3Code === countryName);

    return (
        <Section>
            <GoBackButton onClick={() => history.push("/")}>Go back</GoBackButton>
            <Container>
                <ImageContainer>
                    <Flag src={countryToShowObj?.flag} alt="flag" />
                </ImageContainer>
                <Article>
                    <Group>
                        <SubHeading>{countryToShowObj?.name}</SubHeading>
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
                    </Group>
                    <Group>
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
                    </Group>
                    {
                        countryToShowObj?.borders &&
                        <BordersContainer>
                            <BoldText>
                                Borders:
                            </BoldText>
                            {
                                countryToShowObj?.borders.map(border => {
                                    return <Link to={`/${border}`}><Button>{border}</Button></Link>
                                })
                            }
                        </BordersContainer>
                    }
                </Article>
            </Container>
        </Section>
    )
}