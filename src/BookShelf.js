import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
    static protoTypes = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    };

    render() {
        const {books, changeBookShelf} = this.props;
        return (
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book) => {
                                        if (book.shelf === "currentlyReading") {
                                            return <Book key={book.id} changeBookShelf={changeBookShelf} book={book}/>
                                        }
                                    }
                                )}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book) => {
                                        if (book.shelf === "wantToRead") {
                                            return <Book key={book.id} changeBookShelf={changeBookShelf} book={book}/>
                                        }
                                    }
                                )}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books.map((book) => {
                                        if (book.shelf === "read") {
                                            return <Book key={book.id} changeBookShelf={changeBookShelf} book={book}/>
                                        }
                                    }
                                )}
                            </ol>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default BookShelf;