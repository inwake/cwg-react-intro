import React from 'react';

import { Link } from 'react-router-dom';



function Nav(props) {

    return (
        <nav>
            <div className="nav-wrapper blue darken-2">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/game">Game</Link></li>
                    <li><Link to="/classify">Classify</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;