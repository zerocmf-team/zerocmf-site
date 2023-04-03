import { Row, Col, Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'umi';

const Breadcrumb = (props: any) => {
  const { className, style, data = [] } = props;
  return (
    <div style={style} className={className}>
      <AntBreadcrumb>
        <AntBreadcrumb.Item href="/">
          <HomeOutlined /> 首页
        </AntBreadcrumb.Item>

        {data.map((item: any, i: number) => (
          <AntBreadcrumb.Item key={item.id}>
            <Link to={item.alias}>{item.name}</Link>
          </AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </div>
  );
};
export default Breadcrumb;
