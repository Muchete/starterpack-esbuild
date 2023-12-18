# esbuild Starterpack

> [!NOTE]
> Stolen from here: [kirby-esbuild](https://github.com/medienbaecker/kirby-esbuild)

This is a simple and efficient build setup for compiling JavaScript and SCSS files with live reloading. It utilizes [esbuild](https://esbuild.github.io/) for bundling and minifying JavaScript, and compiling and minifying CSS.

## Features

✨ Bundles and minifies JavaScript with [esbuild](https://esbuild.github.io/).

🎨 Compiles, bundles and minifies SCSS.

⚡ Live reloading with [Browsersync](https://browsersync.io/) for files in `assets/`, `content/` and `site/`.

🐘 Automatically sets the `.test` domain for [Laravel Valet](https://github.com/laravel/valet).

## Setup
### 1. Install the dependencies defined in the [package.json](package.json) file.
```shell
npm install
```
### 2. Start the development server.
```shell
npm run dev
```

To customize the build process, refer to the [assets.config.js](assets/assets.config.js) file. By default, the script compiles `assets/js/main.js` and `assets/css/style.css`, but you can modify the `jsFiles` and `cssFiles` variables.