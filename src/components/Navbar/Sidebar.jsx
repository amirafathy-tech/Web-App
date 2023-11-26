
import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, ProSidebar, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaProjectDiagram, FaBook, FaCalendar, FaShoppingCart, FaBars, FaAlignJustify } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx'
import style from './Sidebar.module.css';

const themes = {
    light: {
        sidebar: {
            backgroundColor: '#ffffff',
            color: '#607489',
        },
        menu: {
            menuContent: '#fbfcfd',
            icon: '#0098e5',
            hover: {
                backgroundColor: '#c5e4ff',
                color: '#44596e',
            },
            disabled: {
                color: '#9fb6cf',
            },
        },
    },
    dark: {
        sidebar: {
            backgroundColor: '#0b2948',
            color: '#8ba1b7',
        },
        menu: {
            menuContent: '#082440',
            icon: '#59d0ff',
            hover: {
                backgroundColor: '#00458b',
                color: '#b6c8d9',
            },
            disabled: {
                color: '#3e5e7e',
            },
        },
    },
};


const SidebarComponent = ({ logOut }) => {
 

    //////
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);
    const [theme, setTheme] = useState('light')
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleSidebarOnSmallScreens = () => {
        setToggled(!toggled)
    };
    const handleNavbarToggle = () => {
        toggleSidebar();
    };

    const menuItemStyles = {
        root: {
            fontSize: '16px',
            fontWeight: 400,
        },
        // icon: { 
        //   color: themes[theme].menu.icon, 
        //   [`&.${menuClasses.disabled}`]: { 
        //     color: themes[theme].menu.disabled.color, 
        //   }, 
        // }, 
        SubMenuExpandIcon: {
            color: 'black',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor: 'transparent'
            // level === 0 
            //   ? hexToRgba(themes[theme].menu.menuContent&& !collapsed ? 0.4 : 1) 
            //   : 'transparent', 
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: '#00ADB5',
                // hexToRgba(themes[theme].menu.hover.backgroundColor ? 0.8 : 1), 
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 400 : undefined,
        }),
    };

return (
    <div style={{display:'flex',height:'100%'}}>

    <Sidebar
                // collapsed={collapse}
                // breakPoint={breakPoint?"sm":""}

                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                className={style.sidebar}
                 breakPoint='md'
            //   style={{ background: '#333' }}
            >
                {/* <div className={style.toggleButton} onClick={handleNavbarToggle}>
        <FaBars />
      </div> */}
                {/* <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 1, marginBottom: '32px' }}> */}
                    <Menu
                        menuItemStyles={menuItemStyles}
                    // menuItemStyles={{
                    //   button: {
                    //     '&.active': {
                    //       backgroundColor: '#13395e',
                    //       color: '#b6c8d9',
                    //     },
                    //   },
                    // }}
                    >
                        <MenuItem>
                            <Link className={`${style.link}`} to="/home">
                                {/* <FaHome /> */}
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className={`${style.link}`} to="/about" >

                                About
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className={`${style.link}`} to="/company">
                                {/* <FaCalendar /> */}
                                Company
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link className={`${style.link}`} to="/project">
                                {/* <FaProjectDiagram /> */}
                                Project
                            </Link>
                        </MenuItem>
                        <SubMenu label="Buildings">
                            <MenuItem>
                                <Link className={`${style.link}`} to="/buildingtype">
                                    {/* <FaBuilding /> */}
                                    Building Type
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/building">
                                    {/* <FaBuilding /> */}
                                    Buildings
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="Units">
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitview">

                                    Unit View
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitusage">

                                    Unit Usage
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitstatus">

                                    Unit Status
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitfloor">

                                    Unit Floor
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitmeasurement">

                                    Unit Measurement
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitfixture">

                                    Unit Fixture
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unitorientation">

                                    Unit Orientation
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/unit">

                                    Units
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem>
                            <Link className={`${style.link}`} to="/location">

                                Location
                            </Link>
                        </MenuItem>
                        <SubMenu label="Price"  >
                            {/* <label style={{ fontSize: '16px' }}>Price</label> */}
                            <MenuItem>
                                <Link className={`${style.link}`} to="/pricetype">
                                    
                                    Price Type
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/methodOfCalc">
                                  
                                    MethodOfCalculation 
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link className={`${style.link}`} to="/currency">
                                
                                    Currency
                                </Link>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem>
                            <Link className={`${style.link}`} to="/profit">

                                Profit
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <Link className={`${style.link}`} onClick={logOut}>

                                LogOut
                            </Link>
                        </MenuItem>
                    </Menu>
          
      
</Sidebar >

    <main>
        <div style={{ padding: '16px 24px', color: '#44596e' }}>
            <div style={{ marginBottom: '16px', position: 'absolute', left: '1%', top: '4%    ' }}>
                {broken && (
                    <button className={`sb-button ${style.buttontoggle}`} onClick={() => setToggled(!toggled)}>
                        <RxHamburgerMenu />
                    </button>
                )}
            </div>
        </div>
    </main>
    
</div >
    );
};

export default SidebarComponent;