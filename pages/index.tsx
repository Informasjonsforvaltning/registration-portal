import type { NextPage } from "next";
import DocumentHeader from "next/head";
import { memo } from "react";
import { compose } from "redux";
import OveriewPage from "../components/overview-page";
import Header from "../components/header";
import Root from "../components/root";
import Footer from "../components/footer";

const Home: NextPage = () => (
  <>
    <DocumentHeader>
      <title>Registrering portal next</title>
      <meta name="description" content="Registrering portal next" />
      <link rel="icon" href="/favicon.ico" />
    </DocumentHeader>
    <Header />
    <Root>
      <OveriewPage />
    </Root>
    {/* <Footer /> */}
  </>
);

export default compose<NextPage>(memo)(Home);
