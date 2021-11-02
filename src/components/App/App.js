import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import Results from '../Results/Results';
import Finalize from '../Finalize/Finalize';
import styles from './App.module.css';

const App = () => (	
	<Router>
		 <div className={styles.wrap}>
			<div className={styles.menu}>			
				<MenuList>
					<NavLink to='/dashboard'>
						<MenuItem>Dashboard</MenuItem>
					</NavLink>
					<NavLink to='/results'>
						<MenuItem>Results</MenuItem>
					</NavLink>	
					<NavLink to='/finalize'>
						<MenuItem>Finalize</MenuItem>
					</NavLink>					
				</MenuList>
			</div>

			<Route path='/' exact component={Dashboard} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/results' component={Results} />
			<Route path='/finalize' component={Finalize} />				
		</div>
	</Router>
);

export default App;

