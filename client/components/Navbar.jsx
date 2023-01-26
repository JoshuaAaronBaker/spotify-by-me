import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

export default class Navbar extends React.Component {

  render() {
    return (
        <div className='row navbar'>
        <nav className="flex-props">
            <div>
              <a href="#home" id='home'><FontAwesomeIcon className='icon' icon={faHome} /></a>
              <div className='nav-text-padding'>
                <a href="#home">Home</a>
              </div>
            </div>
          <div>
            <a href="#home" id='home'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></a>
            <div className='nav-text-padding'>
              <a href="#search">Search</a>
            </div>
          </div>
          </nav>
        </div>
    );
  }
}
