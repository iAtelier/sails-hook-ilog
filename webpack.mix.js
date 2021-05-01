const { mix } = require('laravel-mix');
  
mix
	.js('assets/vue/index.js', 'public/assets/ilog/js/index.js')
	.js('assets/js/vue-config', 'public/assets/ilog/js/config.js')
	.sass('assets/sass/style.scss', 'public/assets/ilog/css/style.css');