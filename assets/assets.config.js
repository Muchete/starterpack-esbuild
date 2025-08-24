// --------------------------------------------------
// 🧰 Tools
// --------------------------------------------------

import esbuild from "esbuild";
import browserSync from "browser-sync";

import { fileURLToPath } from "url";
import os from "os";
import path from "path";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// --------------------------------------------------
// 🔧 Setup
// --------------------------------------------------

// Setting the valet domain by appending .test to the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const domain =
  path.basename(path.resolve(__dirname, "../")).toLowerCase() + ".test";

// JavaScript files
const jsFiles = ["assets/js/main.js"];

// CSS files
const cssFiles = ["assets/scss/style.scss"];

// --------------------------------------------------
// ⚡ BrowserSync
// --------------------------------------------------

const browserSyncInstance = browserSync.create();

browserSyncInstance.init({
  proxy: `https://${domain}`, // ensure https here
  host: domain, // Set the host to the valet domain
  open: "external", // Automatically open the valet domain in the browser
  reloadOnRestart: true, // Reload the browser when we restart the server
  notify: false, // I don't want to see the BrowserSync notification in the browser
  ui: false, // Disable the BrowserSync UI
  https: { //load valet SSL certificate
    key: path.join(os.homedir(), `.config/valet/Certificates/${domain}.key`),
    cert: path.join(os.homedir(), `.config/valet/Certificates/${domain}.crt`),
  }
});

// --------------------------------------------------
// ✨ JavaScript
// Bundles and minifies JavaScript files
// --------------------------------------------------

const jsContext = await esbuild.context({
  entryPoints: jsFiles,
  outdir: "assets/js",
  outExtension: {
    ".js": ".min.js",
  },
  minify: true,
  bundle: true,
  sourcemap: true,
});

await jsContext.watch();

// --------------------------------------------------
// 🎨 CSS
// Compiles and minifies CSS files
// --------------------------------------------------

const cssContext = await esbuild.context({
  entryPoints: cssFiles,
  outdir: "assets/css",
  outExtension: {
    ".css": ".min.css",
  },
  minify: true,
  sourcemap: true,
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, {
          from: undefined, // This is needed to prevent postcss from trying to resolve the file path
        });
        return css;
      },
    }),
  ],
});

await cssContext.watch();

// --------------------------------------------------
// 📁 Other files
// --------------------------------------------------

browserSyncInstance
  .watch([
    "assets/css/style/*.scss",
    "assets/css/*.css",
    "assets/js/*.min.js",
    "assets/images/**",
    // "site/*/**",
    // "!site/sessions/**",
    // "!site/cache/**",
    // "content/**/*.*",
    "*.html",
    "**/*.html",
  ])
  .on("change", (file) => {
    browserSyncInstance.reload(file);
  });