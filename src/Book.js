import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    render() {
        const { book, onUpdateShelf } = this.props
        let background = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : '#fff'

        return(
            //display a book
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `${background}` }}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf ? book.shelf : "none"} onChange= {
                        (event) => onUpdateShelf(book, event.target.value)
                    }>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title ? book.title : 'Title not Available'}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Author not available'}</div>
            </div>
        )
    }
}

export default Book