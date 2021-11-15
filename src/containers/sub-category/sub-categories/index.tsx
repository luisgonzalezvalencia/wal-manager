import { useEffect } from 'react';

import { useSubCategoryList } from '@api';
import { SubCategoryPanel } from '@components';
import { Card } from '@lib/wal-ui';
import { Category } from '@models';
import { useSubCategoriesStore } from '@stores';

import { SubCategoryPortalModal } from '../portal-modal';

interface IProps {
  onCategoryDeleted(id: string): void;
  onCategoryUpdated(id: string): void;
  selected?: Category;
}

export const SubCategoriesListCard: React.FC<IProps> = ({
  onCategoryUpdated,
  onCategoryDeleted,
  selected,
}) => {
  const { data: categories, isLoading, refetch } = useSubCategoryList(selected?.id as string);
  const [state, dispatch] = useSubCategoriesStore();

  useEffect(() => {
    if (selected?.id) {
      refetch();
    }
  }, [selected?.id]);

  return (
    <>
      <Card>
        <SubCategoryPanel
          category={selected}
          isLoading={isLoading}
          onCategoryDeleted={onCategoryDeleted}
          onCategoryUpdated={onCategoryUpdated}
          onCreated={() => dispatch.onOpenForm()}
          onDeleted={(id: string) => dispatch.onOpenForm(id, true)}
          onUpdated={(id: string) => dispatch.onOpenForm(id)}
          subCategories={categories}
        />
      </Card>
      <SubCategoryPortalModal
        id={state.id}
        isOpenForm={state.isOpenForm}
        isOpenRemove={state.isOpenRemove}
        onConfirmed={dispatch.onConfirmedForm}
        onDismiss={dispatch.onDismissForm}
        parent={selected as Category}
      />
    </>
  );
};
