import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

import { Account, DEFAULT_ACCOUNT_TYPE } from '@models';
import { Checkbox } from '@shared';

import { useAccountIsUnique } from '../../hooks';
import AccountTypeRadioGroup from '../type-radio-group';

interface IProps extends UseFormReturn<Account> {
  id?: string;
}

const Form: React.FC<IProps> = ({ control, formState: { errors }, id, register }) => {
  const isUnique = useAccountIsUnique();
  return (
    <SimpleGrid columns={2} gap={6}>
      <FormControl as={GridItem} colSpan={2} isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Nombre</FormLabel>
        <Input
          id="name"
          placeholder="Nombre"
          {...register('name', {
            required: 'Este campo es requerido.',
            validate: (name) => isUnique(name, id),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.type}>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <AccountTypeRadioGroup
          control={control}
          defaultValue={DEFAULT_ACCOUNT_TYPE}
          id="type"
          name="type"
        />
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} isInvalid={!!errors.isDefault}>
        <Checkbox control={control} id="isDefault" name="isDefault">
          Seleccionar por defecto
        </Checkbox>
        <FormErrorMessage>{errors.isDefault && errors.isDefault.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export default Form;
