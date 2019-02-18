import React from 'react';



class Classify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState( { [name]: value } );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState( { url: '' } );
        this.setState( { url: 'https://source.unsplash.com/featured/1024x1024' } );
        this.props.getImageClassification('https://source.unsplash.com/featured/1024x1024');
    }

    render() {
        return (
            <main>

                <form onSubmit={ this.handleSubmit }>

                    

                </form>

            </main>
        );
    }
}

export default Classify;