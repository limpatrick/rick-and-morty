export const SET_DATA = 'SET_DATA';
export const SET_FIELD = 'SET_FIELD';
export const SET_ORDER = 'SET_ORDER';

export type SetDataAction<T extends object> = {
  type: typeof SET_DATA;
  payload: { data: T[]; removeFields: string[] };
};
export type SetFieldAction = { type: typeof SET_FIELD; payload: string };
export type SetOrderAction = { type: typeof SET_ORDER; payload: Order };

export type Action<T extends object> = SetDataAction<T> | SetFieldAction | SetOrderAction;
export type Order = 'asc' | 'desc';
export type State<T extends object> = {
  data: T[];
  fields: string[];
  field: string | undefined;
  order: Order;
  labelId: string;
};
