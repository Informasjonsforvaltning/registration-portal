import axios from "axios";
import { getSession } from "next-auth/react";

import env from "../../../env";

const { RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI } = env;

export const getRecords = async (orgnr) => {
  const session = await getSession();
  return axios
    .get(
      `${RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI}/api/organizations/${orgnr}/records`,
      {
        params: { limit: 1000 },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json"
        },
      }
    )
    .then(({ data }) => data)
    .catch(() => {});
};

export const getRecordsCount = (orgnr) =>
  getRecords(orgnr).then((data) => data && data.hits && data.hits.length);
