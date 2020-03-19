import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class AddNewFish extends Component {
    state = {
        newFishSpecies: '',
        newFishLocation: '',
        newFishComment: ''
    }

    creatNewCustomer = () => {
        const newCustomer = {
            fishSpecies: this.state.newFishSpecies,
            fishLocation: this.state.newFishLocation,
            fishComment: this.state.newFishComment
        }
        axios.post('/api/fish', newFish)
    }

    onNewFishSpeciesChange = (event) => {
        const newFishSpecies = event.target.value;
        this.setState({newFishSpecies})
    }

    onNewFishLocationChange = (event) => {
        const newFishLocation = event.target.value;
        this.setState({newFishLocation})
    }

    onNewFishCommentChange = (event) => {
        const newFishComment = event.target.value;
        this.setState({newFishComment})
    }

    render() {
        return (
            <div className="form-container">
                <h2>Add New Fish</h2>
                <form>
                    <input
                        type='text'
                        placeholder='Fish Species'
                        name="newFishSpecies"
                        required="required"
                        onChange={this.onNewFishSpeciesChange}
                        value={this.state.newFishSpecies}
                    />
                    <input type='text'
                        placeholder='Location of Catch'
                        name="newFishLocation"
                        required="required"
                        onChange={this.onNewFishLocationChange}
                        value={this.state.newFishLocation}
                    />
                    <input type='text'
                        placeholder='Comment'
                        name="newFishComment"
                        required="required"
                        onChange={this.onNewFishCommentChange}
                        value={this.state.newFishComment}
                    />
                    <input
                        type='submit'
                        onClick={() => this.createNewFish()}
                    />
                </form>
                <br/>
                <br/>
                <Link to='/'>Home</Link>
            </div>
        )
    }
}