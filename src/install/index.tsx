import index from '@/pages/index.json';
import header from '@/pages/public/header.json';

import { connect, history } from 'umi';
import { useEffect, useState } from 'react';
import { Result, Button, Spin, Skeleton } from 'antd';

const install = (props: any) => {
  const { global = {}, dispatch, loading } = props;

  const [result, setResult] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        theme: THEME,
        version: VERSION,
        theme_file: [
          JSON.stringify(header),
          JSON.stringify(index)
        ],
      };

      const res = await dispatch({
        type: 'global/installTheme',
        payload: {
          data,
        },
      });

      if (res) {
        setResult(res);
      }
    };

    fetchData();
  }, []);

  const goHome = () => {
    history.push('/');
  };

  const RenderHttpOk = () => {
    let render;

    if (loading) {
      render = <Skeleton active />;
    } else {
      if (result.code === 1) {
        render = (
          <Result
            status="success"
            title="操作成功"
            subTitle={result.msg}
            extra={[
              <Button type="primary" onClick={goHome} key="index">
                去首页
              </Button>,
            ]}
          ></Result>
        );
      } else {
        render = (
          <Result
            status="error"
            title="权限错误"
            subTitle={result.msg}
            extra={[
              <Button type="primary" key="console">
                去后台
              </Button>,
              <Button type="link" onClick={goHome} key="index">
                去首页
              </Button>,
            ]}
          ></Result>
        );
      }
    }

    return (
      <div className="header-top">
        <div style={{ marginTop: '10%' }}>{render}</div>
      </div>
    );
  };

  return (
    <Spin tip="加载中..." spinning={loading}>
      {RenderHttpOk()}
    </Spin>
  );
};

export default connect(({ global, loading }: any) => ({
  global,
  loading: loading.effects['global/installTheme'],
}))(install);
