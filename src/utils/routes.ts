import { BiDish } from 'react-icons/bi';
import { GiRadarDish } from 'react-icons/gi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LuCarrot } from 'react-icons/lu';
import { MdEventNote, MdOutlineBorderColor, MdOutlineMenuBook, MdOutlineSell, MdRateReview } from 'react-icons/md';

import { IRoute, IRouteAdmin } from '@/@types/routes';

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home page',
  },
  {
    name: 'Menu',
    path: '/menu',
  },
  {
    name: 'Reviews',
    path: '/reviews',
  },
  {
    name: 'Events',
    path: '/events',
  },
  {
    name: 'Booking',
    path: '/booking',
  },
];


export const adminPanelRoutes: IRouteAdmin[] = [
  {
    path: 'dishes',
    name: 'Dishes',
    Icon: BiDish ,
  },
  {
    path: 'ingredients',
    name: 'Ingredients',
    Icon: LuCarrot
  },
  {
    path: 'events',
    name: 'Events',
    Icon: MdEventNote,
  },
  {
    path: 'reviews',
    name: 'Reviews',
    Icon: MdRateReview,
  },
  {
    path: 'notifications',
    name: 'Notifications',
    Icon: IoIosNotificationsOutline,
  },
  {
    path: 'orders',
    name: 'Orders',
    Icon: MdOutlineBorderColor,
  },
  {
    path: 'promo-codes',
    name: 'Promo codes',
    Icon: MdOutlineSell,
  },
  {
    path: 'specialties-menu',
    name: 'Specialties menu',
    Icon: MdOutlineMenuBook,
  },
];
