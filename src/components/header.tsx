import React, { useState } from 'react' 
import {
    Header,
    Container,
    Title,
    ButtonContainer,
    Button,
    Span,
} from '../stylesComponents/header';
export const HeaderComponent = () => {
    const [isLight, setTheme] = useState(true);
    const toggleTheme = () => setTheme(!isLight);

    return (
        <Header> 
            <Container>
                <Title>
                    Where in the world?
                </Title>
                <ButtonContainer>
                    <Button onClick={toggleTheme}>
                        <Span>
                            Mode
                        </Span>
                    </Button>
                </ButtonContainer>
            </Container>
        </Header>
    )
}