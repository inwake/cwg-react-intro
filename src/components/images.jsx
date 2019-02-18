import React from 'react';



class Images extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageStyle: { padding: '3px', height: 150, objectFit: 'cover' }
        }
    }

    handleImageClick = (event) => {
        if (!this.props.gameOver) {
            const isCorrect = Boolean(event.target.correct);

            this.props.images.forEach( (image, index) => {
                if ( isCorrect ) {
                    event.target.style.border = "5px solid green";
                } else {
                    event.target.style.border = "3px solid red";
                    this.props.endGame();
                    document.querySelector(`img[index="${ this.props.winIndex }"]`).style.border = "3px solid green";
                    this.props.endGame();
                }
            } );
        }
    }

    render() {
        return (
            this.props.images ?

                <div className="container">

                    <div className="row">
                        { this.props.images.slice(0, 4).map( (image, index) => {
                            return <img key={ image.id }
                                onClick={ this.handleImageClick }
                                index={ index }
                                correct={ index === this.props.winIndex ? 'true' : 'false' }
                                src={ image.urls.regular }
                                style={ this.state.imageStyle }
                                className="col s12 m3"
                                alt=""
                            />
                        } ) }
                    </div>

                    <div className="row">
                        { this.props.images.slice(4, 8).map( (image, index) => {
                            return <img key={ image.id }
                                onClick={ this.handleImageClick }
                                index={ index + 4 }
                                correct={ index === this.props.winIndex ? 'true' : 'false' }
                                src={ image.urls.regular }
                                style={ this.state.imageStyle }
                                className="col s12 m3"
                                alt=""
                            />
                        } ) }
                    </div>

                </div>

            : <React.Fragment />
        );
    }
}

export default Images;