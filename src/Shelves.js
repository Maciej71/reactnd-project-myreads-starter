import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelves extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    render() {
        const { books } = this.props

        function isWantedShelf(book, shelf) {
            return (book.shelf === shelf)
        }

        //Split books by the shelves 
        const currentlyReading = books.filter((book) => isWantedShelf(book, 'currentlyReading'))
        const wantToRead = books.filter((book) => isWantedShelf(book, 'wantToRead'))
        const read = books.filter((book) => isWantedShelf(book, 'read'))

        const splitedBooks =[currentlyReading, wantToRead, read]
        const shelvesNames = ['Currently Reading', 'Want to Read', 'Read']

        console.log(currentlyReading)
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {/* Display books from chosen shelf */}
                {shelvesNames.map((shelf, index) => {
                    return(
                            <div className="bookshelf" key={index}>
                                <h2 className="bookshelf-title">{shelf}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {splitedBooks[index].map(
                                            (book) => (
                                                <li key={book.id}>
                                                  <Book book={book}/>
                                                </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                    )
                })}
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
        )
    }
}

export default Shelves