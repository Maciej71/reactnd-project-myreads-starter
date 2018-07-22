import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //Get books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //Update shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.filter(bookFromState => bookFromState.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves
            books={ this.state.books }
            onUpdateShelf={ this.updateShelf }
          />
        )}/>

        <Route path="/search" render={() => (
          <Search
            books={ this.state.books }
            onUpdateShelf={ this.updateShelf }
          />  
        )}/>
    
      </div>
    )
  }
}

export default BooksApp
