import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";
import logo from '../../../src/assets/images/Nirvana-logo.jpg';
import sidebar_items from "../../assets/JsonData/sidebar-routes.json";
//  import 'boxicons';

const SidebarItem = props => {
    const active = props.active ? 'active' : ''

    return(
        <div className="sidebar-item">
            <div className={`sidebar-item-inner ${active}`}>
               <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>

        </div>
    )
}

const Sidebar = props => {
    const activeItem =  sidebar_items.findIndex(item => item.route === props.location.pathname)
    return (
        <div className='sidebar'>
            <div className="sidebar-logo">
                {/* <img className="sidebar-logo-img" src={logo} alt="logo"/> */}
                <p className="logo-text">Admin Panel</p>
            </div>
            {
            sidebar_items.map((item,index)=>(
                <Link to={item.route} key={index}>
                    {/* <div>
                        {item.display_name}
                    </div> */}
                    <SidebarItem
                      title={item.display_name}
                      icon={item.icon}
                      active={index === activeItem}
                    />
                </Link>
            ))
        }
        </div>
        
    )
}

export default Sidebar;