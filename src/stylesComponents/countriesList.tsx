import styled from 'styled-components';
const Container = styled.div`
    margin-top: 32px;
    background-color: #fff;
    transition: all 0.5s ease 0s;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 15px 1px;
    border-radius: 5px;
`;
const Flag = styled.img`  
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
`;
const CountryName = styled.h3`
    font-size: 28px;
    font-weight: 600;
`;
const FlagContainer = styled.div``;
const Article = styled.article`
    padding: 16px;
    padding-top: 0;
`;
const Frame = styled.div``;
const BoldText = styled.span`
    font-size: 18px;
    font-weight: bold;
    line-height: 33px;
    color: #334434
`;
const SimpleText = styled.span`
    display: inline-block;
    margin-left: 10px;
`;

export {
    Container,
    Flag,
    CountryName,
    FlagContainer,
    Article,
    Frame,
    BoldText,
    SimpleText
}

