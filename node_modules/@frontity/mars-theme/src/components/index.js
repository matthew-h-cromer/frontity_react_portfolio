import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  return (
    <Container>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        test
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main
        id="main"
        onScroll={(e) => (state.mainScrollPosition = e.target.scrollTop)}
      >
        <Switch>
          <Loading when={data.isFetching} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>
    </Container>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: "IBM Plex Sans", sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  .card {
    cursor: pointer;
    position: relative;
    float: left;
    flex: 0 0 253px;
    height: 275px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    filter: grayscale();

    &:hover,
    .hover_effect {
      filter: none;
      transition-duration: 0.35s;
    }
  }

  .text-overlay {
    display: flex;
    flex-direction: column;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
  }

  .title {
    font-size: 18px;
    transition: opacity 0.2s;
    opacity: 0.7;
    color: white;
    background-color: black;
    font-weight: 700;
  }

  .excerpt {
    font-size: 16px;
    line-height: 14px;
    height: 80px;
    transition: opacity 0.2s;
    opacity: 0.7;
    color: white;
    background-color: black;
    text-align: justify;
    align-content: top;
    margin-top: auto;
    padding: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    -webkit-flex-direction: column;
  }
`;

const HeadContainer = styled.div`
  width: 325px;
  height: calc(100vh);
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #262626;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const Main = styled.div`
  width: calc(100vw - 325px);
  height: calc(100vh);
  overflow-y: scroll;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    overflow-y: hidden;
  }
`;

/*
background-image: linear-gradient(
  180deg,
  rgba(66, 174, 228, 0.1),
  rgba(66, 174, 228, 0)
);
  */
