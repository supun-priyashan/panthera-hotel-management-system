import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Reservations',
        path: '/#',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Rooms',
                path: '/reservations/rooms',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Revenue',
                path: '/reservations/halls',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Rooms',
        path: '/rooms',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Halls',
        path: '/halls',
    },
    {
        title: 'Restaurant',
        path: '/restaurant',
        icon: <IoIcons.IoMdPeople />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Restaurants',
                path: '/restaurant/restaurants',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Menus',
                path: '/restaurant/menus',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            }
        ]
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <FaIcons.FaEnvelopeOpenText />,
    }
];
