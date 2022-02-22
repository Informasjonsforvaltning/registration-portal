/* eslint-disable import/no-extraneous-dependencies */
import { createGlobalStyle } from 'styled-components';
import {
  FontStyles,
  ResetStyles,
  NormaliseStyles,
} from "@fellesdatakatalog/theme";

import CommonStyles from './common';

export default createGlobalStyle`
  ${ResetStyles}
  ${NormaliseStyles}
  ${FontStyles}
  ${CommonStyles}
`;
