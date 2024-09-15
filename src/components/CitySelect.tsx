import React from 'react';
import Select, { SingleValue } from 'react-select';
import styled from 'styled-components';

// Define the shape of each city option
interface CityOption {
  value: string;
  label: string;
}

// List of cities
const cities = [
  { id: 6167865, name: 'Toronto', country: 'CA' },
  { id: 6094817, name: 'Ottawa', country: 'CA' },
  { id: 1850147, name: 'Tokyo', country: 'JP' }
];

// Interface for the props passed to CitySelect
interface CitySelectProps {
  onSelectCity: (cityId: string) => void;
}

// Styled container
const CitySelectContainer = styled.div`
  margin-bottom: 20px;
`;

// CitySelect Component
const CitySelect: React.FC<CitySelectProps> = ({ onSelectCity }) => {
  // Map the cities data to react-select options
  const cityOptions: CityOption[] = cities.map(city => ({
    value: city.id.toString(),
    label: `${city.name}, ${city.country}`
  }));

  // Handle city selection
  const handleCityChange = (selectedOption: SingleValue<CityOption>) => {
    if (selectedOption) {
      onSelectCity(selectedOption.value); // Pass the selected city's ID to the parent component
    }
  };

  return (
    <CitySelectContainer>
      <Select
        options={cityOptions}
        placeholder="Select a City"
        onChange={handleCityChange}
      />
    </CitySelectContainer>
  );
};

export default CitySelect;
