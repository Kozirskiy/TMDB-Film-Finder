import {Outlet} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Footer} from '../Footer/Footer';
import {GlobalLinearProgress} from '../GlobalLinearProgress/GlobalLinearProgress';
import s from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={s.wrapper}>
      <Header />
      <GlobalLinearProgress />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
