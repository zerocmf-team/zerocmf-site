const Header = () => {
  return (
    <header className="header transparent-header">
      <div className="container">
        <div className="primary-menu">
          <div className="site-branding">
            <a href="" className="brand-logo">
              ZeroCMF
            </a>
          </div>
          <div className="nav-menu nav-ml-auto">
            <nav className="main-menu">
              <ul>
                <li className="menu-item">
                  <a href="">首页</a>
                </li>
                <li className="menu-item has-children">
                  <a href="">服务</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="">模板</a>
                    </li>
                    <li className="has-children">
                      <a href="">插件</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="">app</a>
                        </li>
                        <li>
                          <a href="">小程序</a>
                        </li>
                        <li>
                          <a href="">站点</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <a href="">演示</a>
                </li>
                <li className="menu-item">
                  <a href="">源码</a>
                </li>
                <li className="menu-item">
                  <a href="">博客</a>
                </li>
                <li className="menu-item">
                  <a href="">关于</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
