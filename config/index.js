
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/regist/saveregist.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/saveregist.ajax': '/regist/saveregist.ajax'
        }
      },
      '/regist/tostortmessage.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/tostortmessage.ajax': '/regist/tostortmessage.ajax'
        }
      },
      '/entanduser/upload.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/upload.ajax': '/entanduser/upload.ajax'
        }
      },
      '/regist/countenterprisename.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countenterprisename.ajax': '/regist/countenterprisename.ajax'
        }
      },
      '/regist/countcreditcode.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countcreditcode.ajax': '/regist/countcreditcode.ajax'
        }
      },
      '/regist/countusename.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countusename.ajax': '/regist/countusename.ajax'
        }
      },
      '/regist/countmobile.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countmobile.ajax': '/regist/countmobile.ajax'
        }
      },
      '/xuan/verifyCode.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/xuan/verifyCode.ajax':'/xuan/verifyCode.ajax'
        }
      },
      '/login.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^login.ajax':'login.ajax'
        }
      },
      '/region/region.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/region/region.ajax':'/region/region.ajax'
        }
      },
      '/entanduser/updateEntAndUser.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateEntAndUser.ajax':'/entanduser/updateEntAndUser.ajax'
        }
      },
      '/entanduser/getEntAndUser.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/getEntAndUser.ajax':'/entanduser/getEntAndUser.ajax'
        }
      },
      '/entanduser/gettypei.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/gettypei.ajax':'/entanduser/gettypei.ajax'
        }
      },
      '/entanduser/getEntityIndustryList.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/getEntityIndustryList.ajax':'/entanduser/getEntityIndustryList.ajax'
        }
      },
      '/entanduser/updateEnt.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateEnt.ajax':'/entanduser/updateEnt.ajax'
        }
      },
      '/entanduser/updateUser.ajax':{
        target:'http://192.168.1.100:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateUser.ajax':'/entanduser/updateUser.ajax'
        }
      },
      '/store/insertstore':{
        target:'http://192.168.1.2:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/store/insertstore':'/store/insertstore'
        }
      },
      '/store/upload.ajax':{
        target:'http://192.168.1.2:8082/commerce-web',
        changeOrigin: true,
        pathRewrite:{
          '^/store/upload.ajax':'/store/upload.ajax'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
