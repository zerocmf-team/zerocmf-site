import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import styles from './login.less';
import { Link, connect } from 'umi';

const Login = (props: any) => {
  const { global, dispatch } = props;

  const { loginVisible } = global;

  const [form] = Form.useForm();

  const login = () => {
    const data = form.getFieldsValue();

    dispatch({
      type: 'global/signIn',
      payload: {
        data,
      },
    });
  };

  const closeLogin = () => {
    dispatch({
      type: 'global/saveState',
      payload: {
        loginVisible: false,
      },
    });
  };

  return (
    loginVisible && (
      <div className={classNames('modal', styles.modal)}>
        <div className={styles.wrap}>
          <div onClick={closeLogin} className={styles.close}>
            <CloseOutlined />
          </div>

          <div className={styles.titleWrap}>
            <div className={styles.title}>手机登录</div>
          </div>

          <div className={styles.content}>
            <Form form={form} name="basic" autoComplete="off">
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入您的用户名！' }]}
              >
                <Input placeholder="手机号/邮箱" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: '10px' }}
                name="password"
                rules={[{ required: true, message: '请输入您的用户密码！' }]}
              >
                <Input.Password placeholder="密码" />
              </Form.Item>

              <div className={styles.extra}>
                <div className={styles.item}>
                  <span className={styles.link}>验证码登录</span>
                </div>
                <div className={classNames(styles.item, styles.forget)}>
                  <span className={styles.link}>忘记密码</span>
                </div>
              </div>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  onClick={() => {
                    login();
                  }}
                  block
                  type="primary"
                >
                  登录
                </Button>
              </Form.Item>

              <div className={styles.agreement}>
                注册登录即表示同意<Link to="">用户协议</Link> 、
                <Link to="">隐私政策</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  );
};
export default connect((global) => global)(Login);
