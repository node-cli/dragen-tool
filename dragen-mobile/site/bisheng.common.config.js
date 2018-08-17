const path = require('path');
const webpack = require('webpack');

const useReact = process.env.DEMO_ENV === 'react';
const isDev = process.env.NODE_ENV === 'development';

const reactExternals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router': 'ReactRouter',
};

const preactAlias = {
  react: 'preact-compat',
  'react-dom': 'preact-compat',
  'create-react-class': 'preact-compat/lib/create-react-class',
};

const prodExternals = useReact ? reactExternals : {};

module.exports = {
  webpackConfig(config) {
    config.externals = {
      history: 'History',
      'babel-polyfill': 'this', // hack babel-polyfill has no exports
    };
    // dev 环境下统一不 external
    // 因为 preact/devtools 未提供 umd
    if (!isDev) {
      config.externals = Object.assign(config.externals, prodExternals);
    }
    config.resolve.alias = {
      'antd-mobile/lib': path.join(process.cwd(), 'components'),
      'antd-mobile': process.cwd(),
      site: path.join(process.cwd(), 'site'),
    };

    if (!useReact) {
      config.resolve.alias = Object.assign(config.resolve.alias, preactAlias);
    }

    config.babel.plugins.push([
      'babel-plugin-transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ], [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'dragen-mobile',
        libraryDirectory: 'components',
      },
    ]);

    config.plugins.push(new webpack.DefinePlugin({ PREACT_DEVTOOLS: isDev && !useReact }));
    return config;
  },
  htmlTemplateExtraData: {
    isDev,
    useReact,
    useHD: process.env.HD_ENV === 'hd',
  },
  themeConfig: {
    siteTitle: 'ANT DESIGN MOBILE',
    siteSubTitle: '移动端组件库',
    indexDemos: ['drawer'], // for kitchen 这些组件每个 demo 都需要全屏展示，首页直接放其各个 demo 链接
    subListDemos: ['list-view', 'pull-to-refresh'], // for kitchen 这些组件每个 demo 都需要全屏展示，首页直接放其各个 demo 链接
    hashSpliter: '-demo-', // for kitchen URL 中记录到 hash 里的特殊标记
    categoryOrder: [
      'Layout',
      'Navigation',
      'Data Entry',
      'Data Display',
      'Feedback',
      'Gesture',
      'Combination',
      'Other',
    ],
    cateChinese: {
      Layout: '布局',
      Navigation: '导航',
      'Data Entry': '数据录入',
      'Data Display': '数据展示',
      Feedback: '操作反馈',
      Gesture: '手势',
      Combination: '组合组件',
      Other: '其他',
    },
    // for desktop
    docVersions: {
      '0.7.x': 'http://07x.mobile.ant.design',
      '0.8.x': 'http://08x.mobile.ant.design',
      '0.9.x': 'http://09x.mobile.ant.design',
      '1.x': 'http://1x.mobile.ant.design',
    },
  },
};
