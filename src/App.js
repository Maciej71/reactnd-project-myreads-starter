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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves
            books={this.state.books}
          />
        )}/>

        <Route path="/search" render={() => (
          <Search/>  
        )}/>
    
      </div>
    )
  }
}

export default BooksApp
