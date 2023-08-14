const Encore = require('@symfony/webpack-encore');

const assetsPath = './assets';
const publicAssets = `${assetsPath}/public`
const adminAssets = `${assetsPath}/admin`

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .enableLessLoader()
    .setOutputPath('./public/assets/admin/css')
    .setPublicPath('/assets/admin/css')
    .addStyleEntry('main', `${adminAssets}/less/main.less`)
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

const adminCss = Encore.getWebpackConfig();
adminCss.name = 'css_admin';

Encore.reset();
Encore
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .enableLessLoader()
    .setOutputPath('./public/assets/public/css')
    .setPublicPath('/assets/public/css')
    .addStyleEntry('main', `${publicAssets}/less/main.less`)
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

const publicCss = Encore.getWebpackConfig();
publicCss.name = 'css_public';

Encore.reset();
Encore
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .setOutputPath('./public/assets/admin/js')
    .setPublicPath('/assets/admin/js')
    .addEntry('main', `${adminAssets}/ts/index.ts`)
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableTypeScriptLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

const adminJs = Encore.getWebpackConfig();
adminJs.name = 'js_admin';

Encore.reset();
Encore
    .cleanupOutputBeforeBuild()
    .disableSingleRuntimeChunk()
    .setOutputPath('./public/assets/public/js')
    .setPublicPath('/assets/public/js')
    .addEntry('main', `${publicAssets}/ts/index.ts`)
    .enableBuildNotifications()
    .enableSingleRuntimeChunk()
    .enableTypeScriptLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

const publicJs = Encore.getWebpackConfig();
publicJs.name = 'js_public';

// Encore.reset();
// Encore
//     .cleanupOutputBeforeBuild()
//     .disableSingleRuntimeChunk()
//     .setOutputPath('./public/assets/public/icons')
//     .setPublicPath('/assets/public/icons')
//     .copyFiles({
//         from: './assets/public/icons',
//         to: '[path][name].[ext]',
//         pattern: /\.(png|jpg|jpeg)$/
//     });

// const staticFiles = Encore.getWebpackConfig();
// staticFiles.name = 'static';

module.exports = [
    adminCss, 
    publicCss, 
    adminJs, 
    publicJs 
    // staticFiles
];