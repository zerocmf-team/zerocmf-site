import { useEffect } from 'react';
import classNames from 'classnames';
import SettingsIcon from '@/components/SettingsIcon';
import styles from './index.less';

import { getPostLink, getThemeWidgets, getWidgetsAttr } from '@/utils/common';
import { connect } from 'umi';

const Index = (props: any) => {
  const { themeFiles } = props;
  const { fileData = {} } = themeFiles;
  const themeWidgets = getThemeWidgets(fileData);
  const {
    banner = {},
    can = {},
    why = {},
    blog = {},
  } = themeWidgets || {};

  const tag = getWidgetsAttr(banner, 'tag');
  const title = getWidgetsAttr(banner, 'title');
  const desc = getWidgetsAttr(banner, 'desc');
  const img = getWidgetsAttr(banner, 'img');

  const features: any = getWidgetsAttr(can, 'array');
  const whys: any = getWidgetsAttr(why, 'array');
  const list = getWidgetsAttr(blog, 'list', 'data');

  console.log('list', list);

  useEffect(() => {
    const AOS = require('aos');
    const Parallax = require('parallax-js');
    const elements: any = document.getElementsByClassName('scene');
    elements?.forEach((item: any) => {
      new Parallax(item);
    });
    AOS.init();
  }, []);

  return (
    <>
      {/* 轮播大图 */}
      {banner.display && (
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
            <img src={img} alt="" />
          </div>

          <div
            style={{ top: '-70px' }}
            className={classNames('settings-icon', 'container')}
          >
            <SettingsIcon
              style={{ color: '#000' }}
              file={fileData.file}
              vars="banner"
            />
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
                    {tag}
                  </span>
                  <h1
                    className={styles.title}
                    data-aos="fade-up"
                    data-aos-delay="70"
                  >
                    {title}
                  </h1>
                  <p
                    className={styles.desc}
                    data-aos="fade-up"
                    data-aos-delay="90"
                  >
                    {desc}
                  </p>
                  <a
                    href={getWidgetsAttr(banner, 'button', 'href')}
                    target={getWidgetsAttr(banner, 'button', 'target')}
                    className={styles.btn}
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    {getWidgetsAttr(banner, 'button')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 特色 */}
      {can.display && (
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

          <div
            style={{ top: '-70px' }}
            className={classNames('settings-icon', 'container')}
          >
            <SettingsIcon
              style={{ color: '#fff' }}
              file={fileData.file}
              vars="can"
            />
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div
                  className={styles.sectionTitle}
                  data-aos="fade-up"
                  data-aos-delay="40"
                >
                  <span className={styles.subTitle}>
                    {getWidgetsAttr(can, 'tag')}
                  </span>
                  <h2 className={styles.title}>
                    {getWidgetsAttr(can, 'title')}
                  </h2>
                </div>
              </div>
            </div>

            <div className="row">
              {features?.map((item: any, i: number) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                  <div
                    className={styles.gridItem}
                    data-aos="fade-up"
                    data-aos-delay="50"
                  >
                    <div className={styles.icon}>
                      <img src={item.logo} alt="" />
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
      )}

      {/* 为什么选择zerocmf */}
      {why.display && (
        <section className={styles.why}>
          <div
            style={{ top: '-70px' }}
            className={classNames('settings-icon', 'container')}
          >
            <SettingsIcon
              style={{ color: '#000' }}
              file={fileData.file}
              vars="why"
            />
          </div>

          <div className="container">
            <div className={classNames('row', styles.titleWrap)}>
              <div className="col-lg-6">
                <div
                  className={styles.sectionTitle}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <span className={styles.subTitle}>
                    {getWidgetsAttr(why, 'tag')}
                  </span>
                  <h2 className={styles.title}>
                    {getWidgetsAttr(why, 'title')}
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              {whys?.map((item: any, i: number) => {
                return (
                  <div key={i} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.gridItemWrap}>
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
                            <a href={item.href || '#!'}>{item.title}</a>
                          </h3>
                          <p className={styles.desc}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 最新blog */}
      {blog.display && (
        <section className={styles.blog}>
          <div
            style={{ top: '-70px' }}
            className={classNames('settings-icon', 'container')}
          >
            <SettingsIcon
              style={{ color: '#000' }}
              file={fileData.file}
              vars="news"
            />
          </div>

          <div className="container">
            <div className={classNames('row', styles.titleWrap)}>
              <div className="col-lg-6">
                <div
                  className={styles.sectionTitle}
                  data-aos="fade-up"
                  data-aos-delay="50"
                >
                  <span className={styles.subTitle}>
                    {getWidgetsAttr(blog, 'tag')}
                  </span>
                  <h2 className={styles.title}>
                    {getWidgetsAttr(blog, 'title')}
                  </h2>
                </div>
              </div>
            </div>

            <div className="row">
              {list.data?.map((item: any, i: number) => {
                return (
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
                                <a target="_blank" href={getPostLink(item)}>
                                  {item.create_time}
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <h3 className={styles.title}>
                          <a target="_blank" href={getPostLink(item)}>
                            {item.post_title}
                          </a>
                        </h3>
                        <a
                          target="_blank"
                          href={getPostLink(item)}
                          className={styles.btnLink}
                        >
                          查看详情
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default connect(({ global, themeFiles }: any) => ({
  global,
  themeFiles,
}))(Index);
