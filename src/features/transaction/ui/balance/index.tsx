import React from 'react';

import { Text, Flex } from '@chakra-ui/react';

import { useTransactionBalance } from '@entities';
import { ContentLoader, formatToCurrency } from '@shared';

interface IProps {
  endDate: Date;
  startDate: Date;
}

const Balance: React.FC<IProps> = ({ endDate, startDate }) => {
  const { data, isLoading } = useTransactionBalance(startDate, endDate);

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <>
      {data?.map((b) => (
        <Flex align="center" justify="space-around" key={b.account} p={3}>
          <Text>
            <Text as="strong">{b.account}:</Text> $ {formatToCurrency(b.incomes)}
          </Text>
          <Text>
            <Text as="strong">Balance:</Text> $ {formatToCurrency(b.incomes + b.expenses)}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default Balance;
