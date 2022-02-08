import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth';

const { CONCEPT_CATALOG_BASE_URI } = env;

export const getConcepts = async orgnr =>
  axios
    .get(`${CONCEPT_CATALOG_BASE_URI}/begreper`, {
      params: { orgNummer: orgnr },
      headers: {
        Authorization: await AuthService.getAuthorizationHeader(),
        Accept: 'application/json'
      }
    })
    .then(r => r.data);

export const getConceptCount = orgnr =>
  getConcepts(orgnr).then(concepts => concepts.length);
