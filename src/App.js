import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageTitle: '',
            imageUrl: '',
            images: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const imagesRef = firebase.database().ref('images');
        imagesRef.on('value', (snapshot) => {
            let images = snapshot.val();
            let newState = [];
            for (let image in images) {
                newState.push({
                    id: image,
                    title: images[image].imageTitle,
                    url: images[image].imageURL
                })
            }
            this.setState({
                images: newState
            })
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const imagesRef = firebase.database().ref('images');
        const image = {
            imageTitle: this.state.imageTitle,
            imageURL: this.state.imageUrl
        }
        imagesRef.push(image);
        this.setState({
            imageTitle: '',
            imageURL: ''
        })
    }

    render() {
        return (
            <div className="App">
                <section className="header">
                    <form className="inputFields" onSubmit={this.handleSubmit}>
                        <label>
                            <input type="text" placeholder="Image Title" name="imageTitle" onChange={this.handleChange}></input>
                            <input type="text" placeholder="Image URL" name="imageUrl" onChange={this.handleChange}></input>
                        </label>
                        <button>Add Image</button>
                    </form>
                </section>
                <section>
                    {this.state.images.map((image) => {
                        return (
                            <div className="image" key={image.id}>
                                <h3>{image.title}</h3>
                                <img alt={image.id} src={image.url} />
                            </div>
                        )
                    })}
                </section>
            </div>
        );
    }
}

export default App;
