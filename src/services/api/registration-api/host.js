import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth';
import { catalogPath } from './catalogs';

const { FDK_REGISTRATION_BASE_URI } = env;

export const registrationApi = async (method, path, data) => {
  const Authorization = await AuthService.getAuthorizationHeader();
  const response = await axios({
    url: `${FDK_REGISTRATION_BASE_URI}${path}`,
    method,
    data,
    headers: {
      Authorization,
      Accept: 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const registrationApiGet = path => registrationApi('GET', path);

export const getDatasetsCount = catalogId =>
  registrationApiGet(`${catalogPath(catalogId)}/datasets?size=1000`).then(
    datasets => datasets?._embedded?.datasets?.length ?? 0
  );
