import { useEffect } from 'react';
import classNames from 'classnames';
import zerocmf from '@/assets/images/zerocmf.png';
import styles from './index.less';

const Index = () => {
  const features = [
    {
      icon: 'icon-crm',
      title: 'CRM系统',
    },
    {
      icon: 'icon-erp',
      title: 'ERP系统',
    },
    {
      icon: 'icon-wechat',
      title: '微信管理系统',
    },
    {
      icon: 'icon-crm',
      title: 'CRM系统',
    },
    {
      icon: 'icon-erp',
      title: 'ERP系统',
    },
    {
      icon: 'icon-wechat',
      title: '微信管理系统',
    },
  ];

  const why = [
    {
      icon: 'icon-crm',
      title: '敏捷开发',
    },
    {
      icon: 'icon-crm',
      title: '结构清晰',
    },
    {
      icon: 'icon-crm',
      title: '文档完整',
    },
    {
      icon: 'icon-crm',
      title: '官方教学',
    },
  ];

  return (
    <>
      {/* 轮播大图 */}
      <section className={styles.banner}>
        <div className={classNames(styles.shape, styles.shapeOne, 'scene')}>
          <span data-depth="5"></span>
        </div>

        <div className={classNames(styles.shape, styles.shapeTwo, 'scene')}>
          <span data-depth="6"></span>
        </div>

        <div className={classNames(styles.shape, styles.shapeThree, 'scene')}>
          <span data-depth="8"></span>
        </div>

        <svg className={styles.curve} viewBox="0 0 968 900">
          <path d="M188.052 371.04C-93.1774 403.662 2.44024 38.7207 85.4027 -147.828H1005.02V929.28H297.731C378.35 729.607 469.281 338.417 188.052 371.04Z"></path>
        </svg>

        <div className={styles.img}>
          <img src={zerocmf} alt="" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-9">
              <div className={styles.content}>
                <span
                  className={styles.subTitle}
                  data-aos="fade-up"
                  data-aos-delay="30"
                >
                  基于Go Zero
                </span>
                <h1
                  className={styles.title}
                  data-aos="fade-up"
                  data-aos-delay="70"
                >
                  一款支持微服务的开源内容管理框架，让WEB开发更快
                </h1>
                <p
                  className={styles.desc}
                  data-aos="fade-up"
                  data-aos-delay="90"
                >
                  基于MIT协议开源，
                  永无后顾之忧！开箱即用，丰富的模板和插件。强大的社区支持，带给你简单而愉悦的
                  Web 开发体验
                </p>
                <a
                  href=""
                  className={styles.btn}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  快速上手
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色 */}
      <section className={styles.features}>
        <div className={classNames(styles.shape, styles.shapeOne, 'scene')}>
          <span data-depth="5"></span>
        </div>

        <div className={classNames(styles.shape, styles.shapeTwo)}>
          <span></span>
        </div>

        <div className={classNames(styles.shape, styles.shapeThree, 'scene')}>
          <span data-depth="8"></span>
        </div>

        <div className={classNames(styles.shape, styles.shapeFour, 'scene')}>
          <span data-depth="5"></span>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className={styles.sectionTitle}
                data-aos="fade-up"
                data-aos-delay="40"
              >
                <span className={styles.subTitle}>我们能做什么</span>
                <h2 className={styles.title}>
                  一套完整的内容管理框架，让您只需要专注于自己的业务逻辑
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            {features.map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                <div
                  className={styles.gridItem}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <div className={styles.icon}>
                    <i className={classNames('iconfont', item.icon)}></i>
                  </div>
                  <div className={styles.text}>
                    <h3 className={styles.title}>{item.title}</h3>
                    {/* <a href="services.html" className="btn_link">
                  Read More
                </a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 为什么选择zerocmf */}
      <section className={styles.why}>
        <div className="container">
          <div className={classNames('row', styles.titleWrap)}>
            <div className="col-lg-6">
              <div
                className={styles.sectionTitle}
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <span className={styles.subTitle}>为什么选择ZeroCMF</span>
                <h2 className={styles.title}>
                  性能快，对开发者友好，兼容多平台
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {why.map((item, i) => {
              return (
                <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div
                    className={styles.gridItem}
                    data-aos="fade-up"
                    data-aos-delay="70"
                  >
                    <div className={styles.icon}>
                      <i className="flaticon-analytics"></i>
                    </div>
                    <div className={styles.text}>
                      <h3 className={styles.title}>
                        <a href="#">{item.title}</a>
                      </h3>
                      <p className={styles.desc}>
                        Aenean porttitor mauris at dui molestie{' '}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 最新blog */}
      <section className={styles.blog}>
        <div className="container">
          <div className={classNames('row', styles.titleWrap)}>
            <div className="col-lg-6">
              <div
                className={styles.sectionTitle}
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <span className={styles.subTitle}>官方博客</span>
                <h2 className={styles.title}>最新博客文章</h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div
                className={styles.blogItem}
                data-aos="fade-up"
                data-aos-delay="40"
              >
                <div className={styles.imgHolder}>
                  <img
                    src="https://demo.webtend.net/html/saap/assets/images/blog/img-4.jpg"
                    alt="Image"
                  />
                </div>
                <div className={styles.entryContent}>
                  <div className={styles.postMeta}>
                    <ul>
                      <li>
                        <span className={styles.date}>
                          <i className="far fa-calendar-alt"></i>
                          <a href="#">20 dec, 2021</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <h3 className={styles.title}>
                    <a href="blog-details.html">
                      Make contact. Build relationships Get results.
                    </a>
                  </h3>
                  <a href="blog-details.html" className={styles.btnLink}>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div
                className={styles.blogItem}
                data-aos="fade-up"
                data-aos-delay="40"
              >
                <div className={styles.imgHolder}>
                  <img
                    src="https://demo.webtend.net/html/saap/assets/images/blog/img-4.jpg"
                    alt="Image"
                  />
                </div>
                <div className={styles.entryContent}>
                  <div className={styles.postMeta}>
                    <ul>
                      <li>
                        <span className={styles.date}>
                          <i className="far fa-calendar-alt"></i>
                          <a href="#">20 dec, 2021</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <h3 className={styles.title}>
                    <a href="blog-details.html">
                      Make contact. Build relationships Get results.
                    </a>
                  </h3>
                  <a href="blog-details.html" className={styles.btnLink}>
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
