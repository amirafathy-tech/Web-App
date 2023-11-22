
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import {FaHome,FaBuilding, FaProjectDiagram,FaBook, FaCalendar, FaShoppingCart, FaBars } from 'react-icons/fa';
import style from './Sidebar.module.css';

const SidebarComponent = ({logOut}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNavbarToggle = () => {
    toggleSidebar();
  };

  return (
    <Sidebar
      collapsed={collapsed}
      className={style.sidebar}
    //   style={{ background: '#333' }}
    >
      <div className={style.toggleButton} onClick={handleNavbarToggle}>
        <FaBars />
      </div>
      <Menu
        menuItemStyles={{
          button: {
            '&.active': {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem>
          <Link className={`${style.link}`} to="/home">
          {/* <FaHome /> */}
            Home
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
    </Sidebar>
  );
};

export default SidebarComponent;