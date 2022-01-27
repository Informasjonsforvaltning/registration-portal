export const datasetCatalogsPath = `/catalogs`;
export const datasetCatalogPath = catalogId =>
  `${datasetCatalogsPath}/${catalogId}`;
export const datasetCatalogsPathWithSize = `${datasetCatalogsPath}?size=1000`;
