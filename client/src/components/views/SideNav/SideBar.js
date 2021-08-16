import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const NavLogo = styled.button`
  width: 140px;
  height: 45px;
  font-family: 'Unica One';
  margin-top: 6vh;
  margin-bottom: 6vh;
  font-size: 22px;
  text-transform: lowercase;
  letter-spacing: 2.5px;
  color: #5A2360;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 15px 20px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-3px);
  }
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {

    return (
        <>
            <IconContext.Provider value={{ color: '#00000' }}>
                <SidebarNav>
                    <SidebarWrap>
                        <div className={'wrap'}>
                            <NavLogo to='#'>
                                panthera
                            </NavLogo>
                        </div>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
