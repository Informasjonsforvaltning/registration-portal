import React, { FC, memo, useEffect, useState } from 'react';

import { Severity } from '@fellesdatakatalog/alert';

import env from '../../env';
import Translation from '../translation';

import { ServiceMessageEntity } from '../../services/api/strapi/generated/graphql';

import SC from './styled';

interface Props {
  serviceMessages: ServiceMessageEntity[] | null;
}

const { FDK_BASE_URI } = env;

const renderServiceMessage = (entity: ServiceMessageEntity) => {
  const { id, attributes } = entity;
  if (attributes) {
    const { title, short_description, message_type } = attributes;
    return (
      <SC.Alert
        key={id}
        severity={Severity[message_type as keyof typeof Severity]}
      >
        <SC.Content>
          <SC.Title>{title}</SC.Title>
          <SC.Description>
            <SC.Text>{short_description}</SC.Text>
            <SC.Link href={`${FDK_BASE_URI}/publishing/service-messages/${id}`}>
              <Translation id='serviceMessagesPage.goToDetailsPage' />
            </SC.Link>
          </SC.Description>
        </SC.Content>
      </SC.Alert>
    );
  }

  return null;
};

const ServiceMessages: FC<Props> = ({ serviceMessages = [] }) => {
  const [extendedServiceMessages, setExtendedServiceMessages] = useState<
    ServiceMessageEntity[] | null
  >();

  useEffect(() => {
    setExtendedServiceMessages(
      serviceMessages?.map(item => ({ ...item, hide: false }))
    );
  }, [serviceMessages]);
  return (
    <SC.ServiceMessages>
      {extendedServiceMessages?.map(entity => renderServiceMessage(entity))}
    </SC.ServiceMessages>
  );
};

export default memo(ServiceMessages);
