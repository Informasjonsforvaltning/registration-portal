import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { ServiceCatalog } from '../../types';

export interface Props {
  serviceCatalogs: ServiceCatalog[];
  serviceCatalogsActions: typeof actions;
  isLoadingServiceCatalogs: boolean;
}

const withServiceCatalogs = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    serviceCatalogs:
      state.ServiceCatalogsReducer.get('serviceCatalogs')?.toJS() ?? [],
    isLoadingServiceCatalogs: state.ServiceCatalogsReducer.get(
      'isLoadingServiceCatalogs'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    serviceCatalogsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withServiceCatalogs;
