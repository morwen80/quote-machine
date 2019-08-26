import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
let quotesData = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;

const twit = <FontAwesomeIcon icon={faTwitter} />

class App extends Component {
  constructor(){
    super()
    this.state = {
      text: "",
      author: ""
    }
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    const random = Math.floor(Math.random() * Math.floor(101));

    return fetch(quotesData)
      .then(resp => resp.json())
      .then(data => this.setState({ text: data.quotes[random].quote, author: data.quotes[random].author}))
  };

  render(){
    const tweetBase = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + this.state.text + '" ' + this.state.author);

    return(
        <div id="wrapper">
        <div id="title">Quote Machine</div>
          <div id="quote-box">
            <div id="text"><FontAwesomeIcon icon={faQuoteRight} id="quoteR" />{this.state.text} <FontAwesomeIcon icon={faQuoteLeft} id="quoteL" /></div>
            <div id="author">{this.state.author}</div>

            <div id="buttons">
              <button id="new-quote" onClick={this.fetchData}>new quote</button>
              <a id="tweet-quote" href={tweetBase} target="_blank" rel="noopener noreferrer">
              <button className="tweet">{twit} tweet quote</button></a>
            </div>
          </div>
        </div>
    )
  }
}

export default App;
