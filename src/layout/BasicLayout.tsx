import { IGetInitialProps, connect, isBrowser } from 'umi';
import Header from '@/pages/public/Header';
import Footer from '@/pages/public/Footer';
import Login from '@/pages/public/Login';

const BasicLayout = (props: any) => {
  const { children } = props;
  return (
    <>
      <Header {...props} />
      <Login />
      {children}
      <Footer {...props} />
    </>
  );
};

export default BasicLayout;

BasicLayout.getInitialProps = async (ctx: any) => {
  // 获取公共头信息
  const { store } = ctx;
  const { dispatch } = store;
  await dispatch({
    type: 'themeFiles/fetchPublic',
    payload: { theme: THEME, is_public: 1 },
  });
  return store.getState();
};
