import React, { Component } from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'
import AllFish from '../fish/AllFish.js'
import AllBait from '../bait/AllBait.js'
import EveryInvoice from '../invoice/EveryInvoice.js'

export default class Footer extends Component {
    state = {
        selectedTab: 0
    }
   

    tabOne = () => {
        const previousState = { ...this.state }
        previousState.selectedTab = 0
        this.setState(previousState)
    }

    tabTwo = () => {
        const previousState = { ...this.state }
        previousState.selectedTab = 1
        this.setState(previousState)
    }

    tabThree = () => {
        const previousState = { ...this.state }
        previousState.selectedTab = 2
        this.setState(previousState)
    }

    render() {
        return (
            <div>
                <Paper>
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.onTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab
                            onClick={this.tabOne}
                            label="Fish" />
                        <Tab
                            onClick={this.tabTwo}
                            label="Bait" />
                        <Tab
                            onClick={this.tabThree}
                            label="Invoices" />
                    </Tabs>
                </Paper>
                
                {this.state.selectedTab === 0 ? <AllFish /> : null}
                {this.state.selectedTab === 1 ? <AllBait /> : null}
                {this.state.selectedTab === 2 ? <EveryInvoice /> : null}
                
            </div>
        )
    }
}