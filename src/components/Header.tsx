import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HamburguerButton from './ui/HamburgerButton';
import { MoonSVG } from './ui/MoonSVG';
import SunSVG from './ui/SunSVG';
import ConfirmPopover from './ConfirmPopover';
import UserSVG from './ui/UserSVG';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth > 640;
      if (isLarge) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body')?.classList.add('dark');
    } else {
      document.querySelector('body')?.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  useEffect(() => {
    if (logoutConfirm) {
      setMenuOpen(false);
      setLogoutConfirm(false);
    }
  }, [logoutConfirm, setMenuOpen]);

  const links = [
    {
      label: 'Panel',
      path: '/dashboard',
    },
    {
      label: 'Transacciones',
      path: '/transactions',
    },
    {
      label: 'Cuenta',
      path: '/account',
    },
    {
      label: 'Ajustes',
      path: '/settings',
    },
  ];

  return (
    <header className='bg-gray-100 dark:bg-slate-900 h-12 px-5 flex justify-between items-center'>
      <Link to='/'>
        <div className='font-light text-xl'>Panel Agente</div>
      </Link>
      <div className='flex flex-col ml-auto mr-2 max-w-16'>
        <div className='bg-slate-200 dark:bg-slate-800 p-1 rounded-full w-fit self-center'>
          <UserSVG />
        </div>
        <p className='text-xs overflow-hidden overflow-ellipsis'>admin</p>
      </div>
      <nav
        onClick={() => setMenuOpen(false)}
        className={`fixed sm:static z-50 top-0 left-0 right-0 bottom-0 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 sm:translate-x-0 bg-[rgba(0,0,0,.6)] sm:bg-slate-900 h-full`}
      >
        <ul
          onClick={(e) => e.stopPropagation()}
          className={`bg-gray-100 dark:bg-slate-900 pt-16 sm:pt-0 h-full w-9/12 max-w-80 sm:w-auto sm:max-w-none ml-auto flex gap-16 sm:gap-8 flex-col sm:flex-row items-center ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 sm:translate-x-0 overflow-y-scroll sm:overflow-visible`}
        >
          <li className='hidden sm:block'>
            <button
              onClick={() =>
                setTheme((prevTheme) =>
                  prevTheme === 'dark' ? 'light' : 'dark',
                )
              }
              className='h-8 w-8 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-slate-800'
            >
              {theme === 'light' ? <MoonSVG /> : <SunSVG />}
            </button>
          </li>
          {links.map((link) => (
            <li
              key={link.label}
              className={`duration-500 hover:opacity-80 hover:text-blue-500`}
            >
              <NavLink
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-blue-500 font-semibold' : ''
                }
                to={link.path}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <ConfirmPopover
            handleConfirm={setLogoutConfirm}
            contentConfirm={
              <div className='mb-2'>
                <p className='text-center'>¿Estas seguro de salir?</p>
              </div>
            }
            textBtnConfirm='Salir'
            popoverStyles='min-w-[200px] sm:right-0 sm:top-full sm:mt-5'
          >
            <li
              className={`duration-500 hover:opacity-80 hover:text-blue-500 pb-16 sm:pb-0`}
            >
              <button>Salir</button>
            </li>
          </ConfirmPopover>
        </ul>
      </nav>

      <div className={`flex items-center gap-5 sm:hidden`}>
        <button
          onClick={() =>
            setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
          }
          className='h-8 w-8 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-slate-800'
        >
          {theme === 'light' ? <MoonSVG /> : <SunSVG />}
        </button>
        <HamburguerButton
          checked={menuOpen}
          onChange={() => setMenuOpen((prevState) => !prevState)}
        />
      </div>
    </header>
  );
};

export default Header;
