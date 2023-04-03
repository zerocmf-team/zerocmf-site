import { useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Button, Dropdown, Menu, Affix } from 'antd';
import SettingsIcon from '@/components/SettingsIcon';
import MyAvatar from '../components/Avatar';
import classNames from 'classnames';

import {
  getThemeVars,
  getVarsAttr,
  getThemeWidgets,
  getWidgetsAttr,
} from '@/utils/common';

import styles from './header.less';

const Header = (props: any) => {
  const { user = {}, dispatch, headerData = {} } = props;

  const themeVars = getThemeVars(headerData);

  const themeWidgets = getThemeWidgets(headerData);
  const { navs = {} } = themeWidgets; // 获取导航数据

  const widgetsNavs = getWidgetsAttr(navs, 'main');

  // 渲染二级菜单
  const renderSubNav = (navs: any, parentId = 0) => {
    const render: any = [];
    navs?.forEach((element: any, i: number) => {
      if (parentId == element.parent_id) {
        render.push(
          <li
            key={element.id}
            className={classNames(
              'menu-item',
              element.children ? 'has-children' : '',
            )}
          >
            <a target={element.target} href={element.href}>
              {element.name}
            </a>

            {element.children && renderSubNav(element.children, element.id)}
          </li>,
        );
      }
    });

    return <ul className="sub-menu">{render}</ul>;
  };

  // 渲染顶级菜单
  const renderNav = (navs: any, parentId = 0) => {
    const render: any = [];
    navs?.forEach((element: any, i: number) => {
      if (parentId == element.parent_id) {
        render.push(
          <li
            key={element.id}
            className={classNames(
              'menu-item',
              element.children ? 'has-children' : '',
            )}
          >
            <a target={element.target} href={element.href}>
              {element.name}
            </a>
            {renderSubNav(element.children, element.id)}
          </li>,
        );
      }
    });

    return <ul className={styles.navs}>{render}</ul>;
  };

  useEffect(() => {
    dispatch({
      type: 'user/fetchUser',
    });
  }, []);

  const showLogin = () => {
    dispatch({
      type: 'global/saveState',
      payload: {
        loginVisible: true,
      },
    });
  };

  const renderUser = () => {
    if (user.id > 0) {
      const menu = (
        <Menu>
          <Menu.Item key="profile">
            <Link
              className={styles.loginMenuItem}
              to={'/user/settings/profile'}
            >
              个人中心
            </Link>
          </Menu.Item>
          <Menu.Item key="signIn">
            <a
              className={styles.loginMenuItem}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              签到有礼
            </a>
          </Menu.Item>
          <Menu.Item key="account">
            <a
              className={styles.loginMenuItem}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              账号设置
            </a>
          </Menu.Item>
          <Menu.Item key="signOut">
            <a
              className={styles.loginMenuItem}
              onClick={() => {
                dispatch({
                  type: 'global/signOut',
                });
              }}
            >
              退出登录
            </a>
          </Menu.Item>
        </Menu>
      );

      return (
        <div className={styles.loginInfo}>
          <Dropdown overlay={menu} placement="bottom" arrow>
            <div>
              <MyAvatar
                avatar={user.avatar_prev}
                nickname={user.user_nickname}
              />
              <span className={styles.nickname}>{user.user_login}</span>
            </div>
          </Dropdown>
        </div>
      );
    }

    return (
      <div className={styles.loginInfo}>
        <Button onClick={showLogin} type="primary" ghost>
          登录
        </Button>
      </div>
    );
  };

  return (
    <header
      className={classNames(styles.header, 'header', 'transparent-header')}
    >
      <div className={classNames('settings-icon', 'container')}>
        <SettingsIcon style={{ color: '#333' }} file={headerData.file} />
      </div>

      <div className="container">
        <div className="primary-menu">
          <div className="site-branding">
            <a href={getVarsAttr(themeVars, 'href')} className="brand-logo">
              {getVarsAttr(themeVars, 'logo')}
            </a>
          </div>
          <div className="nav-menu nav-ml-auto">
            <nav className="main-menu">
              <ul>{renderNav(widgetsNavs)}</ul>
            </nav>
          </div>
          {renderUser()}
        </div>
      </div>
    </header>
  );
};

export default connect(({ global, user, loading, themeFiles }: any) => ({
  global,
  user: user.data,
  headerData: themeFiles.headerData,
  loading: loading.global,
}))(Header);
