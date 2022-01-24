import { all } from 'redux-saga/effects';

import catalogsSaga from '../../../components/with-catalogs/redux/saga';

export default function* saga() {
  yield all([catalogsSaga()]);
}
