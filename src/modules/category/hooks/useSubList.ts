import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category } from '@models';

import { CATEGORIES_KEY, SUB_CATEGORIES_KEY } from '../constants';

const hook = (parentId?: string): UseQueryResult<Category[]> => {
  const { categories } = useApi();
  return useQuery(
    [CATEGORIES_KEY, SUB_CATEGORIES_KEY, parentId],
    () =>
      categories.getAll({
        filtering: (q) => {
          return q.eq('parentId', parentId);
        },
        sort: { field: 'name' },
      }),
    {
      enabled: !!parentId,
    },
  );
};

export default hook;
