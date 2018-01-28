import React from 'react';
import PropTypes from "prop-types";

class Book extends React.Component {
    static protoTypes = {
        book: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    };

    render() {
        const {book, changeBookShelf} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks?book.imageLinks.smallThumbnail:""}")`}}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => {
                                if (event.target.value !== "none") {
                                    return changeBookShelf(event.target.value,book)
                                }
                            }} >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors?book.authors.join(","):""}</div>
                </div>
            </li>
        )
    }
}

export default Book;