import Breadcrumbs, { Breadcrumb } from "@fellesdatakatalog/breadcrumbs";
import { CardGroup } from "reactstrap";
import Link from "@fellesdatakatalog/link";
import { FC, memo, useEffect, useState } from "react";
import { compose } from "redux";

import { Variant } from "../banner";
import Catalog from "../catalog";
import ServiceMessages from "../service-messages";
import Translation from "../translation";
import withCatalogs, { Props as CatalogsProps } from "../with-catalogs";
import withConceptCatalogs, {
  Props as ConceptCatalogsProps,
} from "../with-concept-catalogs";
import withDataServiceCatalogs, {
  Props as DataServiceCatalogsProps,
} from "../with-dataservice-catalogs";
import withRecordCounts, {
  Props as RecordCountsProps,
} from "../with-record-counts";

import env from "../../env";

import SC from "./styled";
import {
  useGetServiceMessagesQuery,
  ServiceMessage,
} from "../../services/api/strapi/generated/graphql";
import { signIn, signOut, useSession } from "next-auth/react";

const { FDK_REGISTRATION_BASE_URI, NAMESPACE } = env;

interface Props
  extends CatalogsProps,
    ConceptCatalogsProps,
    DataServiceCatalogsProps,
    RecordCountsProps {}

const OveriewPage: FC<Props> = ({
  catalogs,
  conceptCatalogs,
  dataServiceCatalogs,
  recordCounts,
  isLoadingCatalogs,
  catalogsActions: { listCatalogsRequested: listCatalogs },
  conceptCatalogsActions: { conceptCatalogsRequested },
  dataServiceCatalogsActions: { dataServiceCatalogsRequested },
  recordCountsActions: { recordCountsRequested },
}) => {
  const { data: session, status } = useSession();

  const { data } = useGetServiceMessagesQuery({
    variables: {
      today: new Date(new Date().toUTCString()),
      env: NAMESPACE,
    },
  });
  const serviceMessages = data?.serviceMessages as ServiceMessage[];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    listCatalogs();
    conceptCatalogsRequested();
    dataServiceCatalogsRequested();
    recordCountsRequested();

    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  const isLoading = !isMounted || isLoadingCatalogs;

  const authService = {
    hasAcceptedLatestTermsAndConditions: (i: any) => true,
    hasOrganizationReadPermission: (i: any) => true,
    hasSystemAdminPermission: () => true,
  };

  const hasAcceptedTerms = (id: string) =>
    authService.hasAcceptedLatestTermsAndConditions(id);

  const conceptCatalogSize = (catalogId: string) => {
    const conceptCatalog = conceptCatalogs?.find(
      (catalog) => catalog.id === catalogId
    );
    return conceptCatalog?.antallBegrep || 0;
  };

  const dataServiceCatalogSize = (catalogId: string) => {
    const dataServiceCatalog = dataServiceCatalogs?.find(
      (catalog) => catalog.id === catalogId
    );
    return dataServiceCatalog?.dataServiceCount || 0;
  };

  const organizationRecordCount = (organizationId: string) => {
    const organizationRecords = recordCounts?.find(
      (org) => org.organizationId === organizationId
    );
    return organizationRecords?.recordCount || 0;
  };
  return session ? (
    <>
      {serviceMessages?.length > 0 && (
        <ServiceMessages serviceMessages={serviceMessages} />
      )}
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb active>
          <Translation id="catalogs.title" />
        </Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        {catalogs?.map(({ id, publisher, datasetCount }) => (
          <div key={id} className="row mb-2 mb-md-5">
            <div className="col-12">
              <div className="mb-3">
                <SC.CatalogTitle>
                  {publisher?.prefLabel ? (
                    <Translation object={publisher?.prefLabel} />
                  ) : (
                    publisher?.name || (
                      <Translation id="catalogs.missingTitle" />
                    )
                  )}
                </SC.CatalogTitle>
                {authService.hasOrganizationReadPermission(id) &&
                  hasAcceptedTerms(id) && (
                    <SC.TermsLink
                      href={`${FDK_REGISTRATION_BASE_URI}/terms-and-conditions/${id}`}
                      external
                    >
                      Bruksvilkår
                    </SC.TermsLink>
                  )}
              </div>
              {authService.hasOrganizationReadPermission(id) &&
                !hasAcceptedTerms(id) && (
                  <SC.Banner variant={Variant.WARNING}>
                    Alle virksomheter må godta bruksvilkår før de kan registrere
                    data i Felles datakatalog. Les mer om bruksvilkårene og
                    aksepter her:{" "}
                    <Link
                      href={`${FDK_REGISTRATION_BASE_URI}/terms-and-conditions/${id}`}
                      external
                    >
                      Bruksvilkår
                    </Link>
                  </SC.Banner>
                )}
              <CardGroup>
                <Catalog
                  key={`datasets-${id}`}
                  catalogId={id}
                  type="datasets"
                  itemsCount={datasetCount}
                  disabled={
                    !authService.hasSystemAdminPermission() &&
                    !hasAcceptedTerms(id)
                  }
                />
                <Catalog
                  key={`dataservices-${id}`}
                  catalogId={id}
                  type="dataservices"
                  itemsCount={dataServiceCatalogSize(id)}
                  disabled={
                    !authService.hasSystemAdminPermission() &&
                    !hasAcceptedTerms(id)
                  }
                />
                <Catalog
                  key={`concepts-${id}`}
                  catalogId={id}
                  type="concepts"
                  itemsCount={conceptCatalogSize(id)}
                  disabled={
                    !authService.hasSystemAdminPermission() &&
                    !hasAcceptedTerms(id)
                  }
                />
                <Catalog
                  key={`protocol-${id}`}
                  catalogId={id}
                  type="protocol"
                  itemsCount={organizationRecordCount(id)}
                  disabled={
                    !authService.hasSystemAdminPermission() &&
                    !hasAcceptedTerms(id)
                  }
                />
              </CardGroup>
            </div>
          </div>
        ))}
        {!isLoading && catalogs.length === 0 && (
          <div className="row mb-2 mb-md-5">
            <div id="no-catalogs">
              <h1 className="fdk-text-strong">
                <Translation id="catalogs.missingCatalogs.title" />
              </h1>
              <div className="mt-2 mb-2">
                <Translation id="catalogs.missingCatalogs.ingress" />
              </div>
              <div className="fdk-text-size-small">
                <strong>
                  <Translation id="catalogs.missingCatalogs.accessTitle" />
                </strong>
                <p>
                  <a href="https://data.norge.no/about-registration">
                    <Translation id="catalogs.missingCatalogs.accessText" />
                    <i className="fa fa-external-link fdk-fa-right" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </SC.Page>
    </>
  ) : (
    <>
      <h1>please log in</h1>
      <button onClick={() => signIn("keycloak")}>Sign in</button>
    </>
  );
};

export default compose<FC>(
  memo,
  withCatalogs,
  withConceptCatalogs,
  withDataServiceCatalogs,
  withRecordCounts
)(OveriewPage);
