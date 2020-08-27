import {
  ascend,
  curry,
  descend,
  equals,
  find,
  head,
  isNil,
  keys,
  Ord,
  propOr,
  reduce,
  reject,
  sortWith,
  union,
} from 'ramda';
import { Action, Order, SET_DATA, SET_FIELD, SET_ORDER, State } from './types';

const getField = curry(
  <T extends object>(field: string, elem: T): Ord =>
    field === 'id' ? parseInt(propOr(false, field, elem)) : propOr(false, field, elem)
);

const sort = <T extends object>(field: string | undefined, order: Order, data: T[]): T[] =>
  !isNil(field)
    ? sortWith([order === 'desc' ? descend(getField(field)) : ascend(getField(field))], data)
    : data;

const getFields = <T extends object>(data: T[], removeFields: string[]): string[] =>
  reject(
    (e) => !isNil(find(equals(e), removeFields)),
    reduce((acc, elem) => union(keys(elem) as string[], acc), [] as string[], data)
  );

export default <T extends object>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case SET_DATA: {
      const { data, removeFields } = action.payload;
      const fields = getFields(data, removeFields);
      const field = head(fields);

      return {
        ...state,
        data: sort(field, state.order, data),
        fields,
        field,
        labelId: `sorter-id-${Math.ceil(Math.random() * 1000)}`,
      };
    }
    case SET_FIELD: {
      const newField = action.payload;

      return { ...state, field: newField, data: sort(newField, state.order, state.data) };
    }
    case SET_ORDER: {
      const newOrder = action.payload;

      return {
        ...state,
        order: newOrder,
        data: state.field ? sort(state.field, newOrder, state.data) : state.data,
      };
    }
    default:
      throw new Error(`Unhandled action`);
  }
};
