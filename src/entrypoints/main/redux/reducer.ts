import { combineReducers } from 'redux';

import CatalogsReducer from '../../../components/with-catalogs/redux/reducer';
import ConceptCatalogsReducer from '../../../components/with-concept-catalogs/redux/reducer';
import DataServiceCatalogsReducer from '../../../components/with-dataservice-catalogs/redux/reducer';

export default combineReducers({
  CatalogsReducer,
  ConceptCatalogsReducer,
  DataServiceCatalogsReducer
});
