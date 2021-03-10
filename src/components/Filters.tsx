import React from 'react';
import {
  StyledFilters,
  StyledFiltersMaxCenter,
  StyledSearch,
  StyledInput, StyledSelect,
} from '../stylesComponents/StyledFilters'; 

export type FiltersProps = {
  search: string,
  region: string,
  filterFunction: (param: {name: string, value: string}) => void
}

function Filters(props: FiltersProps) {
  const {search, region, filterFunction} = props;
  const onChange = (name: string) => (e: {target: {value: string}}) => filterFunction({name: name, value: e.target.value});

  return (
    <StyledFilters>
      <StyledFiltersMaxCenter>
        <StyledSearch> 
          <StyledInput
            value={search}
            onChange={onChange('search')}
            placeholder="Search for a country"
          />
        </StyledSearch>
        <StyledSelect
          value={region}
          onChange={onChange('region')}
        >
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </StyledSelect>
      </StyledFiltersMaxCenter>
    </StyledFilters>
  )
}

export default Filters
