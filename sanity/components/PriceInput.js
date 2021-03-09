import React from 'react';
import PropTypes from 'prop-types';

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('BE', {
  style: 'currency',
  currency: 'EUR',
}).format;

const PriceInput = ({
  type: { title, description, name },
  value,
  onChange,
  inputComponent,
}) => (
  <div>
    <h2>
      {title} - {value && formatMoney(value / 100)}
    </h2>
    <p>{description}</p>
    <input
      type={name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = function () {
  this._inputElement.focus();
};

PriceInput.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default PriceInput;
