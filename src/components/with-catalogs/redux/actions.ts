import {
  LIST_CATALOGS_REQUESTED,
  LIST_CATALOGS_SUCCEEDED,
  LIST_CATALOGS_FAILED
} from './actions-types';

import type { Catalog } from '../../../types';

export function listCatalogsRequested() {
  return {
    type: LIST_CATALOGS_REQUESTED
  };
}

export function listCatalogsSucceeded(catalogs: Catalog[]) {
  return {
    type: LIST_CATALOGS_SUCCEEDED,
    payload: {
      catalogs
    }
  };
}

export function listCatalogsFailed(message: string) {
  return {
    type: LIST_CATALOGS_FAILED,
    payload: {
      message
    }
  };
}
