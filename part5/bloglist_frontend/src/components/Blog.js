import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeHandler, removeHandler, user }) => {
    const [ expand, setExpand ] = useState(false);

    const blogStyle = {
        paddingTop   : 10,
        paddingLeft  : 2,
        border       : 'solid',
        borderRadius : 5,
        borderWidth  : 1,
        marginBottom : 5
    };

    const likeClicked = (event) => {
        event.preventDefault();

        // stop div from closing
        event.stopPropagation();

        // add like to database
        likeHandler({ ...blog, likes: blog.likes + 1 });
    };

    const removeClicked = (event) => {
        event.preventDefault();

        if (window.confirm(`Remove post ${blog.title} by ${blog.author}?`)) {
            removeHandler(blog);
            setExpand(false);
        }

        event.stopPropagation();
    };

    const RemoveButton = () => {
        // return button if correct user
        if (user.username === blog.user.username) {
            return (
                <div>
                    <button onClick={removeClicked}>Remove</button>
                </div>
            );
        }

        return null;
    };

    // if expanded
    if (expand) {
        return (
            <div style={blogStyle}>
                <div onClick={() => setExpand(false)}>
                    <div>
                        {blog.title} by {blog.author}
                    </div>
                    <div>{blog.url}</div>
                    <div>
                        {blog.likes} likes <button onClick={likeClicked}>Like</button>
                    </div>
                    <div>Added by {blog.user.name}</div>
                    <RemoveButton />
                </div>
            </div>
        );
    }

    // if normal state
    return (
        <div style={blogStyle}>
            <div onClick={() => setExpand(true)}>
                {blog.title} by {blog.author}
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog          : PropTypes.object.isRequired,
    likeHandler   : PropTypes.func.isRequired,
    removeHandler : PropTypes.func.isRequired
};

export default Blog;
