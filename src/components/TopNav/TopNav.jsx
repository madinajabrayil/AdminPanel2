import React from 'react';
import {Link} from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import ThemeMenu from '../ThemeMenu/ThemeMenu';
import './TopNav.css';
import 'boxicons';
import notifications from '../../assets/JsonData/notification.json';
import user_img from '../../assets/images/profile.png';
import user_menu from '../../assets/JsonData/user-menus.json';

const current_user={
    display_name: 'Madina Jabrayil',
    profil_photo: user_img
}

const renderNotificationItems = (item,index) => (
    <div className="notification-item" key={index}>
        {/* <i class="far fa-bell"></i> */}
        <box-icon  name={item.icon} ></box-icon>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user)=>(
    <div className="topnav_right-user">
        <div className="topnav_right-user_img">
            <img src={user.profil_photo} alt="User Profile Photo" />
        </div>
        <div className="topnav_right-user_name">
           {user.display_name}
        </div>
    </div>
)

const renderUserMenu = (item,index)=>(
    <Link to='/' key={index}>
        <div className="notification-item">
            <box-icon  name={item.icon} ></box-icon>
            <span>{item.content}</span>
        </div>
    </Link>
)
const TopNav = () => {
    return (
        <div className="topnav">
            <div className="topnav-search">
                <input type="text" className="tp-search-input" placeholder="Search something.."/>
                <i class="fas fa-search search-icon"></i>
            </div>
            <div className="topnav-right">
                <div className="topnav-dropdown topnav-right-item">
                    <Dropdown
                        customToggle = {() => renderUserToggle(current_user)}
                        contentData={user_menu}
                        renderItems={(item,index)=>renderUserMenu(item,index)}
                        // icon="user"
                    />
                </div>
                <div className="topnav-dropdown topnav-right-item">
                    <Dropdown
                        icon="far fa-bell"
                        badge="13"
                        contentData = {notifications}
                        renderItems = {(item,index) => renderNotificationItems(item,index)}
                        renderFooter={()=><Link to='/'>View All</Link>} />
                </div>
                <div className="topnav-themes topnav-right-item">
                    <ThemeMenu/>
                </div>
            </div>
           
        </div>
    )
}

export default TopNav;