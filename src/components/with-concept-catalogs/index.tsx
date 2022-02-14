import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { ConceptCatalog } from '../../types';

export interface Props {
  conceptCatalogs: ConceptCatalog[];
  conceptCatalogsActions: typeof actions;
  isLoadingConceptCatalogs: boolean;
}

const withConceptCatalogs = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    conceptCatalogs:
      state.ConceptCatalogsReducer.get('conceptCatalogs')?.toJS() ?? [],
    isLoadingConceptCatalogs: state.ConceptCatalogsReducer.get(
      'isLoadingConceptCatalogs'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    conceptCatalogsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withConceptCatalogs;
