import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BaitCard from '../cards/BaitCard.js'
import TextField from '@material-ui/core/TextField'


export default class AllBait extends Component {
    state = {
        baitList: [],
        filteredList: []
    }

    componentDidMount() {
        this.refreshBait()
    }

    refreshBait = () => {
        axios.get('/api/bait')
            .then((res) => {
                this.setState({ baitList: res.data, filteredList: res.data })
            })
    }

    onPieceDeleteClick = (baitId) => {
        axios.delete(`/api/bait/${baitId}`)
            .then(() => {
                this.refreshBait()
            })
    }

    handleChange = (e) => {
        let currentList = []
        let newList = []
        if (e.target.value !== '') {
            currentList = this.state.baitList
            newList = currentList.filter((item) => {
                const lowerCaseIncomingItem = item.name.toLowerCase()
                const lowerCaseTextField = e.target.value.toLowerCase()
                return lowerCaseIncomingItem.includes(lowerCaseTextField)
            })
        } else {
            newList = this.state.baitList
        }
        this.setState({filteredList: newList})
    }

    render() {
        return (
            <div className='allCards'>
                <form>
                    <TextField
                        id='standard-basic'
                        label='Search By Bait Name'
                        onChange={this.handleChange}
                        />
                </form>
                <br />
                <Link to="/bait/new-bait">Add New Bait To List</Link>
                <br />
                {this.state.filteredList.map((piece) => {
                    const pieceLinkId = `/bait/${piece._id}`
                    const pieceId = piece._id
                    return (
                        <div
                            key={piece._id}>
                            <BaitCard
                                name={piece.bait}
                                brand={piece.brand}
                                itemLink={pieceLinkId}
                                deleteItem={() => this.onPieceDeleteClick(pieceId)}
                            />
                            <br />
                        </div>
                    )
                })}
                <br />
                <br />
            </div>
        )
    }
}