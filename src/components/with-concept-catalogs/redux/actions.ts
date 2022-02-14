import {
  CONCEPT_CATALOGS_REQUESTED,
  CONCEPT_CATALOGS_SUCCEEDED,
  CONCEPT_CATALOGS_FAILED
} from './actions-types';

import type { ConceptCatalog } from '../../../types';

export function conceptCatalogsRequested() {
  return {
    type: CONCEPT_CATALOGS_REQUESTED
  };
}

export function conceptCatalogsSucceeded(conceptCatalogs: ConceptCatalog[]) {
  return {
    type: CONCEPT_CATALOGS_SUCCEEDED,
    payload: {
      conceptCatalogs
    }
  };
}

export function conceptCatalogsFailed(message: string) {
  return {
    type: CONCEPT_CATALOGS_FAILED,
    payload: {
      message
    }
  };
}
