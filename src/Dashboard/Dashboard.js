import React, { Component } from 'react'
import TutorDashboard from './DashboardTutor'
import DashboardProfile from './Profile/DasboardProfile'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashboardProfile/>
            </div>
        )
    }
}
