import React from 'react';
import css from './Filter.module.css'
import PropTypes from 'prop-types';

const Filter = ({value, onChange}) => {
  return (
    <label>
      <input
        className={css.filter}
        name="filter"
        placeholder="Search..."
        type="search"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
