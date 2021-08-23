import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { HStack, Text } from '@chakra-ui/react';

import { colors } from '@lib/chakra-ui';

import { ColorCircle } from '../..';

const options = colors.map(({ key, name }) => ({ value: key, label: name }));

const ColorOption: React.FC<{ label: string; value: string }> = ({ value, label }) => {
  return (
    <HStack>
      <ColorCircle bg={value} />
      <Text>{label}</Text>
    </HStack>
  );
};

const ColorSelect: React.FC<IProps> = ({ control, id, name, placeholder, rules }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  return (
    <Select
      {...inputProps}
      formatOptionLabel={ColorOption}
      getOptionValue={(option) => option.value}
      id={id}
      inputRef={ref}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      value={options.find((option) => option.value === value)}
    />
  );
};

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { ColorSelect };
