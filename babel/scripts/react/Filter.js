import React from 'react';

const Filter = props => (
    <div className="filter">
        <input type="text" id="filter-input" onChange={props.changeFilterValue }/>
        <label htmlFor="filter-input">Filter by author</label>
    </div>
);

export default Filter;