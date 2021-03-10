import React from 'react'
import {
    Header,
    Container,
    Title,
    ButtonContainer,
    Button,
    Span,
} from '../stylesComponents/header';
export const HeaderComponent = () => {
    return (
        <Header>
            <Container>
                <Title>
                    Where in the world?
                </Title>
                <ButtonContainer>
                    <Button>
                        <Span>
                            Mode
                        </Span>
                    </Button>
                </ButtonContainer>
            </Container>
        </Header>
    )
}