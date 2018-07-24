import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        if(query) {
            this.setState({ query: query })
            BooksAPI.search(query.trim()).then((books) => {
                if(books.length > 0) {
                    this.setState({ books })
                    //Books which appear in search results and have been alredy put on shelf
                    const duplicatedBooks = this.state.books.filter(
                        (book) => this.props.books.map(
                            book => book.id).includes(book.id)
                    )
                    // Set correct state for books in search results
                    this.state.books.forEach((book) => {
                        if(duplicatedBooks.includes(book)) {
                            book.shelf = this.props.books.find((bookOnShelf) => {
                                return bookOnShelf.id === book.id
                            }).shelf
                        } else {
                          book.shelf === 'none'
                        }
                    })
                    this.forceUpdate()
                } else {
                    this.setState({ books: [] })
                }
              }
            )
        } else {
            this.setState({ query: '', books: [] })
        }
      }

    render() {
        const { query, books } = this.state
        const { onUpdateShelf } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                      to="/"
                      className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                      <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)
                    }
                      />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(
                            (book) => (
                                <li key={book.id}>
                                    <Book book={book}
                                    onUpdateShelf={ onUpdateShelf }
                                    />
                                </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search
