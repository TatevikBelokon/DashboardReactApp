import React from 'react';
import styles from './Input.module.css';
import foundIcon from '../../images/Vector.png';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

const Input = ({findItem, items}) => {
	useEffect(() => {
		const listener = event => {
			if (event.code === "Enter") {
				event.preventDefault();							
				findItem(event.target.value);
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
		  document.removeEventListener("keydown", listener);
		};
	}, []);	
	return  (
		<div className={styles.wrap}>			
	  		<input id="input"
	  			   className={styles.input} 
	  			   type="text" 
	  			   placeholder="What test are you looking for?"/>
	  	    <span className={styles.count}>
	  	    	{items.length} tests
	  	    </span>	  		
	  	</div>
	);
};

Input.propTypes = {
	findItem: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Input;