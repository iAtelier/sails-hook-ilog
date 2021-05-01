import axios from 'axios';
import app from '../configs/app';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default new axios.create({
	baseURL: app.host,
	headers: {
			'X-Requested-With': 'XMLHttpRequest'
		
	}
// 		'X-Requested-With': 'XMLHttpRequest',
// 		Authorization: 'Bearer ' + localStorage.access_token,
// 	}
})