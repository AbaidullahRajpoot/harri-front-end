import Link from 'next/link';
import React, { useContext } from 'react';
import menu_data from './menu-data';
import { StickyContext } from '@utils/stickeyHeaderContext';
const Menus = () => {
  const sticky = useContext(StickyContext);
  return (
    <ul>
      {menu_data.map((menu, i) => (
        <li key={i} className={`${menu.hasDropdown ? 'has-dropdown' : ''}`}>
          <Link href={`${menu.link}`}>
            {menu.title}
          </Link>
          {menu.hasDropdown && <ul className={`submenu ${sticky && "purple-bg"}`}>
            {menu.submenus.map((sub, i) => (
              <li key={i}>
                <Link href={`${sub.link}`}>
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>}
        </li>
      ))}

    </ul>
  );
};

export default Menus;