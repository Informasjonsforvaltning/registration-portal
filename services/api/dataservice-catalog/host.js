import axios from "axios";
import { getSession } from "next-auth/react";

import env from "../../../env";

const { DATASERVICE_CATALOG_BASE_URI } = env;

export const getDataServices = async (orgnr) => {
  const session = await getSession();
  return axios
    .get(`${DATASERVICE_CATALOG_BASE_URI}/catalogs/${orgnr}/dataservices`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
    })
    .then(({ data }) => data);
};

export const getDataServicesCount = (orgnr) =>
  getDataServices(orgnr).then((dataservices) => dataservices.length);
2
