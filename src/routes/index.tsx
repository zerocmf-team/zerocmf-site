import { IGetInitialProps, connect } from 'umi';
import pathToRegexp from 'path-to-regexp';

import { getThemeFile } from '@/services/themeFile';

import Header from '@/pages/public/Header';
import Footer from '@/pages/public/Footer';
import Index from '@/pages/index';
import Search from '@/pages/Search';
import NotFount from '@/pages/NotFount';

// 匹配自定义路由
const matchRoute = (routes: any, url: string) => {
  // 判断当前url是什么类型
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const re = pathToRegexp(route.url);
    if (re.exec(url)) {
      return route;
    }
  }
  return null;
};

// 渲染匹配页面
const renderPage = (route: any) => {
  const { type = '', name, full_url, url } = route || {};
  let render = null;
  switch (type) {
    case 'page':
      switch (name) {
        case 'index':
          render = <Index />;
          break;
        case 'search':
          render = <Search />;
          break;
      }
      break;
    case 'list':
      break;
    case 'article':
      break;
    default:
      render = <NotFount />;
      break;
  }
  return render;
};

const Routes = (props: any) => {
  const { global = {}, themeFiles = {} } = props;
  const { route = {} } = global;
  return (
    <>
      <Header />
      {renderPage(route)}
      <Footer />
    </>
  );
};

Routes.getInitialProps = (async (ctx: any) => {
  const { history = {}, store = {} } = ctx;
  const { location = {} } = history;
  const { query = {} } = location;
  const { url } = ctx.match;
  const { dispatch, getState } = store;

  const routes: any = [
    {
      full_url: '/',
      url: '/',
      name: 'index',
      type: 'page',
    },
    {
      full_url: '/search',
      url: '/search',
      name: 'search',
      type: 'page',
    },
    {
      full_url: '/list/:id',
      url: '/list/:id',
      type: 'list',
    },
    {
      full_url: '/article/:id',
      url: '/article/:id',
      type: 'article',
    },
    {
      full_url: '/page/:id',
      url: '/page/:id',
      type: 'page',
    },
  ];

  const route = matchRoute(routes, url);
  const { name } = route;

  await dispatch({
    type: 'themeFiles/fetchPublic',
    payload: { theme: THEME, is_public: 1 },
  });

  await dispatch({
    type: 'themeFiles/fetchThemeFile',
    payload: { theme: THEME, file: name },
  });

  await dispatch({
    type: 'global/saveState',
    payload: {
      route,
    },
  });

  return getState();
}) as IGetInitialProps;

export default connect(({ global, themeFiles }: any) => ({
  global,
  themeFiles,
}))(Routes);
