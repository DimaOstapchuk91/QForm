import { NavLink } from 'react-router-dom';
import s from './AppNav.module.css';

const AppNav = () => {
  return (
    <nav>
      <ul className={s.navList}>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? `${s.navLink} ${s.active}` : s.navLink
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/questionnaires'
            className={({ isActive }) =>
              isActive ? `${s.navLink} ${s.active}` : s.navLink
            }
          >
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/questionnaire/create'
            className={({ isActive }) =>
              isActive ? `${s.navLink} ${s.active}` : s.navLink
            }
          >
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
