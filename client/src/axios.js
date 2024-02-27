import axios from 'axios';
import $ from 'jquery';


axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

export default axios;
