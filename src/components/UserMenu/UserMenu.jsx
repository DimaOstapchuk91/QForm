import s from './UserMenu.module.css';

const UserMenu = () => {
  return (
    <div className={s.userInfo}>
      <p className={s.userName}>Anonimus</p>
      <button type='button'>Logout</button>
    </div>
  );
};
export default UserMenu;
