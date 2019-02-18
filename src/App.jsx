import React from 'react';
import { Route } from 'react-router-dom';

import Game from './components/game.jsx';
import Classify from './components/classify.jsx';
import Nav from './components/nav.jsx';



class App extends React.Component {

	render() {
		return (
			<div className="App">

				<Nav />

				<div className="container">

					<main>

						<Route path="/game" component={ Game } />

						<Route path="/classify" component={ Classify } />

					</main>

				</div>

			</div>
		);
	}
}

export default App;