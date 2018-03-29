import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => (
    <div className="filter">
        <input type="text" id="filter-input" onChange={props.changeFilterValue}/>
        <label htmlFor="filter-input">Filter by author</label>
    </div>
);

Filter.propTypes = {
    changeFilterValue: PropTypes.func
};

export default Filter;