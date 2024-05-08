import React, { useState } from 'react';
import '../styles/main.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleInfo, faMagnifyingGlassDollar, faTags, faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function HeaderUmum() {

  const [openMenu, setOpenMenu] = useState(false);
  

  return (
    <div className="sticky top-0 left-0 right-0">
        <div className="bg-[#FFF7D4] h-20 flex flex-row items-center justify-around">
            <div className="flex-auto h-auto">
                <img srcSet="/Logo-Midas.png" alt='Logo' className="w-20 pl-3"></img>
            </div>
            <div className="nav_link flex-auto text-center">
                <ul className={`list-none flex justify-around ${openMenu ? "open" : ""}`}>
                    <li className='py-2'><a href='#aboutus'><FontAwesomeIcon className='nav_icon' icon={faCircleInfo} /> Tentang Kami</a></li>
                    <li className='py-2'><a href='#produk'><FontAwesomeIcon icon={faTags} className='nav_icon'/> Produk</a></li>
                    <li className='py-2'><a href='#simulasi'><FontAwesomeIcon icon={faMagnifyingGlassDollar} className='nav_icon'/> Simulasi Kredit</a></li>
                </ul>
            </div>
            <div className="nav_login flex-auto text-right pr-8">
                <button className="bg-[#51829B] rounded-md w-24 h-8 text-white">
                    <Link to={'/login'}>Login</Link>
                </button>
            </div>
            <div className='nav_burger pr-4' onClick={() => setOpenMenu(!openMenu)}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
        </div>
      </div>
  );
}

export default HeaderUmum;
