import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Select } from '@chakra-ui/core';
import { labs } from '../constants';

export default ({
  name,
  label,
  errors,
  register,
}: {
  name: string;
  label: string;
  errors: any;
  register: React.Ref<HTMLSelectElement>;
}) => (
  <FormControl isInvalid={!!errors[name]}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Select name={name} placeholder=" " ref={register}>
      {labs.map((lab, index) => (
        <option key={`lab_${index}`} value={lab}>
          {lab}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
  </FormControl>
);
