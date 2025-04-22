// app.js

import GoogleSuggestions from './components/GoogleSuggestions'

import './App.css'

const suggestionsList = [
  {id: 1, suggestion: 'Price of Ethereum'},
  {id: 2, suggestion: 'Oculus Quest 2 specs'},
  {id: 3, suggestion: 'Tesla Share Price'},
  {id: 4, suggestion: 'Price of Ethereum today'},
  {id: 5, suggestion: 'Latest trends in AI'},
  {id: 6, suggestion: 'Latest trends in ML'},
]

const App = () => <GoogleSuggestions suggestionsList={suggestionsList} />

export default App


// index.js (GoogleSuggestions component)

// Write your code here
import './index.css'

import {Component} from 'react'

import SuggestionItem from '../SuggestionItem'

class GoogleSuggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      isSuggestionSelected: false,
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
      isSuggestionSelected: false,
    })
  }

  onSelectSuggestion = suggestionText => {
    this.setState({searchInput: suggestionText, isSuggestionSelected: true})
  }

  render() {
    // const {initialSuggestionsList, searchInput} = this.state
    const {searchInput, isSuggestionSelected} = this.state
    const {suggestionsList} = this.props
    let filteredSuggestionsList = suggestionsList.filter(eachItem =>
      eachItem.suggestion.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (isSuggestionSelected) {
      filteredSuggestionsList = filteredSuggestionsList.filter(
        eachItem =>
          eachItem.suggestion.toLowerCase() === searchInput.toLowerCase(),
      )
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          className="google-icon"
          alt="google logo"
        />
        <div className="card-container">
          <div className="search-box-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              className="search-icon"
              alt="search icon"
            />
            <input
              type="search"
              className="search-box"
              placeholder="Search Google"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
          </div>
          <ul className="suggestion-items-container">
            {filteredSuggestionsList.map(eachItem => (
              <SuggestionItem
                eachItemDetails={eachItem}
                key={eachItem.id}
                onSelectSuggestion={this.onSelectSuggestion}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default GoogleSuggestions


// index.js (SuggestionItem componennt)

// Write your code here
import './index.css'

const SuggestionItem = props => {
  const {eachItemDetails, onSelectSuggestion} = props
  const {suggestion} = eachItemDetails
  const handleClick = () => {
    onSelectSuggestion(suggestion)
  }
  return (
    <li>
      <div className="suggestion-container">
        <p className="suggestion-heading">{suggestion}</p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          className="arrow-icon"
          alt="arrow-icon"
          onClick={handleClick}
        />
      </div>
    </li>
  )
}

export default SuggestionItem

