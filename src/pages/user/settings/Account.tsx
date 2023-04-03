import React from 'react';
import { List } from 'antd';
import styles from './account.less';
import { connect } from 'umi';

const Account = (props: any) => {
  const { user = {} } = props;

  const getData = () => [
    {
      title: '手机',
      description: user.mobile ? `已绑定手机：${user.mobile}` : `未绑定`,
      actions: [<a key="Modify">{user.mobile ? '修改' : '绑定'}</a>],
    },
    {
      title: '邮箱',
      description: user.user_email
        ? `已绑定邮箱：${user.user_email}`
        : `未绑定`,
      actions: [<a key="Modify">{user.user_email ? '修改' : '绑定'}</a>],
    },
    {
      title: '微信',
      description: `未绑定`,
      actions: [<a key="Modify">绑定</a>],
    },
    {
      title: 'QQ',
      description: `未绑定`,
      actions: [<a key="Modify">绑定</a>],
    },
    {
      title: '微博',
      description: `未绑定`,
      actions: [<a key="Modify">绑定</a>],
    },
    {
      title: '账户密码',
      description: '通过重置修改密码',
      actions: [<a key="Modify">重置</a>],
    },
  ];

  const data = getData();

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};
export default connect(({ user, loading }: any) => ({
  user: user.data,
  loading: loading.effects['user/fetchUser'],
}))(Account);
