import { Box, CircularProgress } from '@chakra-ui/react';

import { Category } from '@models';

import { SubCategoryList } from '../list';
import { SubCategoryListEmpty } from '../list-empty';
import { SubCategoryListNoSelected } from '../list-no-selected';
import { CategoryBar } from './category-bar';

const SubCategoryPanel: React.FC<IProps> = ({
  category,
  isLoading = true,
  onCategoryDeleted,
  onCategoryUpdated,
  onCreated,
  onDeleted,
  onUpdated,
  subCategories = [],
}) => {
  const noSelected = !isLoading && !category;
  const isEmpty = !isLoading && category && !subCategories.length;

  return (
    <>
      {category && (
        <CategoryBar
          category={category}
          onCreated={onCreated}
          onDeleted={onCategoryDeleted}
          onUpdated={onCategoryUpdated}
        />
      )}
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        h="full"
        justifyContent={isLoading ? 'center' : ''}
        minH="xs"
        p={isLoading ? '4' : ''}
        w="full"
      >
        {isLoading && <CircularProgress color="crimson.300" isIndeterminate />}
        {noSelected && <SubCategoryListNoSelected />}
        {isEmpty && <SubCategoryListEmpty onCreated={onCreated} />}
        {!isEmpty && (
          <SubCategoryList
            onDeleted={onDeleted}
            onUpdated={onUpdated}
            subCategories={subCategories}
          />
        )}
      </Box>
    </>
  );
};

interface IProps {
  category?: Category;
  isLoading: boolean;
  onCategoryDeleted?(id: string): void;
  onCategoryUpdated?(id: string): void;
  onCreated?(): void;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
  subCategories?: Category[];
}

export { SubCategoryPanel };
