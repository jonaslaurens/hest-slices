import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const SingleSlicemasterPage = ({
  data: {
    slicemaster: { name, image, description },
  },
}) => (
  <>
    <SEO title={name} image={image?.asset?.fluid?.src} />
    <div className="center">
      <Img fluid={image.asset.fluid} />
      <div>
        <h2 className="mark">
          <span>{name}</span>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  </>
);

export default SingleSlicemasterPage;

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
