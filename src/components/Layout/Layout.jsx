import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Layout.css'
import Routes from '../Routes';
import Sidebar from '../Sidebar/Sidebar';
import TopNav from '../TopNav/TopNav';
import ThemeAction from '../../redux/actions/ThemeAction';

 const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer )
    const dispatch = useDispatch();

    useEffect(()=>{
        const themeClass =localStorage.getItem('themeMode', 'theme-mode-light')
       
        const colorClass =  localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    },[dispatch])

    return (
        <BrowserRouter>
            <Route render={(props)=>(
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props}/>
                    <div className="layout-content">
                        <TopNav/>
                        <div className="layout-content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout;