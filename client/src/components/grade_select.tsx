import React from 'react';
import { FormErrorMessage, FormLabel, FormControl, Select } from '@chakra-ui/core';

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
      <option value="S">S</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </Select>
    <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
  </FormControl>
);
