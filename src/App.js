import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom'
import BookShelf from './BookShelf';
import Search from "./Search";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }

    changeBookShelf = (data, book) => {
        let tempBooks = [], changeBooks = this.state.books;
        console.log(data);
        let deteil = changeBooks.find((bookItem) => bookItem === book);
        if (!deteil) {
            changeBooks.push(book);
        }
        this.setState({
            books: tempBooks
        });
        changeBooks.map((tempBook) => {
            if (tempBook.id === book.id) {
                tempBook.shelf = data;
            }
            tempBooks.push(tempBook)
        });
        BooksAPI.update(book, data);
    };

    render() {
        return (

            <div className="app">
                <Route path="/search" render={() => (
                    <Search books={this.state.books} changeBookShelf={this.changeBookShelf}/>
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    changeBookShelf={this.changeBookShelf}
                                    books={this.state.books}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search"/>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
