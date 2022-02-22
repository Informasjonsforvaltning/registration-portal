import axios from "axios";
import { getSession } from "next-auth/react";

import env from "../../../env";

const { CONCEPT_CATALOG_BASE_URI } = env;

export const getConcepts = async (orgnr) => {
  const session = await getSession();
  return axios
    .get(`${CONCEPT_CATALOG_BASE_URI}/begreper`, {
      params: { orgNummer: orgnr },
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
    })
    .then((r) => r.data);
};

export const getConceptCount = (orgnr) =>
  getConcepts(orgnr).then((concepts) => concepts.length);
