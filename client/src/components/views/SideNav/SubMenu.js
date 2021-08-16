import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled.button`
  width: 140px;
  height: 35px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  text-align: left;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 5px 15px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-3px);
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled.button`
  width: 120px;
  height: 30px;
  margin-left: 1rem;;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  text-align: left;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 4px 12px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-2px);
  }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <div className={'wrap'}>
                <Link to={item.path}>
                    <SidebarLink onClick={item.subNav && showSubnav}>
                        <div>
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </div>
                        <div>
                            {item.subNav && subnav
                                ? item.iconOpened
                                : item.subNav
                                    ? item.iconClosed
                                    : null}
                        </div>
                    </SidebarLink>
                </Link>
            </div>
            {subnav &&
            item.subNav.map((item, index) => {
                return (
                    <div className={'wrap'}>
                        <Link to={item.path}>
                            <DropdownLink key={index}>
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </DropdownLink>
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default SubMenu;
