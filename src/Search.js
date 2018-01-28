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
                // console.log(data)
                // this.setState({showingBooks:data})
                // list = data;
                if(data.length){
                    this.setState({showingBooks: data})
                }else {
                    this.setState({showingBooks: []})
                }

            })
        } else {
            this.setState({showingBooks: []})
        }

        // this.setState({query:query.trim()})
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
                            return <Book key={book.id} book={book}/>
                        })}

                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;