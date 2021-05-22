const webpack = require("webpack");
let mix = require('laravel-mix');

mix
	.js('assets/vue/index.js', 'js').vue({ version: 2 }).setPublicPath('public/assets/ilog/');
	
mix
	.js('assets/js/config.js', 'js')
	.sass('assets/sass/style.scss', 'css').setPublicPath('public/assets/ilog/');