import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
    color: var(--black);
  }
`;

const SingleBeer = ({ beer: { name, image, price, rating } }) => {
  if (name === null) return null;

  const ratings = Math.round(rating.average);

  return (
    <SingleBeerStyles>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {price}
      <p title={`${ratings} out of 5 stars`}>
        {`⭐`.repeat(ratings)}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐`.repeat(5 - ratings)}
        </span>
        <span>{rating.reviews}</span>
      </p>
    </SingleBeerStyles>
  );
};

const BeersPage = ({ data }) => {
  const beers = data.beers.nodes;

  return (
    <>
      <SEO title={`Beers! We have ${beers.length} in stock`} />
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in only.{' '}
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerGridStyles>
    </>
  );
};

export default BeersPage;

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
