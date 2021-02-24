import React from "react";
import "./styles.scss";

import Search from "../../services/search";

class SearchBar extends React.Component {
  state = {
    term: "",
  };

  onInputChange = (e) => {
    this.setState({ term: e.target.value });
    this.onSearch();
  };

  onSearch() {
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.search(this.state.term), 500);
  }

  search(term) {
    // Clear search results
    this.refs.results.innerHTML = "";

    // Get the top ten search results
    this.searchResults = Search.search(term).slice(0, 10);

    // Display search results on UI
    this.searchResults.forEach((result) => this.displaySearchResult(result));
  }

  /** Add search result row to UI */
  displaySearchResult(searchResult) {
    let layerItem = document.createElement("div");
    layerItem.textContent = searchResult.item.name;
    layerItem.addEventListener("click", () => this.searchResultSelected(searchResult));
    this.refs.results.appendChild(layerItem);
  }

  //   displaySearchResult(searchResult) {
  //     return (
  //       <div onClick={() => this.searchResultSelected(searchResult)}>
  //         {searchResult.name}
  //       </div>
  //     );
  //   }

  /** Display the selected search result  */
  searchResultSelected(searchResult) {
    // Clear search input and results
    this.refs.input.value = "";
    this.refs.results.innerHTML = "";

    this.props.onSearchClick(searchResult);

    // Send selected result to listeners
    // this.triggerEvent("resultSelected", searchResult);
  }

  render() {
    return (
      <div className="search-container">
        <div className="search-bar">
          <input
            ref="input"
            type="text"
            name="search"
            placeholder="Search..."
            value={this.state.term}
            className="search-input"
            onChange={this.onInputChange}
          ></input>
        </div>
        <div ref="results" className="search-results">
          {/* {this.displaySearchResult} */}
        </div>
      </div>
    );
  }
}

export default SearchBar;
