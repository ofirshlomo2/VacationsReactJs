import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
	const { isAdmin, user } = props;
	return (
		<div>
			<header>
				{user && <NavLink to="/">Home</NavLink>}
				{isAdmin && <NavLink to="/reports">Reports</NavLink>}
			</header>
		</div>
	);
}

export default Header;
