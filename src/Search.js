import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegexp from 'escape-string-regexp'
import Book from './Book'

class Search extends React.Component {
    static protoTypes = {
        bookList: PropTypes.array.isRequired
    };
    state = {
        query: ""
    };
    updateQuery=(query)=>{
        this.setState({query:query.trim()})
    };

    render() {
        const {bookList} = this.props;
        const {query} =this.state;
        let showingBooks=[];
        if (query) {
            const match = new RegExp(escapeRegexp(query, 'i'));
            showingBooks = bookList.filter((book) => match.test(book.title));
            if (showingBooks.length === 0) {
                showingBooks = bookList.filter((book) => {
                    let author=book.authors.join(",");
                    return match.test(author);
                });
            }
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search"/>
                    <div className="search-books-input-wrapper">
                        <input value={query} onChange={(event)=> this.updateQuery(event.target.value)} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => {
                            return <Book key={book.id} book={book}/>
                        })}

                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;