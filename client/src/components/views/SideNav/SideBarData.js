import React from 'react';
import {useLocation} from "react-router-dom";

export const SidebarData = [
    {
        title: 'Reservations',
        path: '',

        subNav: [
            {
                title: 'Rooms',
                path: '/reservations/rooms'
            },
            {
                title: 'Revenue',
                path: '/reservations/halls'
            }
        ]
    },
    {
        title: 'Rooms',
        path: '/rooms'

    },
    {
        title: 'Halls',
        path: '/halls',
    },
    {
        title: 'Restaurant',
        path: '/restaurant',

        subNav: [
            {
                title: 'Restaurants',
                path: '/restaurant/restaurants',
                cName: 'sub-nav'
            },
            {
                title: 'Menus',
                path: '/restaurant/menus',
                cName: 'sub-nav'
            }
        ]
    },
    {
        title: 'Employees',
        path: '/employees'
    }
];
