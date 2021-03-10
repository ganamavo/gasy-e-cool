import styled from 'styled-components';
import {
  themeColorsMixing,
  maxCenterMixing,
  shadowMixing
} from '../components/Styled';

export const StyledFilters = styled.div`
  margin: 1em 0;
`;

export const StyledFiltersMaxCenter = styled.div`
  ${maxCenterMixing};

  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledSearch = styled.div`
  ${shadowMixing}
  ${themeColorsMixing}
  border-radius: 5px;
  display: flex;
  padding: .5em;
  justify-content: space-between;
  align-items: center;
`;

export const StyledInput = styled.input`
  ${themeColorsMixing}
  border: 0;
  outline: none;
  width: 90%;
  font-size: 1.2em;
`;

export const StyledSelect = styled.select`
  ${shadowMixing}
  ${themeColorsMixing}
  padding: .5em 1em;
  border-radius: 5px;
  margin-top: 1em;
  border: none;
  outline: none;
  font-size: 1.1rem;

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

