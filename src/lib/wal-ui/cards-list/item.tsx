import React from 'react';

import { BoxProps } from '@chakra-ui/react';

import { Card } from '@lib/wal-ui';

const CardsListItem: React.FC<BoxProps> = ({
  children,
  onClick,
  mb = 5,
  h = 64,
  w = 64,
  mr = 5,
  ...boxProps
}) => (
  <Card {...boxProps} h={h} mb={mb} mr={mr} onClick={onClick} p={5} w={w}>
    {children}
  </Card>
);

export { CardsListItem };
