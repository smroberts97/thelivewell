import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class AddNewBaitItem extends Component {
    state = {
        newBait: '',
        newBrand: '',
        newType: '',
        newColor: ''
    }

    creatNewPiece = () => {
        const newPiece = {
            name: this.state.newBait,
            brand: this.state.newBrand,
            type: this.state.newType,
            color: this.state.newColor
        }
        axios.post('/api/bait', newPiece)
    }

    onNewBaitChange = (event) => {
        const newBait = event.target.value;
        this.setState({ newBait })
    }

    onNewBrandChange = (event) => {
        const newBrand = event.target.value;
        this.setState({ newBrand })
    }

    onNewTypeChange = (event) => {
        const newType = event.target.value;
        this.setState({ newType })
    }

    onNewColorChange = (event) => {
        const newColor = event.target.value;
        this.setState({ newColor })
    }

    render() {
        return (
            <div className="form-container">
                <h2>Add Bait</h2>
                <form>
                    <input
                        type='text'
                        placeholder='Bait'
                        name="newBait"
                        required="required"
                        onChange={this.onNewBaitChange}
                        value={this.state.newBait}
                    />
                    <input type='text'
                        placeholder='Brand'
                        name="newProduct"
                        required="required"
                        onChange={this.onNewBrandChange}
                        value={this.state.newBrand}
                    />
                    <input type='text'
                        placeholder='Type'
                        name="newType"
                        required="required"
                        onChange={this.onNewTypeChange}
                        value={this.state.newType}
                    />
                    <input type='text'
                        placeholder='Color'
                        name="newColor"
                        required="required"
                        onChange={this.onNewColorChange}
                        value={this.state.newColor}
                    />
                    <input
                        type='submit'
                        onClick={() => this.creatNewPiece()}
                    />
                </form>
                <br />
                <br />
                <Link to='/'>Home</Link>
            </div>
        )
    }
}