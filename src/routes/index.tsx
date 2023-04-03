import { useEffect } from 'react';
import { IGetInitialProps, connect, Dispatch, isBrowser } from 'umi';
import { getRoutes } from '@/services/route';
import { getThemeFile, saveThemeFile } from '@/services/themeFile';
import { message, Skeleton, Spin } from 'antd';
import { DrawerSettings } from '@zerocmf/component';
import '@zerocmf/component/dist/style.css';
import { getPosts } from '@/services/portalPost';

import Index from '@/pages/index'; // 首页内容
import List from '@/pages/list'; // 列表
import NotFound from '@/pages/404';

// 定义路由规则
const pageReg = '/page/:id';
const categoryReg = '/list/:id';
const articleReg = '/article/:id/cid/:cid';
const tagReg = '/tag/:id';
const searchReg = '/search';

const pathToRegexp = require('path-to-regexp');

// 系统工具类
const inArray = (array: any, key: string, value: string) => {
  for (let i = 0; i < array.length; i++) {
    const item: any = array[i];
    if (item.pattern === 1) {
      if (item[key] === value) {
        return item;
      }
    } else if (item.pattern === 2) {
      const re = pathToRegexp(item.url);
      if (re.exec(value)) {
        return { ...item, full_url: value };
      }
    }
  }
  return -1;
};

// 获取路由配置页面
const regexPage = async (params: any = {}) => {
  // 获取url的额外参数
  const { routes, pathname, query, dispatch } = params;
  const { page = 1, pageSize = 10, cid = 0, keywords = '' } = query;

  const res: any = {
    type: '404',
    name: '404',
    params: {},
    exception: '',
  };

  const route = inArray(routes, 'url', pathname);

  if (route) {
    const { type, url, full_url } = route;
    let re, regexRes: any;
    switch (type) {
      case 'index':
        res.type = 'index';
        res.name = 'index';
        res.params = {};
        break;
      case 1:
        // list
        re = pathToRegexp(categoryReg);
        regexRes = re.exec(full_url);
        if (regexRes) {
          const categoryId = regexRes[1] || 0
          // 请求查询列表数据
          const categoryRes = await dispatch({
            type: 'postCategory/fetchCategory',
            payload: {
              categoryId,
            },
          });
          if (categoryRes.code === 1) {
            //   获取面包屑数据
            const category = categoryRes.data;
            res.type = 'list';
            res.name = category.list_tpl;
            res.params = {
              id: categoryId,
            };

            await dispatch({
              type: 'postCategory/fetchData',
              payload: {
                categoryId,
              },
            });
          } else {
            console.log('categoryRes',categoryRes)
            res.exception = 'category接口异常';
          }
        }
        break;
    }
  }
  return res;
};

// 获取渲染页面组件
const renderPage = (props: any = {}) => {
  const { global = {} } = props;
  const { type = '', name = '' } = global;

  let render = (
    <Skeleton
      style={{ maxWidth: '1100px', margin: '0 auto' }}
      paragraph={{ rows: 10 }}
      active
    />
  );

  switch (type) {
    case 'index':
      render = <Index />;
      break;
    case 'list':
      switch (name) {
        default:
          render = <List />;
          break;
      }
      break;
    case '404':
      render = <NotFound />;
      break;
  }
  return <>{render}</>;
};

type paramsProps = {
  pathname: string;
  query: Object;
  dispatch: Dispatch;
};

const init = async (params: paramsProps) => {
  const { pathname, query, dispatch } = params;

  let routes: any = [
    {
      full_url: '/',
      url: '/',
      pattern: 1,
      name: 'index',
      type: 'index',
    },
  ];

  let exception = '';

  const routeRes = await getRoutes();
  if (routeRes.code === 0) {
    exception = routeRes.msg;
  } else {
    const { data = [] } = routeRes;
    const routeCategory: any = []; // 分类路由
    const routeDetail: any = [];

    data.map((item: any) => {
      routeCategory.push({
        ...item,
        pattern: 1, // 精确匹配
        full_url: `/${item.full_url}`,
        url: `/${item.url}`,
      });
    });
    routes = [...routes, ...routeCategory, ...routeDetail];
  }

  const res: any = await regexPage({ routes, pathname, query, dispatch });

  console.log('res',res)

  res.exception = exception;
  res.routes = routes;
  return res;
};

// 动态路由配置
const Routes = (props: any) => {
  const { loading, location = {}, dispatch, global = {}, themeFiles } = props;
  const { pathname, query } = location;
  const { visible = false, curData = {} } = global;
  const { headerData = {}, footerData = {}, fileData = {} } = themeFiles;
  useEffect(() => {
    const fetch = async () => {
      await init({ pathname, query, dispatch });
    };
    fetch();
  }, []);

  return (
    <>
      <Spin tip="加载中..." spinning={loading}>
        <DrawerSettings
          visible={visible}
          fileData={curData}
          onClose={() => {
            dispatch({
              type: 'global/toggleVisable',
              payload: {
                file: '',
                moreType: '',
                vars: '',
              },
            });
          }}
          onChange={(json: any) => {
            const { file } = json;
            let modelKey = 'fileData';
            if (file == 'public/header') {
              modelKey = 'headerData';
            } else if (file == 'public/footer') {
              modelKey = 'footerData';
            }
            dispatch({
              type: 'themeFiles/saveState',
              payload: {
                [modelKey]: json,
              },
            });
          }}
          onSave={async (json: any) => {
            console.log('onSave', json);
            const { id } = json;
            if (id) {
              const result = await saveThemeFile(id, {
                more: JSON.stringify(json),
              });
              if (result.code === 0) {
                message.error(result.msg);
                return;
              }
              message.success(result.msg);
            }
          }}
        />
        {renderPage(props)}
      </Spin>
    </>
  );
};

Routes.getInitialProps = (async (ctx: any) => {
  const { history = {}, match = {} } = ctx;
  const { location = {} } = history;
  const { query = {} } = location;
  const { url: pathname = '/' } = match;
  let { token = '' } = query;

  if (isBrowser()) {
    if (token === '') {
      token = localStorage.getItem('token');
    }
  }
  // 检验token
  const { store } = ctx;

  const { dispatch } = store;

  const res: any = await init({ pathname, query, dispatch });

  const { exception = '', type = '', name = '', routes = [], params } = res;

  // 请求接口，获取不同的数据

  // 获取当前页面模板数据
  let fileData: any = {};
  if (name !== '404') {
    const fileRes = await getThemeFile({ theme: THEME, file: name });
    if (fileRes.code === 1) {
      const tempData = { ...fileRes.data.more_json, id: fileRes.data.id };
      const { vars = {}, widgets = {} } = tempData?.more;
      // 处理模板数据

      for (let index = 0; index < Object.keys(widgets).length; index++) {
        const key = Object.keys(widgets)[index];
        const value = widgets[key];
        const { vars: widgetsVars = {} } = value;
        for (let ci = 0; ci < Object.keys(widgetsVars).length; ci++) {
          const varKey = Object.keys(widgetsVars)[ci];
          const varValue = widgetsVars[varKey];
          const { dataSource, value } = varValue;
          if (dataSource) {
            const { api, multi } = dataSource;
            switch (api) {
              case 'portal/category':
                if (multi && false) {
                } else {
                  const result = await getPosts(value);
                  if (result.code == 1) {
                    tempData.more.widgets[key].vars[varKey].data = result.data;
                  }
                }
                break;
            }
          }
        }
      }
      fileData = JSON.parse(JSON.stringify(tempData));
    }
  }

  await dispatch({
    type: 'themeFiles/saveState',
    payload: {
      fileData,
    },
  });

  await dispatch({
    type: 'global/saveState',
    payload: {
      exception,
      token,
      type,
      name,
      routes,
      params,
    },
  });

  return store.getState();
}) as IGetInitialProps;

export default connect(({ global, loading, themeFiles }: any) => ({
  global,
  loading: loading.global,
  themeFiles,
}))(Routes);
