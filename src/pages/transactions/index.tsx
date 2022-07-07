import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Portal } from '@chakra-ui/react';

import {
  TransactionMainFilterActions,
  TransactionMonthYearSelector,
  TransactionSummaryContainer,
  TransactionTableContainer,
  useTransactionStore,
} from '@m/transaction';
import { ActionsDrawer, Card, IActionDrawer, Page, usePagePortals } from '@shared';

import { withTransactionStore } from './hocs/withProvider';
import { useTransactionNav, useTransactionRoutes } from './hooks';

const TransactionsPage: React.FC = () => {
  const { titleBoxRef } = usePagePortals();
  const [state, dispatch] = useTransactionStore();
  const routes = useTransactionRoutes();
  const { goCreate, goRemove, goUpdate } = useTransactionNav();
  const [currentActionId, setCurrentActionId] = useState<string>();

  const onMoreActions = useCallback((id: string) => {
    setCurrentActionId(id);
  }, []);

  const onRemove = useCallback(
    (id: string) => {
      goRemove(id);
    },
    [goRemove],
  );

  const onUpdate = useCallback(
    (id: string) => {
      goUpdate(id, new Date(state.year, state.month));
    },
    [goUpdate, state.year, state.month],
  );

  const actions: IActionDrawer[] = useMemo(
    () => [
      {
        colorScheme: 'primary',
        label: 'Modificar',
        icon: 'edit',
        onClick: () => onUpdate(currentActionId as string),
      },
      {
        colorScheme: 'danger',
        label: 'Eliminar',
        icon: 'trash-alt',
        onClick: () => onRemove(currentActionId as string),
      },
    ],
    [currentActionId],
  );

  const onCloseDrawer = useCallback(() => {
    setCurrentActionId(undefined);
  }, []);

  return (
    <Page metaTitle="Movimientos">
      <Portal containerRef={titleBoxRef}>
        <TransactionMainFilterActions goCreate={goCreate} mb="3" />
        <TransactionMonthYearSelector display={['flex', 'flex', 'inline-flex']} mb="3" />
        <TransactionSummaryContainer
          accountId={state.accountId}
          endDate={state.endDate}
          startDate={state.startDate}
        />
      </Portal>

      <Card>
        <TransactionTableContainer
          accountId={state.accountId}
          endDate={state.endDate}
          onMoreActions={onMoreActions}
          onRemove={onRemove}
          onUpdate={onUpdate}
          startDate={state.startDate}
        />
      </Card>

      {routes}

      <Outlet />

      <ActionsDrawer actions={actions} isOpen={!!currentActionId} onClose={onCloseDrawer} />
    </Page>
  );
};

export default withTransactionStore(TransactionsPage);
