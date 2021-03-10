import styled from 'styled-components';
const Section = styled.section`
        @media(min-width: 1114px) {
        max-width: 1114px;
        margin-left: auto;
        margin-right: auto;
        }
`;
const GoBackButton = styled.button`
    margin-top: 48px;
`;
const Container = styled.div`
    margin-top: 64px;

    @media(min-width: 1114px) { 
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 100px;
    }
`;
const ImageContainer = styled.div``;
const Article = styled.article`
    display: grid;
    grid-template-columns: auto auto;
`
const BordersContainer = styled.div`
    margin-top: 32px;
    @media(min-width: 1114px) {
        margin-top: 48px;
    }
`;
const Button = styled.button`
    margin-right: 16px;

    &:first-of-type {
        margin-left: 16px;
    }
`;
const Group = styled.div`
    margin-top: 48px;
    @media(min-width: 1114px) {
        margin-top: 0;


        &:nth-of-type(2) {
            margin-top: 97px;
        }
    }
`;

const SubHeading = styled.h2`
    font-size: 32px;
`;

export {
    Section,
    GoBackButton,
    Container,
    Article,
    Group,
    SubHeading,
    ImageContainer,
    BordersContainer,
    Button
}