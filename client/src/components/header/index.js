import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from '../../store'
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';

function Header(props) {
	const { isAdmin, user } = props;

	return (
		<div>
			<header>
		

			</header>
		</div>
	);
}

export default Header;
