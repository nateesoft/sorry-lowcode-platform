import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import Rating from './Rating';
import { rankWith, scopeEndsWith } from '@jsonforms/core';

const RatingControl = ({ id, data, handleChange, path }) => (
  <Rating
    value={data}
    updateValue={(newValue) => handleChange(path, newValue)} id={id}  />
);

export const ratingTester = rankWith(3, scopeEndsWith('rating'));
export default withJsonFormsControlProps(RatingControl);
