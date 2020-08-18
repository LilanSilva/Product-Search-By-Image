import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions';

import SerchByImage from '../images/search-by-image.jpg';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterItems: props.filterItems,
            allItems: props.items
        }
    }

    addToBasket = (id) => {
        this.props.addToCart(id);
    }

    openFileSelector() {
        document.getElementById("imageSelector").click();
    }

    async searchByImage(e) {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('fileName', "Img");

        let serverResponse = await fetch('https://localhost:44305/api/productsearch/byimage',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                },
                body: form
            }
        );

        let parentScope = this;
        serverResponse.json().then(function (data) {
            var filterItemsByImage = parentScope.state.allItems.filter(function (item) {
                return data.includes(item.category);
            });

            parentScope.setState({ filterItems: filterItemsByImage });
        });
    };

    render() {
        let itemList = this.state.filterItems.map(item => {
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
                <form>
                    <div id="divSerchByImage">
                        <input name="Avatar" style={{ display: "none" }} id='imageSelector' type="file" onChange={(e) => this.searchByImage(e)} />
                        <img className="serch-by-image" src={SerchByImage} alt="" onClick={() => { this.openFileSelector() }} />
                    </div>
                </form>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterItems: state.filterItems,
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)