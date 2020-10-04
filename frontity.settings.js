const settings = {
  name: "frontity-react-portfolio",
  state: {
    frontity: {
      url: "https://www.matthewcromer.me",
      title: "Matthew Cromer's Portfolio",
      description: "Online Portfolio",
    },
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Portfolio", "/"],
            ["Blog", "/blog"],
          ],
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
        mainScrollPosition: 0,
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://www.matthewcromer.me/wp/wp-json",
          homepage: "/home",
          postTypes: [
            {
              type: "portfolio",
              endpoint: "portfolio",
              archive: "/portfolio_category",
            },
          ],
          taxonomies: [
            {
              taxonomy: "portfolio_category",
              endpoint: "portfolio_category",
              postTypeEndpoint: "portfolio",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
