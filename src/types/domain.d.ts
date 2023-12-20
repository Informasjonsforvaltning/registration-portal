export interface Catalog {
  id: string;
  uri: string;
  title: Record<string, string>;
  description: Record<string, string>;
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: string;
  datasetCount: number;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  prefLabel: Record<string, string>;
  allowDelegatedRegistration?: boolean;
}
export interface ConceptCatalog {
  id: string;
  antallBegrep: number;
}

export interface DataServiceCatalog {
  id: string;
  dataServiceCount: number;
}

export interface ServiceCatalog {
  catalogId: string;
  serviceCount: number;
  publicServiceCount: number;
}

export interface OrganizationRecordCount {
  organizationId: string;
  recordCount: number;
}
