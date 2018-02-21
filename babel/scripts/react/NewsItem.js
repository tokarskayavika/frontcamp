import React from 'react';

const NewsItem = props => (
    <li className="news-item" data-id={props.id}>
        <h3 className="title">{props.data.title}</h3>
        <div className="feed-info">
            <p className="author">{props.data.author}</p>
            <p className="description">{props.data.description}</p>
        </div>
        <button className="delete-button" onClick={() => props.deletePost(props.id)}>Delete post</button>
    </li>
);

export default NewsItem;