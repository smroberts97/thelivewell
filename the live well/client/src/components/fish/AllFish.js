import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import FishCard from '../cards/FishCard.js'
import TextField from '@material-ui/core/TextField'

export default class AllFish extends Component {

    state = {
        fishList: [],
        filteredList: []
    }

    componentDidMount() {
        this.refreshFish()
    }

    refreshFish = () => {
        axios.get('/api/fish')
            .then((res) => {
                this.setState({ fishList: res.data, filteredList: res.data })
            })
    }

    onFishDeleteClick = (fishId) => {
        axios.delete(`/api/fish/${fishId}`)
            .then(() => {
                this.refreshFish()
            })
    }

    handleChange = (e) => {
        let currentList = []
        let newList = []
        if (e.target.value !== '') {
            currentList = this.state.fishList
            newList = currentList.filter((item) => {
                const lowerCaseIncomingItem = item.fishSpecies.toLowerCase() + ' ' + item.fishLocation.toLowerCase();
                const lowerCaseTextField = e.target.value.toLowerCase();
                return lowerCaseIncomingItem.includes(lowerCaseTextField)
            })
        } else {
            newList = this.state.fishList
        }
        this.setState({filteredList: newList})
    }


    render() {

        return (
            <div className='allCards'>
                <form>
                    <TextField 
                        id='standard-basic'
                        label='Search By Fish Catch'
                        onChange={this.handleChange}
                        />
                </form>
                <br />
                <Link to="/fish/create-fish">Add New Fish</Link>
                <br />
                {this.state.filteredList.map((client) => {
                    const singleFishLink = `/fish/${client._id}`
                    const fishId = client._id
                    return (
                        <div key={client._id}>
                            <FishCard
                                cfn={client.fishSpecies}
                                cln={client.fishLocation}
                                fishLink={singleFishLink}
                                fishPro={client.fishComment}
                                deleteFish={() => this.onFishDeleteClick(fishId)}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}