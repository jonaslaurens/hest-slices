import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
      .sizes {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 5px;
        button {
          margin: 0;
        }
      }
    }
    label {
      input {
        width: 100%;
      }
    }
  }
  .siroop {
    display: none;
  }
  @media (max-width: 935px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }

  @media (max-width: 500px) {
    .sizes {
      flex-direction: column;
    }
  }
`;

export default OrderStyles;
