import React from 'react';
import axios from 'axios';

import Images from './images.jsx';

// Please replace the keys below with your FREE api keys

const CLARIFAI_KEY = 'Replace with your api key. You can signup here: https://clarifai.com/developer/account/signup';
const UNSPLASH_KEY = 'Replace with your api key. You can signup here: https://unsplash.com/developers';



class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
			images: [],
            concepts: [],
            winIndex: -1,
            gameOver: false
		}

		this.getImages();
		this.getImageClassification = this.getImageClassification.bind(this);
    }

    getImages = () => {

		axios.get('https://api.unsplash.com/photos/random', {
			params: { count: 8 },
			headers: {
				'Authorization': `Client-ID ${ UNSPLASH_KEY }`
			}
		} ).then( res => {
            res.data.forEach( (image, index) => image.index = index );
			this.setState( { images: res.data }, () => this.getImageClassification(res.data) );
        } );
		
	}

	async getImageClassification(images) {

        const randIndex = Math.floor( Math.random() * 8 );
        const randImg = images[ randIndex ].urls.regular;
        
        this.setState( { winIndex: randIndex } );

		const response = await axios( {
			method: 'post',
			url: 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/versions/aa7f35c01e0642fda5cf400f543e7c40/outputs',
			headers: {
				'Authorization': `Key ${ CLARIFAI_KEY }`,
				'Content-Type': 'application/json'
			},
			data: {
				inputs: [
					{
						data: {
							image: {
								url: randImg
							}
						}
					}
				]
			}
		} );

        this.setState( { concepts: response.data.outputs[0].data.concepts.splice(0, 5) } );
    }
    
    endGame = () => {
        this.setState( { gameOver: true } );
    }

    reset = () => {
        this.setState( {
			images: [],
            concepts: [],
            winIndex: -1,
            gameOver: false
		} );
    }

    render() {
        return (
            <main>

                <div className="row">
                    <div className="col s12 m8 offset-m2">

                        <div className="card">

                            <div className="card-content">

                                <div className="center">
                                    <h1 className="flow-text">Guess the classified image!</h1>
                                </div>

                                <ul className="collection">

                                    { this.state.concepts.length > 0 ? this.state.concepts.map( (concept, index) => {
                                        return (
                                            <li key={ index } className="collection-item">{ concept.name }<span className="right">{ (concept.value * 100).toFixed(1) + '%' }</span></li>
                                        );
                                    } ) : <React.Fragment /> }

                                </ul>

                                <div className="center">
                                    <button className="btn green" onClick={ () => {
                                        this.reset();
                                        this.getImages();
                                    } }>play</button>
                                </div>

                            </div>

                        </div>

                    </div>
                    
                </div>

                <Images images={ this.state.images }
                    winIndex={ this.state.winIndex }
                    gameOver={ this.state.gameOver }
                    endGame={ this.endGame }
                />

            </main>
        );
    }
}

export default Game;