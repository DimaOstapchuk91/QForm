import { NavLink } from 'react-router-dom';
import s from './AppNav.module.css';

const AppNav = () => {
  return (
    <nav>
      <ul className={s.navList}>
        <li>
          <NavLink className={s.navLink} to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={s.navLink} to='/questionnaires'>
            Catalog
          </NavLink>
        </li>

        <li>
          <NavLink className={s.navLink} to='/questionnaire/create'>
            Create
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default AppNav;
