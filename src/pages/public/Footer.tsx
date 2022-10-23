import styles from './footer.less';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerWidget}>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className={styles.widget}
                data-aos="fade-up"
                data-aos-delay="30"
              >

                <div className={styles.logo}>
                  <a href="">ZeroCMF</a>
                </div>

                <p className={styles.desc}>
                一款支持微服务的开源内容管理框架，让WEB开发更快
                </p>

              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className={styles.widget}
                data-aos="fade-up"
                data-aos-delay="40"
              >
                <div className={styles.title}>导航</div>
                <ul className={styles.nav}>
                  <li>
                    <a href="">首页</a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <div className={styles.widget}>
              <div className={styles.title}>服务</div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-sm-12"
              data-aos="fade-up"
              data-aos-delay="60"
            >
              <div className={styles.widget}>
              <div className={styles.title}>帮助</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <div className="row">
            <div className="col-lg-12">
              <p>&copy; Copyright 2022 ZeroCMF All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
