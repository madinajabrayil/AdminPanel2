import React,{useRef, useState, useEffect} from 'react';
import './ThemeMenu.css';
import { useDispatch } from 'react-redux';
import ThemeAction from '../../redux/actions/ThemeAction';

const mode_settings =[
    {
        id:"light",
        name:"Light",
        background:"light-background",
        class:"theme-mode-light"
    },{
        id:"dark",
        name:"Dark",
        background:"dark-background",
        class:"theme-mode-dark"
    }
]
const color_settings =[
    {
        id:"blue",
        name:"Blue",
        background:"blue-background",
        class:"theme-color-blue"
    },{
        id:"red",
        name:"Red",
        background:"red-background",
        class:"theme-color-red"
    },{
        id:"green",
        name:"Green",
        background:"green-background",
        class:"theme-color-green"
    },{
        id:"yellow",
        name:"Yellow",
        background:"yellow-background",
        class:"theme-color-yellow"
    },{
        id:"primary",
        name:"Primary",
        background:"primary-background",
        class:"theme-color-primary"
    }
]

const clickOutSideRef = (content_ref,toggle_ref) =>{
    document.addEventListener('mousedown',(e)=>{
        //user click toggle
        if(toggle_ref.current && toggle_ref.current.contains(e.target)){
            content_ref.current.classList.toggle('active')
        } else{
            //user click outside toggle and content
            if(content_ref.current && !content_ref.current.contains(e.target)){
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const ThemeMenu = () => {
    const menu_ref = useRef(null);
    const menu_toggle_ref = useRef(null);

    clickOutSideRef(menu_ref,menu_toggle_ref)

    const setActiveMenu = () => menu_ref.current.classList.add('active')
    const closeMenu = () => menu_ref.current.classList.remove('active')
 
    const [currMode, setcurrMode] = useState('light')
    const [currColor, setcurrColor] = useState('blue')
 
    const dispatch = useDispatch()

    const setMode = mode => {
        setcurrMode(mode.id)
        localStorage.setItem('themeMode',mode.class)
        dispatch(ThemeAction.setMode(mode.class))
    }

    const setColor = color => {
        setcurrColor(color.id)
        localStorage.setItem('colorMode',color.class)
        dispatch(ThemeAction.setColor(color.class))
    }

    useEffect(() => {
       const themeClass = mode_settings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light'))
       
       const colorClass = color_settings.find(e => e.class === localStorage.getItem('colorMode', 'theme-mode-light'))

       if(themeClass !== undefined) setcurrMode(themeClass.id)

       if(colorClass !== undefined) setcurrColor(colorClass.id)

    //    setcurrMode(themeClass !== undefined ? themeClass.id : 'light')
    }, [])

    return (
        <div>
            <button ref={menu_toggle_ref} className="dropdown-theme-toggle" onClick={()=>setActiveMenu()}>
                <i className="fas fa-palette theme-icon"></i>
            </button>
            <div ref={menu_ref} className="theme-menu">
                <h4>Theme Settings</h4>
                <button className="theme-menu-close" onClick={()=> closeMenu()}>
                 <box-icon name='x'></box-icon>
                </button>
                <div className="theme-menu-select">
                    <span>Choose mode</span>
                    <ul className="mode-list">
                        {
                            mode_settings.map((item,index)=>(
                                <li key={index} onClick={()=>setMode(item)}>
                                    <div className={`mode-list-color ${item.background} 
                                         ${item.id === currMode ? 'active' : ''}`}>
                                        {/* <box-icon name='check'></box-icon> */}
                                        {/* <i className='bx bx-check'></i> */}
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <span>{item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="theme-menu-select">
                    <span>Choose color</span>
                    <ul className="mode-list">
                        {
                            color_settings.map((item,index)=>(
                                <li key={index} onClick={()=>setColor(item)}>
                                    <div className={`mode-list-color ${item.background}
                                    ${item.id === currColor ? 'active' : ''}`}>
                                        {/* <box-icon name='check'></box-icon> */}
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <span>{item.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ThemeMenu;
