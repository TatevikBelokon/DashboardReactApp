import React from 'react';
import Input from '../Input/Input';
import ItemList from '../ItemList/ItemList';
import axios from 'axios';
import styles from './Dashboard.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component { 
	state = {
		initialItems:[],
		items:[],
		headers:['Name', 'Type', 'Status', 'Site'],
		sorting: 'asc',
		isLoading: true	
	};  	

	componentDidMount() {
		axios.all([axios.get(`http://localhost:3100/tests`),
				   axios.get(`http://localhost:3100/sites`)])
			 .then(axios.spread((tests, sites) => {				  	
					let items = tests.data.map(test => {
					    const newTest = {...test};	

					  	let siteUrl = this.getSiteUrl(sites.data, test.siteId);
					  	newTest['siteUrl'] = siteUrl;	

					  	if(test.status === 'DRAFT'){
					  		newTest['btn'] = 'Finalize';
					  	}else{
					  		newTest['btn'] = 'Results';
					  	}

					  	switch (test.status){
					    	case 'ONLINE':
					    		newTest['statusId'] = 1;
					    		break;
					    	case 'PAUSED':
					    		newTest['statusId'] = 2;
					    		break;
					    	case 'STOPPED':
					    		newTest['statusId'] = 3;
					    		break;
					    	case 'DRAFT':
					    		newTest['statusId'] = 4;
					    		break;
					  	}

					  	newTest.status = test.status.charAt(0).toUpperCase() + test.status.substring(1).toLowerCase();

					  	if(newTest.type !== 'MVT'){
					  		newTest.type = test.type.charAt(0).toUpperCase() + test.type.substring(1).toLowerCase();
					  	}

					    return newTest; 
					})									
					this.setState({
						initialItems:items,
						items:items,
						isLoading: false
					});						
		     	  }))
		     .catch(error => console.log(error));
	}

    getSiteUrl (sites, siteId) {
    	let fullSiteUrl = sites.find((site) => site.id === siteId).url;
		let position = fullSiteUrl.indexOf('://') + 3;
		if (fullSiteUrl.includes('www')){
			position += 4;
		}
		let siteUrl = fullSiteUrl.slice(position);
		return siteUrl;
	}
	
	findItem (str) {		 			
		let foundItems = [];
		for(let item of this.state.initialItems){
		    if(item.name.toLowerCase().includes(str.toLowerCase())){		      
		      foundItems.push(item);
		    }
		}	
		this.setState({items: foundItems}); 		
	}

	sort (header) {
		let name = 'Name', type = 'Type', 
		    site = 'Site', status = 'Status';
		let items = this.state.items;		
		
		switch(header){
			case name:				
				if (this.state.sorting === 'asc'){
					let sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));						 
					this.setState({items: sortedItems}); 
					this.setState({sorting: 'desc'}); 									
				} else {
					let sortedItems = items.sort((a, b) => b.name.localeCompare(a.name));	  		  		 
	  		  		this.setState({items: sortedItems});  
	  		  		this.setState({sorting: 'asc'});		  		  	      		
				}
			    break;
			case type:
				if (this.state.sorting === 'asc'){
					let sortedItems = items.sort((a, b) => a.type.localeCompare(b.type));
					this.setState({items: sortedItems}); 
					this.setState({sorting: 'desc'}); 
				} else {
					let sortedItems = items.sort((a, b) => b.type.localeCompare(a.type));
					this.setState({items: sortedItems}); 
					this.setState({sorting: 'asc'});
				}
				break;
			case site:
				if (this.state.sorting === 'asc'){
					let sortedItems = items.sort((a, b) => a.siteUrl.localeCompare(b.siteUrl));
					this.setState({items: sortedItems}); 	
					this.setState({sorting: 'desc'}); 
				} else {
					let sortedItems = items.sort((a, b) => b.siteUrl.localeCompare(a.siteUrl));
					this.setState({items: sortedItems}); 
					this.setState({sorting: 'asc'});	
				}		
				break;
			case status:
				if (this.state.sorting === 'asc'){
					let sortedItems = items.sort((a, b) => a.statusId - b.statusId);
					this.setState({items: sortedItems}); 	
					this.setState({sorting: 'desc'}); 
				 } else {
					let sortedItems = items.sort((a, b) => b.statusId - a.statusId);
					this.setState({items: sortedItems}); 
					this.setState({sorting: 'asc'});	
				}	
				break;	
		}	
	}

	reset(){
		this.setState({items:this.state.initialItems});
		document.getElementById('input').value = '';
	}

	render() {
		const { isLoading } = this.state;

		return  (
			<div>
				<h1 className={styles.title}>Dashboard</h1>
				<Input findItem = {this.findItem.bind(this)}
					   items = {this.state.items}/>
				{ isLoading ? <div className={styles.preloader}>
							       <CircularProgress color="inherit" />
							  </div> :
					<ItemList headers = {this.state.headers}
							  items = {this.state.items}
							  sort = {this.sort.bind(this)}
							  reset = {this.reset.bind(this)} />
				}
			</div>
		)
	}
}

export default Dashboard;