import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './userProfileLayout.less';
import { PageHeader, Row, Col } from 'antd';
import { connect, NavLink, history } from 'umi';

import {
  SolutionOutlined,
  SettingOutlined,
  StarOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const UserProfileLayout = (props: any) => {
  const { location = {}, route = {}, user = {},loading } = props;
  const { pathname = '/' } = location;
  const { routes = [] } = route;

  const getTitle = () => {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      if (item.path === pathname) {
        return item.title;
      }
    }
  };

  const { children } = props;
  return (
    <div className={classNames('bg')}>
      <div className='header-top'></div>
      <div className={classNames('main', styles.main)}>
        {/* <PageHeader
          className={styles.pageHeader}
          ghost={false}
          onBack={() => history.push('/user/account/center')}
          title="返回个人主页"
        /> */}

        <Row gutter={16}>
          <Col span={6}>
            <div className={classNames(styles.card, styles.menu)}>
              <div className={classNames(styles.menu)}>
                <NavLink
                  to={'/user/settings/profile'}
                  className={classNames(styles.menuItem)}
                  activeClassName={classNames(styles.active)}
                >
                  <SolutionOutlined /> 个人资料
                </NavLink>
                <NavLink
                  to={'/user/settings/account'}
                  className={classNames(styles.menuItem)}
                  activeClassName={classNames(styles.active)}
                >
                  <SettingOutlined /> 账号设置
                </NavLink>

                {/* <NavLink
                  to={'/user/settings/score'}
                  className={classNames(styles.menuItem)}
                  activeClassName={classNames(styles.active)}
                >
                  <SettingOutlined /> 积分金币
                </NavLink> */}

                <NavLink
                  to={'/user/settings/invited'}
                  className={classNames(styles.menuItem)}
                  activeClassName={classNames(styles.active)}
                >
                  <SettingOutlined /> 邀请有礼
                </NavLink>
              </div>
            </div>
          </Col>
          <Col span={18}>
            <div className={classNames(styles.card, styles.rightWrap)}>
              <div className={styles.title}>{getTitle()}</div>
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default connect(({ user }: any) => ({ user: user.data }))(
  UserProfileLayout,
);
