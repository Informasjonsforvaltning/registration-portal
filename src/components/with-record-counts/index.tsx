import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { OrganizationRecordCount } from '../../types';

export interface Props {
  recordCounts: OrganizationRecordCount[];
  recordCountsActions: typeof actions;
  isLoadingRecordCounts: boolean;
}

const withRecordCounts = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    recordCounts: state.RecordCountsReducer.get('recordCounts')?.toJS() ?? [],
    isLoadingRecordCounts: state.RecordCountsReducer.get(
      'isLoadingRecordCounts'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    recordCountsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withRecordCounts;
