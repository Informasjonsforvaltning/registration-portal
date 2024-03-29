import { combineReducers } from 'redux';

import CatalogsReducer from '../../../components/with-catalogs/redux/reducer';
import ConceptCatalogsReducer from '../../../components/with-concept-catalogs/redux/reducer';
import DataServiceCatalogsReducer from '../../../components/with-dataservice-catalogs/redux/reducer';
import ServiceCatalogsReducer from '../../../components/with-service-catalogs/redux/reducer';
import RecordCountsReducer from '../../../components/with-record-counts/redux/reducer';

export default combineReducers({
  CatalogsReducer,
  ConceptCatalogsReducer,
  DataServiceCatalogsReducer,
  ServiceCatalogsReducer,
  RecordCountsReducer
});
