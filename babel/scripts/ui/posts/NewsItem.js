import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = props => {
    const {author, title, description} = props.data;

    return (
        <li className="news-item" data-id={props.id}>
            <h3 className="title">{title}</h3>
            <div className="feed-info">
                <p className="author">{author}</p>
                <p className="description">{description}</p>
            </div>
            <button className="delete-button" onClick={() => props.deletePost(props.id)}>Delete post</button>
        </li>
    );
};

NewsItem.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
    deletePost: PropTypes.func
};

export default NewsItem;