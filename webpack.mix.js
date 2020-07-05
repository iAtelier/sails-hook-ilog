const { mix } = require('laravel-mix');
  
mix
	.js('src/vue/index.js', 'public/assets/ilog/js/index.js')
	.js('src/js/vue-config', 'public/assets/ilog/js/config.js')
	.sass('src/sass/style.scss', 'public/assets/ilog/css/style.css');