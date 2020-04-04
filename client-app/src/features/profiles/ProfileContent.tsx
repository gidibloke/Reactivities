import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from "./ProfilePhotos";



const panes = [
    {menuItem: 'About', render: () => <Tab.Pane>About Content goes here</Tab.Pane>},
    {menuItem: 'Photos', render: () => <ProfilePhotos/>},
    {menuItem: 'Activities', render: () => <Tab.Pane>Activities Content goes here</Tab.Pane>},
    {menuItem: 'Followers', render: () => <Tab.Pane>Followers Content goes here</Tab.Pane>},
    {menuItem: 'Following', render: () => <Tab.Pane>Following Content goes here</Tab.Pane>},
    ]
const ProfileContent = () => {
    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            activeIndex={1}
        />
    )
}
export default ProfileContent