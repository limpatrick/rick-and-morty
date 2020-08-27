import { RouteComponentProps } from '@reach/router';
import React from 'react';
import DisplayMessage from '../components/display-message';

const NotFound = (props: RouteComponentProps) => <DisplayMessage>Not found :(</DisplayMessage>;

export default NotFound;
