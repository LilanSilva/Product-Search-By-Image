import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions';
import ImageUploader from 'react-images-upload';

import SerchByImage from '../images/search-by-image.jpg';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    addToBasket = (id) => {
        this.props.addToCart(id);
    }

    searchByImage = () => {
        var x = document.getElementById("divImageUploader");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    render() {
        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={item.img} alt={item.title} />
                        <span className="card-title">{item.title}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.addToBasket(item.id) }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{item.desc}</p>
                        <p><b>Price: {item.price} (Rs)</b></p>
                    </div>
                </div>
            )
        })

        return (
            <div className="container">
                <h3 className="center">Our items</h3>
                <div id="divSerchByImage">
                    <img className="serch-by-image" src={SerchByImage} alt="" onClick={() => { this.searchByImage() }} />
                </div>
                <div id="divImageUploader" style={{ display: "none" }}>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={1024000}
                    />
                </div>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)