import React from 'react';
import classnames from 'classnames';
import styles from './ItemList.module.css';
import PropTypes from 'prop-types';

const ItemList = ({headers, items, sort, reset}) => {
	return  (
		<div>
			<table className={classnames({[styles.table]: true,
							              [styles.hide]:items.length === 0})}>			
				<tr>
					{headers.map(header => 
						<th className={styles.header} 
							onClick={()=>sort(header)}>
						  {header.toUpperCase()}
						</th>
					)}												
				</tr>
				{items.map(item => 
					<tr className={styles.row}>
						<td className={classnames({[styles.name]: true,
										[styles.borderSiteMarket]:item.siteUrl === 'market.company.com',
										[styles.borderSiteDelivery]:item.siteUrl === 'delivery.company.com',
										[styles.borderSiteGames]:item.siteUrl === 'games.company.com'})}>
							{item.name}
						</td>
						<td className={styles.column}>{item.type}</td>
						<td className={classnames({[styles.status]: true,
												   [styles.online]:item.status === 'Online',
												   [styles.paused]:item.status === 'Paused',
												   [styles.stopped]:item.status === 'Stopped',
												   [styles.draft]:item.status === 'Draft'})}>
							{item.status}
						</td>
						<td className={styles.column}>{item.siteUrl}</td>
						<td className={styles.columnBtn}>
							<button className={classnames({[styles.btn]: true,
														   [styles.btnFinalize]:item.btn === 'Finalize',
														   [styles.btnResults]:item.btn === 'Results'})}>
								{item.btn}
							</button>
						</td>
					</tr>
				)}
			</table>
			<div className = { classnames({[styles.notFound]:items.length === 0,
										   [styles.hide]:items.length !== 0}) }>
				<h2 className={styles.title}>Your search did not match any results.</h2>	
				<button className={styles.btnReset}
						onClick={()=>reset()}>
					Reset
				</button>
			</div>		
		</div>		
	);
};

ItemList.propTypes = {
	s: PropTypes.arrayOf(PropTypes.string).isRequired, 
	items: PropTypes.arrayOf(PropTypes.object).isRequired, 
	sort: PropTypes.func.isRequired, 
	reset: PropTypes.func.isRequired
};

export default ItemList;