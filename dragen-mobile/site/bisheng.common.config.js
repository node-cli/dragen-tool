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
    // webpack的externals配置history, react相关模块
    if (!isDev) {
      config.externals = Object.assign(config.externals, prodExternals);
    }
    // webpack的resolve的alias配置
    config.resolve.alias = {
      'dragen-mobile/lib': path.join(process.cwd(), 'components'),
      'dragen-mobile': process.cwd(),
      site: path.join(process.cwd(), 'site'),
    };

    // react相关模块别名配置
    if (!useReact) {
      config.resolve.alias = Object.assign(config.resolve.alias, preactAlias);
    }
    // webpack.babel相关插件配置
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

    // 环境定义插件，与命令转入参数
    config.plugins.push(new webpack.DefinePlugin({ PREACT_DEVTOOLS: isDev && !useReact }));
    return config;
  },
  // html模板配置扩展数据
  htmlTemplateExtraData: {
    isDev,
    useReact,
    useHD: process.env.HD_ENV === 'hd',
  },
  // 模板配置
  themeConfig: {
    siteTitle: 'Dragen Mobile',
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
    }
    },
  },
};
