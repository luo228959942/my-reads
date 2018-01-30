import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from "./BooksAPI";

class Search extends React.Component {
    static protoTypes = {
        bookList: PropTypes.array.isRequired
    };
    state = {
        showingBooks: []
    };
    updateQuery = (query) => {

        if (query) {
            BooksAPI.search(query).then((data) => {
                let books = this.props.books;
                data.map((item,index) => {
                    books.map((book) => {
                        if (book.id === item.id) {
                            item.shelf=book.shelf;
                            data[index]=item;
                        }else {
                            item.shelf="none";
                            data[index]=item;
                        }
                    })

                });
                if (data.length) {
                    this.setState({showingBooks: data})
                } else {
                    this.setState({showingBooks: []})
                }
            })
        } else {
            this.setState({showingBooks: []})
        }
    };

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search"/>
                    <div className="search-books-input-wrapper">
                        <input onChange={(event) => this.updateQuery(event.target.value)} type="text"
                               placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.showingBooks.map((book) => {
                            return <Book key={book.id} changeBookShelf={this.props.changeBookShelf} book={book}/>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;