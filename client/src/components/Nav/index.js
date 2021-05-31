import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Not using hooks here which would require functional "dumb" components; using extends Component from React, which requires a render() and return() and declaring state/using this.state all the time. Also requires componentDIdMount and componentWillMount rather than useEffect!
class Nav extends Component {
  state = {
    open: false,
    width: window.innerWidth
  };

  // Some more css magic here!
  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    // Some more css magic here!
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
       // Some more css magic here!
    window.removeEventListener("resize", this.updateWidth);
  }

render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
            {/* I could use NavLink here instead. That way you don't have to do all this css mental gymnaastics! */}
          <Link className="navbar-brand" to="/">
            Google Books
          </Link>
          <button
            onClick={this.toggleNav}
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`${this.state.open ? "" : "collapse "}navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  onClick={this.toggleNav}
                  className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                  to="/"
                >
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={this.toggleNav}
                  className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                  to="/saved"
                >
                  Saved
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
}

export default Nav;