import React, { Component } from 'react';

class Navbar1 extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-bottom bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          ArtMarketplace using blockchain
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">Your current address is:- {this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar1;