import {
  Order,
  SET_DATA,
  SET_FIELD,
  SET_ORDER,
  SetDataAction,
  SetFieldAction,
  SetOrderAction,
} from './types';

export const setData = <T extends object>(data: T[], removeFields: string[]): SetDataAction<T> => ({
  type: SET_DATA,
  payload: { data, removeFields },
});
export const setField = (field: string): SetFieldAction => ({ type: SET_FIELD, payload: field });
export const setOrder = (order: Order): SetOrderAction => ({ type: SET_ORDER, payload: order });
