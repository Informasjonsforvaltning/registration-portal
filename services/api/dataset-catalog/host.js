import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth';
import { datasetCatalogPath } from './catalogs';

const { DATASET_CATALOG_BASE_URI } = env;

export const datasetCatalog = async (method, path, data) => {
  const Authorization = await AuthService.getAuthorizationHeader();
  const response = await axios({
    url: `${DATASET_CATALOG_BASE_URI}${path}`,
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

export const datasetCatalogGet = path => datasetCatalog('GET', path);

export const getDatasetsCount = catalogId =>
  datasetCatalogGet(`${datasetCatalogPath(catalogId)}/datasets?size=1000`).then(
    datasets => datasets?._embedded?.datasets?.length ?? 0
  );
