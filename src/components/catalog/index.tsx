import React, { memo, FC } from 'react';
import { compose } from 'redux';

import env from '../../env';

import CatalogItem from '../catalog-item';

const {
  FDK_REGISTRATION_BASE_URI,
  DATASERVICE_CATALOG_BASE_URI,
  SERVICE_CATALOG_GUI_BASE_URI,
  CONCEPT_REGISTRATION_HOST,
  RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI
} = env;

interface ExternalProps {
  catalogId: string;
  type: string;
  isReadOnly?: boolean;
  itemsCount?: number;
  disabled: boolean;
}

interface Props extends ExternalProps {}

const Catalog: FC<Props> = ({
  catalogId,
  type,
  itemsCount,
  isReadOnly,
  disabled
}) => {
  const getLinkUri = () => {
    switch (type) {
      case 'dataservices': {
        return `${DATASERVICE_CATALOG_BASE_URI}/${catalogId}`;
      }
      case 'concepts': {
        return `${CONCEPT_REGISTRATION_HOST}/${catalogId}`;
      }
      case 'protocol': {
        return `${RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI}/${catalogId}`;
      }
      case 'services': {
        return `${SERVICE_CATALOG_GUI_BASE_URI}/catalogs/${catalogId}/${type}`;
      }
      case 'public-services': {
        return `${SERVICE_CATALOG_GUI_BASE_URI}/catalogs/${catalogId}/${type}`;
      }
      default:
        return `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/${type}`;
    }
  };

  const linkUri = getLinkUri();

  return (
    <CatalogItem
      linkUri={linkUri}
      key={catalogId}
      type={type}
      itemsCount={itemsCount}
      isReadOnly={isReadOnly}
      disabled={disabled}
    />
  );
};

export default compose<FC<ExternalProps>>(memo)(Catalog);
