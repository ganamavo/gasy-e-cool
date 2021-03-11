import styled from 'styled-components';
const  Header = styled.header`
    color: hsl(200, 15%, 8%);
    background-color: hsl(0, 0%, 100%);
    transition: all 0.5s ease 0s;
`;

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
const  Title = styled.h1`
    font-size: 22px;

    @media(min-width: 1114px) {
        font-size: 32px;
    }
`;

const  ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const  Button = styled.button`
    background-color: transparent;
    border: transparent;
    outline: none;
    font-size: 16px;
`;
const  Span = styled.span``;


export  {
    Header,
    Container,
    Title,
    ButtonContainer,
    Button,
    Span,
}