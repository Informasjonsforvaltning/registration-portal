import { all } from 'redux-saga/effects';

import catalogsSaga from '../../../components/with-catalogs/redux/saga';
import conceptCatalogsSaga from '../../../components/with-concept-catalogs/redux/saga';

export default function* saga() {
  yield all([catalogsSaga(), conceptCatalogsSaga()]);
}
