import { Result, Button } from 'antd';
import classNames from 'classnames';
import styles from './404.less';

const NotFount = () => {
  return (
    <div className={classNames(styles.main, 'main', 'header-top')}>
      <Result
        status="404"
        title="404"
        subTitle="此页面不存在或已被删除"
        extra={
          <Button type="primary" href="/">
            {' '}
            返回首页{' '}
          </Button>
        }
      />
    </div>
  );
};

export default NotFount;
