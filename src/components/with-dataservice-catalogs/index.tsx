import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { DataServiceCatalog } from '../../types';

export interface Props {
  dataServiceCatalogs: DataServiceCatalog[];
  dataServiceCatalogsActions: typeof actions;
  isLoadingDataServiceCatalogs: boolean;
}

const withDataServiceCatalogs = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataServiceCatalogs:
      state.DataServiceCatalogsReducer.get('dataServiceCatalogs')?.toJS() ?? [],
    isLoadingDataServiceCatalogs: state.DataServiceCatalogsReducer.get(
      'isLoadingDataServiceCatalogs'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataServiceCatalogsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDataServiceCatalogs;
