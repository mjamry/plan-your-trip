import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import MainMenu from './../components/MainMenu'
import AppContent from './../components/AppContent'
import Header from './../components/Header'

const PageLayout = ({children}) => {
    return (
        <>
            <Header />
            <Toolbar />
            <MainMenu />
            <AppContent>
                {children}
            </AppContent>
        </>
    )
}

export default PageLayout