import AppNav from '../AppNav/AppNav.jsx';
import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={s.header}>
      <div className={s.headerWrap}>
        <p className={s.logo}>
          Q<span>Form</span>
        </p>
        <AppNav />
      </div>
    </header>
  );
};
export default AppBar;
