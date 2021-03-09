import { resolve } from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 2. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // url for the new page
      path: `pizza/${pizza.slug.current}`,
      component: resolve('./src/templates/Pizza.js'),
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPage = async ({ graphql, actions }) => {
  // 2. query topping
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: resolve('./src/pages/pizzas.js'),
      context: {
        topping: topping.name,
        // TODO: regex for topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // fetch beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();

  // loop over beers
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    // create node for beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // TODO: turn each one into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      // url for the new page
      path: `slicemaster/${slicemaster.slug.current}`,
      component: resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });

  // figure out how many pages there are based on how many slicemasters there are
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  // loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  // fetch beers and source into gatsby
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPage(params),
    turnSlicemastersIntoPages(params),
  ]);
};
