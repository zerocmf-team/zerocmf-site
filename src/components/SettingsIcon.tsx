import { SettingsIcon } from '@zerocmf/component';
import { connect } from 'dva';

const Index = connect(({ user, themeFiles }: any) => ({
  user: user.data,
  themeFiles,
}))((props: any) => {
  const {
    dispatch,
    user,
    file = {},
    moreType = '',
    vars = '',
    style = {},
  } = props;

  return user.user_type ? (
    <SettingsIcon
      style={style}
      onClick={() => {
        dispatch({
          type: 'global/toggleVisable',
          payload: {
            file,
            moreType,
            vars,
          },
        });

        if (vars) {
          setTimeout(() => {
            window.location.href = '#' + vars;
          }, 50);
        }
      }}
      className="settings-wrap"
    />
  ) : (
    <></>
  );
});

export default Index;
