import { WindowLocation } from '@reach/router';
import { parse, stringify } from 'query-string';
import { isEmpty, isNil, mapObjIndexed } from 'ramda';
import * as yup from 'yup';

export const getParams = (location: WindowLocation) => parse(location.search);

export const getParam = (param: string, location: WindowLocation) => {
  const params = getParams(location);

  return params[param];
};

export const getPage = (location: WindowLocation): number | undefined => {
  const page = getParam('page', location);

  return yup.number().required().positive().integer().isValidSync(page)
    ? parseInt((page as unknown) as string)
    : undefined;
};

export const getName = (location: WindowLocation): string | undefined => {
  const name = getParam('name', location);

  return yup.string().required().trim().isValidSync(name) ? name : undefined;
};

export const getEpisode = (location: WindowLocation): string | undefined => {
  const episode = getParam('episode', location);

  return yup.string().required().trim().isValidSync(episode) ? episode : undefined;
};

export const toSearch = (object: Record<string, string | number | undefined>): string =>
  stringify(object, { sort: false });

export const shortParams = (object: Record<string, string | number | undefined>) =>
  mapObjIndexed((e) => (isEmpty(e) || isNil(e) ? undefined : e), object);

export const toPath = (
  object: Record<string, string | number | undefined>,
  path: string,
  short = true
): string => {
  const search = toSearch(short ? shortParams(object) : object);

  return `${path}${search ? `?${search}` : ''}`;
};

export const getCurrentPath = (location: WindowLocation): string => `/${location.search}`;
