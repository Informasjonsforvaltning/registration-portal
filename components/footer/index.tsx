import React, { memo, FC } from 'react';
import { compose } from 'redux';
import FooterBase from '@fellesdatakatalog/internal-footer';
import { ThemeProfile } from '@fellesdatakatalog/theme';

import env from '../../env';


const { SKE_THEME_PROFILE } = env;

interface Props {}

const Footer: FC<Props> = () => {
    const isSkatteetatenThemeProfile = false; //TODO

  const themeProfile = isSkatteetatenThemeProfile
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;

  return <FooterBase themeProfile={themeProfile} />;
};

export default compose<FC>(memo)(Footer);
