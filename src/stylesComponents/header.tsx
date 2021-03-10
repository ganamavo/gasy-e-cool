import styled from 'styled-components';
const  Header = styled.header``;
const  Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 16px;
    margin-right: 16px;

    @media(min-width: 1114px) {
        max-width: 1114px;
        margin-left: auto;
        margin-right: auto;
    }
`;
const  Title = styled.h1``;
const  ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const  Button = styled.button``;
const  Span = styled.span``;


export  {
    Header,
    Container,
    Title,
    ButtonContainer,
    Button,
    Span,
}