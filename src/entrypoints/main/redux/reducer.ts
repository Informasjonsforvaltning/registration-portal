import { combineReducers } from 'redux';

import catalogs from './modules/catalogs';

import CatalogsReducer from '../../../components/with-catalogs/redux/reducer';

export default combineReducers({
  catalogs,
  CatalogsReducer
});
