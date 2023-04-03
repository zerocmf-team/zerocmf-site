import { Row, Col, Pagination, Divider, Button } from 'antd';

import styles from './list.less';

import {
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import Breadcrumb from '@/pages/components/Breadcrumb';
import { Fragment } from 'react';
import classNames from 'classnames';
import { Helmet, connect, Link } from 'umi';
const style = { background: '#fff', padding: '16px 16px' };
const Blog = (props: any) => {
  const { postCategory = {}, history = {} } = props;
  const {
    breadcrumbs = [],
    category = {},
    categoryTrees = {},
    hots = [],
    lists = {},
  } = postCategory;
  const { data = [], current = 1, page_size = 10, total } = lists;
  const { location = {} } = history;
  const { pathname = '/' } = location;

  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html lang="zh" />
        <title>{category.seo_title || category.name}</title>
      </Helmet>
      <div className="bg">
        <div className="header-top"></div>
        <div className="main">
          <Breadcrumb style={{ marginBottom: '16px' }} data={breadcrumbs} />

          <Row gutter={16}>
            <Col
              className={classNames(styles.mainContent, 'gutter-row')}
              span={16}
            >
              <div style={style}>
                <div className={styles.list}>
                  {data.map((item: any, i: number) => (
                    <Fragment key={item.id}>
                      <div className={styles.listItem}>
                        <Link
                          to={`${pathname}/post/${item.id}?cid=${category.id}`}
                        >
                          <h3 className={styles.title}>{item.post_title}</h3>
                        </Link>
                        <div className={styles.excerpt}>
                          {item.post_excerpt}
                        </div>
                        <div className={styles.more}>
                          <div className={styles.author}>
                            <span className="mr-1">
                              作者: {item.user_login}
                            </span>
                            <span className="mr-1">
                              <ClockCircleOutlined /> {item.create_time}
                            </span>
                          </div>

                          <div className={styles.extra}>
                            <span className="mr-1">
                              <EyeOutlined /> {item.post_hits}
                            </span>
                            <span className="mr-1">
                              <LikeOutlined /> {item.post_like}
                            </span>
                            <span className="mr-1">
                              <MessageOutlined /> {item.comment_count}
                            </span>
                          </div>

                          <div className="">
                            <Link
                              to={`${pathname}/post/${item.id}?cid=${category.id}`}
                            >
                              查看全部
                            </Link>
                          </div>
                        </div>
                      </div>
                      {i < data.length - 1 && (
                        <Divider style={{ margin: '10px 0' }} />
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="pagination">
                  <Pagination
                    onChange={page => {
                      history.push(`${pathname}?page=${page}`);
                    }}
                    current={current}
                    total={total}
                    pageSize={page_size}
                    showQuickJumper
                  />
                </div>
              </div>
            </Col>
            <Col className={classNames('gutter-row')} span={8}>
              <div className={styles.rightCard}>
                <h2 className={styles.title}>热门文章</h2>
                <div className={styles.list}>
                  {hots?.map((item: any, i: number) => (
                    <Link
                      key={item.id}
                      className={styles.listItem}
                      to={`${category.alias}/post/${item.id}?cid=${category.id}`}
                    >
                      <div className={styles.number}>{i + 1}、</div>
                      <div className={styles.post}>
                        <div className={styles.postTitle}>
                          {item.post_title}
                        </div>
                        <div className={styles.postDesc}>
                          {item.post_excerpt}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.rightCard}>
                <h2 className={styles.title}>分类目录</h2>
                <div className={styles.list}>
                  {categoryTrees?.map((item: any, i: number) => (
                    <div key={item.id} className={styles.listItem}>
                      <Link className={styles.categoryName} to={item.alias}>
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default connect(({ postCategory }: any) => ({
  postCategory,
}))(Blog);
