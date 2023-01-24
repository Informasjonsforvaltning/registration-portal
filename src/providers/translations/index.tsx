import React, {
  memo,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo
} from 'react';
import { compose } from 'redux';
import { withCookies, ReactCookieProps } from 'react-cookie';

import translationService, { Language } from '../../services/translations';

import Context from './context';

import { Cookie } from './enums';

interface Props extends ReactCookieProps {}

const TranslationsProvider: FC<PropsWithChildren<Props>> = ({
  cookies,
  children
}) => {
  const cookieOptions = { path: '/', maxAge: 30 * 24 * 60 * 60 };

  const getLanguageFromCookies = (): Language => {
    const language = cookies?.get(Cookie.LANGUAGE);

    return [Language.NB, Language.NN, Language.EN].includes(language)
      ? language
      : Language.NB;
  };

  const [isInitialised, setIsInitialised] = useState(false);
  const [language, setLanguage] = useState<Language>(getLanguageFromCookies());

  const onChangeLanguage = (newLanguage: Language) => {
    cookies?.set(Cookie.LANGUAGE, newLanguage, cookieOptions);

    setLanguage(newLanguage);
  };

  const init = async () => {
    await translationService.init(language, onChangeLanguage);

    setIsInitialised(true);
  };

  const service = useMemo(
    () => ({
      translationService
    }),
    [translationService]
  );

  useEffect(() => {
    init();
  }, []);

  return isInitialised ? (
    <Context.Provider value={service}>{children}</Context.Provider>
  ) : null;
};

export default compose<FC>(memo, withCookies)(TranslationsProvider);
export { withTranslations } from './hoc';
export { Language } from '../../services/translations';
export type { ServiceProps as Props } from './hoc';
export type { Tokens } from '../../services/translations';
