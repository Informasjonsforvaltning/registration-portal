export interface Catalog {
  id: string;
  uri: string;
  title: Record<string, string>;
  description: Record<string, string>;
  publisher: Publisher;
  issued: Date;
  modified: Date;
  language: string;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  prefLabel: Record<string, string>;
  allowDelegatedRegistration?: boolean;
}
