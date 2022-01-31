/* eslint-disable import/no-extraneous-dependencies */
import { createGlobalStyle } from 'styled-components';

import '../../../assets/style/bootstrap-override.scss';

import 'font-awesome/scss/font-awesome.scss';

import 'designsystemet/fdk-designsystem-bootstrap4/scss/helper.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/register.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/typo.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/common.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/animations.scss';

import '../../../assets/style/local.scss';

import CommonStyles from './common';

export default createGlobalStyle`
  ${CommonStyles}
`;
