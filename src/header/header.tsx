import React from 'react';
import logo from './logo.png';
import './header.css';


function Header() {
    return (
        <header>
		<img src={logo} className="logo"/>
		<div className="page_title">Crop Planner</div>
	</header>
    );
}

export default Header;