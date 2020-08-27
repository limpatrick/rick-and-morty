import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { setData, setField, setOrder } from './actions';
import reducer from './reducer';
import { State } from './types';

type Actions = {
  setField: (field: string) => void;
  toggleOrder: () => void;
};
type Props<T extends object> = {
  children: React.ReactNode | ((state: State<T>, actions: Actions) => React.ReactNode);
  data: T[];
  removeFields?: string[];
};

const SorterStateContext = createContext<State<any> | undefined>(undefined);
const SorterActionsContext = createContext<Actions | undefined>(undefined);
const initialState: State<object> = {
  data: [],
  fields: [],
  field: undefined,
  order: 'asc',
  labelId: '',
};

const SorterProvider = <T extends object>({ children, data, removeFields }: Props<T>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = {
    setField: (field) => dispatch(setField(field)),
    toggleOrder: () => dispatch(setOrder(state.order === 'asc' ? 'desc' : 'asc')),
  };

  useEffect(() => {
    dispatch(setData(data, removeFields ?? []));
  }, [data, removeFields]);

  return (
    <SorterStateContext.Provider value={state}>
      <SorterActionsContext.Provider value={actions}>
        {typeof children === 'function'
          ? children((state as unknown) as State<T>, actions)
          : children}
      </SorterActionsContext.Provider>
    </SorterStateContext.Provider>
  );
};

const useSorterState = () => {
  const context = useContext(SorterStateContext);

  if (context === undefined) throw new Error('useSorterState must be used within SorterProvider');

  return context;
};

const useSorterActions = () => {
  const context = useContext(SorterActionsContext);

  if (context === undefined) throw new Error('useSorterActions must be used within SorterProvider');

  return context;
};

const useSorter = <T extends object>(): [State<T>, Actions] => [
  useSorterState(),
  useSorterActions(),
];

export { SorterProvider, useSorterActions, useSorter, useSorterState };
