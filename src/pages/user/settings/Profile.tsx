import { UploadOutlined } from '@ant-design/icons';
import { Form, Radio, Button, Input, Select, Upload, DatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import ImgCrop from 'antd-img-crop';
import { AvatarUplaod } from '@/pages/components/uploads';

import styles from './profile.less';

const { Option } = Select;

const { TextArea } = Input;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar, onOk = null }: { avatar: string; onOk: any }) => (
  <>
    <div className={styles.avatarTitle}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>

    <AvatarUplaod onOk={onOk} />
  </>
);

const Profile = (props: any) => {
  const [form] = Form.useForm();
  const { user = {}, loading, dispatch } = props;

  const [avatar, setAvatar] = useState('/images/user/avatar.png');

  useEffect(() => {
    if (loading === false) {
      if (!user.id) {
        history.push('/');
        return;
      }
    }

    const userTemp = { ...user };
    if (userTemp.birthday_time) {
      userTemp.birthday_time = moment(userTemp.birthday_time, 'YYYY-MM-DD');
    }

    if (userTemp.avatar_prev) {
      setAvatar(userTemp.avatar_prev);
    }

    form.setFieldsValue(userTemp);
  }, [user]);

  const onFinish = (values: any) => {
    const user = { ...values };
    if (user.birthday_time) {
      user.birthday_time = user.birthday_time.format('YYYY-MM-DD');
    }

    dispatch({
      type: 'user/saveUser',
      payload: user,
    });
  };

  return (
    <>
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              rules={[{ required: true, message: '请填写您的昵称!' }]}
              name="user_nickname"
              label="昵称"
            >
              <Input style={{ width: '328px' }} placeholder="请填写您的昵称" />
            </Form.Item>
            <Form.Item name="gender" label="性别">
              <Radio.Group>
                <Radio style={{ marginRight: '10px' }} value={1}>
                  男
                </Radio>
                <Radio value={0}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthday_time" label="生日">
              <DatePicker
                style={{ width: '328px' }}
                placeholder="请填写您的生日"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item name="user_url" label="个人主页">
              <Input style={{ width: '328px' }} placeholder="请填写个人主页" />
            </Form.Item>
            <Form.Item name="signature" label="个性签名">
              <TextArea rows={3} placeholder="请填写您的个性签名" />
            </Form.Item>

            <Form.Item style={{ display: 'none' }} name="avatar" label="头像">
              <Input placeholder="头像" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView
            onOk={(data: any) => {
              if (data.length > 0) {
                form.setFieldsValue({
                  avatar: data[0].file_path,
                });
                setAvatar(data[0].prev_path);
              }
            }}
            avatar={avatar}
          />
        </div>
      </div>
    </>
  );
};
export default connect(({ user, loading }: any) => ({
  user: user.data,
  loading: loading.effects['user/fetchUser'],
}))(Profile);
