import { useEffect, useState } from 'react';
import { Upload, message, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { isBrowser } from 'umi';

const Uploads = (props: any) => {

  const { onOk, url } = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    setImageUrl(url)
  }, [url])

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  let token = '';
  let host = '';
  if (isBrowser()) {
    const tokenStr: any = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);
    token = tokenObj?.access_token;
    host = ''
  }else {
    host = global.host
  }

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const uploadProps: any = {
    listType: "picture-card",
    className: "avatar-uploader",
    maxCount: 1,
    name: 'file',
    showUploadList: false,
    action: `${host}/api/v1/admin/assets`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        const { response } = info.file;
        if (response.code === 1) {
          const data = response.data
          if (onOk) {
            onOk(data[0]);
          }
          getBase64(info.file.originFileObj as RcFile, url => {
            setLoading(false);
            setImageUrl(data[0].prev_path);
          });
          message.success('上传完成！');
          return;
        }
      }
    },
  };

  return (
    <Upload
      {...uploadProps}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="thumb" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default Uploads;

export const AvatarUplaod = (props: any) => {
  const { onOk } = props;

  let token = '';
  let host = ''
  if (isBrowser()) {
    const tokenStr: any = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);
    token = tokenObj?.access_token;
    host = ''
  }else {
    host = global.host
  }

  const uploadProps: any = {
    name: 'file[]',
    action: `${host}/api/v1/admin/assets`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        const { response } = info.file;
        if (response.code === 1) {
          if (onOk) {
            onOk(response.data);
          }
          message.success('上传完成！');
          return;
        }
      }
    },
  };

  return (
    <ImgCrop rotate>
      <Upload showUploadList={false} {...uploadProps}>
        <div className="upload-button">
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </ImgCrop>
  );
};
