import styled from 'styled-components';
import {
  themeColorsMixing,
  maxCenterMixing,
  shadowMixing
} from '../components/Styled';

export const StyledFilters = styled.div`
  max-width: 1114px;
  margin: 1em 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;

`;

export const StyledFiltersMaxCenter = styled.div`
  ${maxCenterMixing};
  width: unset;
  margin: 0;
  margin-right: 0;
  padding: 16px;
  padding-top: 0;

  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
    padding: 0;
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
  cursor: pointer;
  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

