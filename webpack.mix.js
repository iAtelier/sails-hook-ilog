let mix = require('laravel-mix');

mix
	.js('assets/vue/index.js', 'js')
	.js('assets/js/config.js', 'js')
	.sass('assets/sass/style.scss', 'css').setPublicPath('public/assets/ilog/');