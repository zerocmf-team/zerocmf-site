import React, {
  forwardRef,
  useState,
  useContext,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import { useImmer } from 'use-immer';
import {
  Drawer,
  Card,
  Image,
  Input,
  Switch,
  Modal,
  Table,
  Form,
  Space,
  Button,
  InputNumber,
  Select,
  TreeSelect,
  message,
  Row,
  Col,
  Radio,
} from 'antd';

import { ColorInput } from '@/components/form';

import { connect } from 'dva';
import Uploads from './uploads';
import styles from './drawerSettings.less';
import { SettingOutlined } from '@ant-design/icons';
import {
  navItemOptions,
  navItemUrls,
  addNavItem,
  editNavItem,
  delNavItem,
} from '@/services/nav';

import { navAdminItems } from '@/services/navItem';
import { saveThemeFile } from '@/services/themeFile';
import { getDataBySort } from '@/utils/common';

import { categoryList } from '@/services/portalCategory';

const { TextArea } = Input;
const { Option, OptGroup } = Select;
const DrawerContext = React.createContext<any>({});

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

/*
 *@Author: frank
 *@Date: 2022-01-19 16:26:01
 *@Description: 更新文件数据
 */
const updateFile = (
  props: any,
  keys: any,
  file: string,
  moreType: string,
  moreKey: string,
  widget: string = '',
) => {
  const { global = {}, themeFiles = {} } = props;
  const { fileData = {} } = global;
  const { headerData = {}, footerData = {} } = themeFiles;

  let moreData: any = {};
  let modelKey = '';

  // 添加完成的结果

  // 操作的file
  if (file === 'public/header') {
    modelKey = 'headerData';
    moreData = JSON.parse(JSON.stringify(headerData));
  } else if (file === 'public/footer') {
    modelKey = 'footerData';
    moreData = JSON.parse(JSON.stringify(footerData));
  } else {
    modelKey = 'fileData';
    moreData = JSON.parse(JSON.stringify(fileData));
  }

  const { display } = keys;

  // 操作是vars还是widget
  if (moreType === 'vars') {
    Object.keys(keys).map((key, i) => {
      const value = keys[key];
      if (value !== undefined) {
        moreData.more.vars[moreKey][key] = value;
      }
    });
  } else {
    if (moreKey) {
      if (display !== undefined) {
        moreData.more.widgets[moreKey].display = display ? 1 : 0;
      }

      // if (value !== undefined && widget) {
      //   moreData.more.widgets[moreKey].vars[widget].value = value;
      // }

      Object.keys(keys).map((key, i) => {
        const value = keys[key];
        if (value !== undefined && widget && key !== 'display') {
          moreData.more.widgets[moreKey].vars[widget][key] = value;
        }
      });
    }
  }
  return { modelKey, moreData };
};

/*
 *@Author: frank
 *@Date: 2022-01-19 16:27:04
 *@Description: 数组编辑框
 */
const ModalArray: any = connect(
  ({ global, themeFiles }: any) => ({
    global,
    themeFiles,
  }),
  null,
  null,
  { forwardRef: true },
)(
  forwardRef((props: any, ref) => {
    const { global = {}, themeFiles = {}, dispatch } = props;
    const { headerData, footerData } = themeFiles;

    const tableRef = useRef<any>();

    const [state, setState] = useImmer<any>({
      title: '编辑',
      visible: false,
      columns: [],
      data: [],
      formVisible: false,
      formTitle: '新增内容',
      file: '',
      moreType: '',
      moreKey: '',
      widget: '', // 操作more变量下的key
    });

    tableRef.current = {
      getData: () => state.data,
    };

    const [form] = Form.useForm();

    const handleOk = () => {
      const fileRes = updateFile(
        { global, themeFiles },
        { value: state.data },
        state.file,
        state.moreType,
        state.moreKey,
        state.widget,
      );

      const { modelKey, moreData } = fileRes;
      if (modelKey) {
        dispatch({
          type: 'global/saveState',
          payload: {
            [modelKey]: moreData,
          },
        });

        setState((draft: any) => {
          draft.visible = false;
        });
      }
    };

    const handleCancel = () => {
      setState((draft: any) => {
        draft.visible = false;
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        open: (params: any) => {
          const {
            title = '',
            visible = false,
            columns = {},
            data = [],
            file,
            moreType,
            moreKey,
            widget,
          } = params;

          let columnsArr: any = [];
          Object.keys(columns).map((key: any, i: number) => {
            const item = columns[key];
            const column = {
              title: item.title,
              dataIndex: key,
              key,
              type: item.type,
              order: item.order,
              ellipsis: true,
              render: (text: string) => {
                let render = null;
                switch (item.type) {
                  case 'image':
                    render = <Image preview={false} width={50} src={text} />;
                    break;
                  case 'color':
                    render = (
                      <div
                        style={{
                          width: '80px',
                          height: '30px',
                          background: text,
                        }}
                      ></div>
                    );
                    break;
                  default:
                    render = text;
                }

                return render;
              },
            };
            columnsArr.push(column);
          });

          columnsArr = columnsArr.sort((a: any, b: any) => {
            return a.order - b.order;
          });

          columnsArr.push({
            title: '操作',
            width: 150,
            key: 'action',
            render: (text: any, record: any, index: number) => (
              <Space size="middle">
                <a
                  onClick={() => {
                    setState((draft: any) => {
                      draft.formTitle = '编辑内容';
                    });
                    form.setFieldsValue(record);
                    openFormModal();
                  }}
                >
                  编辑
                </a>
                <a
                  onClick={() => {
                    const tableData = JSON.parse(
                      JSON.stringify(tableRef.current?.getData() || []),
                    );
                    tableData.splice(index, 1);
                    setState((draft: any) => {
                      draft.data = tableData;
                    });
                  }}
                >
                  删除
                </a>
              </Space>
            ),
          });

          setState((draft: any) => {
            draft.title = title;
            draft.visible = visible;
            draft.columns = columnsArr;
            draft.data = data;
            draft.file = file;
            draft.moreType = moreType;
            draft.moreKey = moreKey;
            draft.widget = widget;
          });
        },
      }),
      [],
    );

    const openFormModal = () => {
      setState((draft: any) => {
        draft.formVisible = true;
      });
    };

    const closeFormModal = () => {
      setState((draft: any) => {
        draft.formVisible = false;
      });
    };

    const getComponent = (type: any) => {
      let render;
      switch (type) {
        case 'text':
          render = <Input />;
          break;
        case 'textarea':
          render = <TextArea rows={3} />;
          break;
        case 'image':
          render = <Uploads />;
          break;
        case 'color':
          render = <ColorInput />;
      }
      return render;
    };

    // 添加编辑项
    const onModalFormOk = () => {
      const formData = form.getFieldsValue();
      const index =
        formData.index !== undefined ? formData.index : state.data.length;
      setState((draft: any) => {
        draft.data[index] = { ...formData, index };
        draft.formVisible = false;
      });
    };

    return (
      <>
        <Modal
          className="ant-modal"
          centered
          visible={state.formVisible}
          title={state.formTitle}
          onCancel={closeFormModal}
          onOk={onModalFormOk}
          destroyOnClose
        >
          <div>
            <Form form={form} layout="vertical" preserve={false}>
              <Form.Item style={{ display: 'none' }} name="index">
                <InputNumber />
              </Form.Item>

              {state.columns.map((item: any, i: number) => {
                if (item.key !== 'action') {
                  return (
                    <Form.Item key={i} label={item.title} name={item.dataIndex}>
                      {getComponent(item.type)}
                    </Form.Item>
                  );
                }
              })}
            </Form>
          </div>
        </Modal>

        <Modal
          className="ant-modal"
          centered
          title={state.title}
          visible={state.visible}
          width="60%"
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose
        >
          <div>
            <div style={{ textAlign: 'right' }}>
              <Button
                onClick={openFormModal}
                type="primary"
                style={{ marginBottom: 16 }}
              >
                新增
              </Button>
            </div>
            <Table
              rowKey="index"
              dataSource={state.data}
              columns={state.columns}
            />
          </div>
        </Modal>
      </>
    );
  }),
);

/*
 *@Author: frank
 *@Date: 2022-07-02 23:14:58
 *@Description: 选择导航弹窗
 */
const ModalNav: any = connect(
  ({ global }: any) => ({
    global,
  }),
  null,
  null,
  { forwardRef: true },
)(
  forwardRef((props: any, ref) => {
    const { onSave } = props;

    const columns = [
      {
        title: '排序',
        dataIndex: 'list_order',
        key: 'list_order',
      },
      {
        title: 'ID',
        width: 50,
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '跳转地址',
        dataIndex: 'href',
        key: 'href',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text: any, record: any, index: number) => (
          <Space size="middle">
            <a
              onClick={() => {
                form.setFieldsValue({
                  parent_id: record.id,
                });
                showForm();
              }}
            >
              添加子菜单
            </a>
            <a
              onClick={() => {
                form.setFieldsValue(record);
                showForm();
              }}
            >
              编辑
            </a>
            <a
              className="ant-typography ant-typography-danger"
              onClick={() => {
                deleteNavItem(record.id);
              }}
            >
              删除
            </a>
          </Space>
        ),
      },
    ];

    const deleteNavItem = async (id: number) => {
      const result = await delNavItem(id);
      if (result.code === 1) {
        message.success(result.msg);
        initNavItems();
        return;
      }
      message.error(result.msg);
    };

    const [form] = Form.useForm();

    const defaultState: any = {
      title: '操作导航',
      visible: false,
    };

    const defaultFormState: any = {
      formTitle: '新增导航菜单',
      formVisible: false,
    };

    const [state, setState] = useImmer<any>({
      ...defaultState,
      ...defaultFormState,
      key: '',
      navId: '',
      navItems: [],
      urlsData: [],
      options: [],
      onValueChange: Function,
    });

    useEffect(() => {
      if (state.key) {
        initNavItems();
      }
    }, [state.key]);

    const initNavItems = async () => {
      const result = await navAdminItems({ key: state.key });

      if (result.code === 0) {
        message.error(result.msg);
        return;
      }

      const { navId, navItems } = result?.data;

      const { onValueChange } = state;

      if (onValueChange) {
        onValueChange({ navId, value: navItems });
      }

      const parentRes = await navItemOptions(navId);
      if (parentRes.code === 0) {
        message.error(parentRes.msg);
        return;
      }

      const options = parentRes.data;
      setState((draft: any) => {
        draft.navId = navId;
        draft.navItems = navItems;
        draft.options = [
          {
            title: '/',
            value: 0,
          },
          ...options,
        ];
      });
    };

    useImperativeHandle(
      ref,
      () => ({
        open: async (params: any) => {
          const { title = '', visible = false, key, onValueChange } = params;

          const urlRes = await navItemUrls();
          if (urlRes.code === 0) {
            message.error(urlRes.msg);
            return;
          }

          setState((draft: any) => {
            draft.title = title;
            draft.visible = visible;
            draft.urlsData = urlRes.data;
            draft.key = key;
            draft.onValueChange = onValueChange;
          });
        },
      }),
      [],
    );

    const onOk = () => {
      if (onSave) {
        onSave({ visible: true });
      }
      setState((draft: any) => {
        draft.visible = false;
      });
    };

    const onCancel = () => {
      setState((draft: any) => {
        draft.visible = false;
      });
    };

    const showForm = () => {
      setState((draft: any) => {
        draft.formVisible = true;
      });
    };

    const closeForm = () => {
      setState((draft: any) => {
        Object.keys(defaultFormState).forEach(key => {
          draft[key] = defaultFormState[key];
        });
      });
    };

    const FormSubmit = () => {
      form.submit();
    };

    const onFinish = async (values: any) => {
      const formData = { ...values, nav_id: state.navId };
      // 处理select label
      formData.href = formData.href.value;
      let result: any = {};
      const { id } = values;
      if (id) {
        result = await editNavItem(id, formData);
      } else {
        result = await addNavItem(formData);
      }
      if (result.code === 0) {
        message.error(result.msg);
        return;
      }

      initNavItems();
      closeForm();
    };

    return (
      <>
        <Modal
          centered
          title={state.formTitle}
          visible={state.formVisible}
          onCancel={closeForm}
          onOk={FormSubmit}
          destroyOnClose
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="off"
            preserve={false}
            onFinish={onFinish}
          >
            <Form.Item
              style={{ display: 'none' }}
              label="ID"
              name="id"
              initialValue={''}
            >
              <Input />
            </Form.Item>

            <Form.Item label="上级" name="parent_id" initialValue={0}>
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll
                treeData={state.options}
              />
            </Form.Item>

            <Form.Item name="href_type" label="地址类型" initialValue={0}>
              <Radio.Group>
                <Radio value={0}>默认</Radio>
                <Radio value={1}>自定义</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="地址" shouldUpdate>
              {() => {
                return (
                  <Form.Item
                    noStyle
                    name="href"
                    rules={[
                      {
                        required: true,
                        message: '地址不能为空',
                      },
                    ]}
                  >
                    {form.getFieldValue('href_type') === 1 ? (
                      <Input.Group compact>
                        <Select style={{ width: '30%' }} defaultValue="http://">
                          <Option value="http://">http://</Option>
                          <Option value="https://">https://</Option>
                        </Select>
                        <Input style={{ width: '70%' }} defaultValue="" />
                      </Input.Group>
                    ) : (
                      <Select
                        labelInValue
                        onChange={(e: any) => {
                          form.setFieldsValue({
                            name: e.label,
                          });
                        }}
                        placeholder="请选择"
                      >
                        {state.urlsData.map((options: any, index: number) => (
                          <OptGroup key={index} label={options.label}>
                            {options?.options.map((option: any, oi: number) => (
                              <Option
                                key={`${index}-${oi}`}
                                value={option.value}
                              >
                                {option.label}
                              </Option>
                            ))}
                          </OptGroup>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                );
              }}
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: '菜单名称不能为空',
                },
              ]}
              label="菜单名称"
              name="name"
              initialValue={''}
            >
              <Input />
            </Form.Item>

            <Form.Item label="打开方式" name="target" initialValue={'_self'}>
              <Select>
                <Option value="_self">默认方式</Option>
                <Option value="_blank">新窗口打开</Option>
              </Select>
            </Form.Item>

            <Form.Item label="图标" name="icon" initialValue={''}>
              <Input />
            </Form.Item>

            <Form.Item label="排序" name="list_order" initialValue={10000}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="状态" name="status" initialValue={1}>
              <Select>
                <Option value={1}>显示</Option>
                <Option value={0}>隐藏</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          centered
          width={'50%'}
          title={state.title}
          visible={state.visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          <div>
            <div style={{ textAlign: 'right' }}>
              <Button
                onClick={showForm}
                type="primary"
                style={{ marginBottom: 16 }}
              >
                新增
              </Button>
            </div>
            <Table rowKey="id" dataSource={state.navItems} columns={columns} />
          </div>
        </Modal>
      </>
    );
  }),
);

/*
 *@Author: frank
 *@Date: 2022-07-02 23:15:12
 *@Description: 表格树选择
 */
const ModalTable: any = forwardRef((props: any, ref) => {
  const [state, setState] = useImmer<any>({
    title: '选择分类',
    visible: false,
    selectionType: 'checkbox',
    data: [],
    names: [],
    value: [],
    onValueChange: Function,
  });

  const columns = [
    {
      width: 50,
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  useImperativeHandle(
    ref,
    () => ({
      open: async (params: any) => {
        const { title = '选择分类',multi, value = [], onValueChange } = params || {};
        const newVal = value?.map((item: any) => {
          return Number(item);
        });

        const result = await categoryList();
        if (result.code === 1) {
          const { data } = result;
          setState((draft: any) => {
            draft.title = title;
            draft.visible = true;
            draft.selectionType = multi ? 'checkbox' : 'radio'
            draft.data = data;
            draft.value = newVal;
            draft.onValueChange = onValueChange;
          });
          return;
        }
        message.error(result.msg);
      },
    }),
    [],
  );

  const rowSelectionProps = {
    selectedRowKeys: state.value || [],
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      const names = selectedRows.map((item, i) => {
        return item.name;
      });

      setState((draft: any) => {
        draft.value = selectedRowKeys;
        draft.names = names;
      });
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

  const rowSelection = {
    type: state.selectionType,
    ...rowSelectionProps,
  };

  return (
    <Modal
      width="50%"
      title={state.title}
      visible={state.visible}
      onCancel={() => {
        setState((draft: any) => {
          draft.visible = false;
        });
      }}
      onOk={() => {
        const { onValueChange } = state;
        if (onValueChange) {
          onValueChange({
            value: state.value?.join(','),
            names: state.names?.join(','),
          });
        }
        setState((draft: any) => {
          draft.visible = false;
        });
      }}
      centered
      destroyOnClose
    >
      <Table
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        dataSource={state.data}
        pagination={false}
      />
    </Modal>
  );
});

// 渲染通用配置项组件
const renderComm: any = (item: any, index: number, props: any) => {
  const {
    global,
    themeFiles,
    dispatch,
    modalRef,
    modalNavRef,
    modalTableRef,
    file,
    moreType,
    moreKey,
    widget,
  } = props;
  let render = null;

  const { key, title, value, href = '', type, item: columns } = item;

  const onValueChange = (keys: any) => {
    const fileRes = updateFile(
      { global, themeFiles },
      keys,
      file,
      moreType,
      moreKey,
      widget,
    );
    const { modelKey, moreData } = fileRes;
    if (modelKey) {
      let key = 'themeFiles/saveState';
      if (modelKey === 'fileData') {
        key = 'global/saveState';
      }
      dispatch({
        type: key,
        payload: {
          [modelKey]: moreData,
        },
      });
    }
  };

  switch (type) {
    case 'image':
      render = (
        <Uploads
          onOk={(data: any) => {
            onValueChange({ value: data.prev_path });
          }}
        />
      );
      break;

    case 'text':
      render = (
        <Input
          value={value}
          onChange={e => {
            const { value } = e.target;
            onValueChange({ value });
          }}
        />
      );
      break;

    case 'tableSelect':
      const { dataSource = {} } = item;
      const { api, multi } = dataSource;
      switch (api) {
        case 'portal/category':
          let names = item.names || value?.split(',');
          render = (
            <Input
              value={names}
              readOnly
              onClick={e => {
                modalTableRef?.current.open({

                  onValueChange,
                  value: value?.split(','),
                });
              }}
            />
          );
          break;
      }
      break;

    case 'textarea':
      render = (
        <TextArea
          rows={4}
          value={value}
          onChange={e => {
            const { value } = e.target;
            onValueChange({ value });
          }}
        />
      );
      break;

    case 'button':
      render = (
        <>
          <Row gutter={[0, 16]} align="middle">
            <Col span={10}>
              <div className={styles.label}>文本内容：</div>
            </Col>
            <Col span={14}>
              <Input
                value={value}
                onChange={e => {
                  const { value } = e.target;
                  onValueChange({ value });
                }}
              />
            </Col>

            <Col span={10}>
              <div className={styles.label}>跳转链接：</div>
            </Col>
            <Col span={14}>
              <Input
                value={href}
                onChange={e => {
                  const { value } = e.target;
                  onValueChange({ href:value });
                }}
              />
            </Col>

            <Col span={10}>
              <div className={styles.label}>打开新窗口：</div>
            </Col>
            <Col span={14}>
              <Select
                defaultValue="_self"
                style={{ width: '100%' }}
                onChange={value => {
                  onValueChange({ target: value });
                }}
              >
                <Option value="_self">当前页面</Option>
                <Option value="_blank">新窗口</Option>
              </Select>
            </Col>
          </Row>
        </>
      );

      break;

    case 'array':
      render = (
        <TextArea
          value={`共${value.length}条数据`}
          onClick={() => {
            if (modalRef.current) {
              const data = value.map((item: any, index: number) => {
                return {
                  ...item,
                  index,
                };
              });
              modalRef.current.open({
                title: `编辑${title}`,
                visible: true,
                columns,
                data,
                file,
                moreType,
                moreKey,
                widget,
              });
            }
          }}
          readOnly
          style={{ resize: 'none' }}
        />
      );
      break;

    case 'nav':
      render = (
        <Button
          onClick={() => {
            modalNavRef.current?.open({
              title: '操作导航',
              visible: true,
              key,
              onValueChange,
            });
          }}
          type="primary"
        >
          导航管理
        </Button>
      );
      break;

    default:
      render = <h5>not implate {type}</h5>;
  }
  return (
    <div className={styles.cardItem} key={index}>
      <h5 className={styles.title}>{title}</h5>
      {render}
    </div>
  );
};

// 渲染变量面板
const VarsRender: any = (props: any) => {
  const { data } = props;
  const {
    global,
    themeFiles,
    dispatch,
    modalRef,
    modalNavRef,
    modalTableRef,
    file,
    type = '',
    vars,
  } = useContext(DrawerContext);

  if (type !== 'widgets') {
    const varsData = getDataBySort(data);
    return varsData.map((item: any, index: number) => {
      const { key } = item;
      // if (vars === key || type === '') {
      const render = renderComm(item, index, {
        global,
        themeFiles,
        dispatch,
        modalRef,
        modalNavRef,
        modalTableRef,
        file,
        moreType: 'vars',
        moreKey: key,
      });
      return (
        <Card style={{ marginBottom: '15px' }} key={index} title={item.title}>
          {render}
        </Card>
      );
      // }
    });
  }
};

// 渲染组件面板
const WidgetsRender: any = (props: any) => {
  const { data } = props;
  
  const {
    global,
    themeFiles,
    dispatch,
    modalRef,
    modalNavRef,
    modalTableRef,
    file,
    type = '',
    vars,
  } = useContext(DrawerContext);

  if (type !== 'vars') {
    const widgetsData = getDataBySort(data);
    return widgetsData.map((item: any, index: number) => {
      const { key } = item;
      // if (vars === key || type === '') {
      const widgets = data[key];
      let render: any = [];
      const { vars = {} } = widgets;
      const varsData = getDataBySort(vars);
      varsData.forEach((item: any, wi: number) => {
        const wk = item.key;
        render.push(
          renderComm(item, wi, {
            global,
            themeFiles,
            dispatch,
            modalRef,
            modalNavRef,
            modalTableRef,
            file,
            moreType: 'widgets',
            moreKey: key,
            widget: wk,
          }),
        );
      });
      return (
        <Card
          id={key}
          style={{ marginBottom: '15px' }}
          key={index}
          title={widgets.title}
          extra={
            <Switch
              onClick={checked => {
                const fileRes = updateFile(
                  { global },
                  { display: checked },
                  file,
                  'widgets',
                  key,
                );
                const { modelKey, moreData } = fileRes;
                if (modelKey) {
                  dispatch({
                    type: 'global/saveState',
                    payload: {
                      [modelKey]: moreData,
                    },
                  });
                }
              }}
              checked={widgets.display}
            />
          }
        >
          {render}
        </Card>
      );
      // }
    });
  }
};

// 抽屉设置面板
const DrawerSettings: any = (props: any) => {
  const { global = {}, themeFiles = {}, dispatch } = props;
  const { visible = false, file, type, vars, fileData = {} } = global;
  const { headerData = {}, footerData = {} } = themeFiles;

  let themeVars = {};
  let themeWidgets = {};

  let desc = '';
  let more: any = {};

  if (file === 'public/header') {
    themeVars = headerData.more.vars;
    themeWidgets = headerData.more.widgets;
    desc = headerData.description;
    more = headerData;
  } else if (file === 'public/footer') {
    themeVars = footerData.more.vars;
    themeWidgets = footerData.more.widgets;
    desc = footerData.description;
    more = footerData;
  } else {
    themeVars = fileData?.more?.vars || {};
    themeWidgets = fileData?.more?.widgets || {};
    desc = fileData?.description;
    more = fileData;
  }

  const modalRef = useRef();
  const modalNavRef = useRef();
  const modalTableRef = useRef();

  const onClose = () => {
    dispatch({
      type: 'global/toggleVisable',
      payload: {
        file: '',
        moreType: '',
        vars: '',
      },
    });
  };

  const onSave = async (params: any) => {
    const { visible = false } = params;
    const { id } = more;
    if (id) {
      const result = await saveThemeFile(id, {
        more: JSON.stringify(more),
      });
      if (result.code === 0) {
        message.error(result.msg);
        return;
      }
      message.success(result.msg);
    }
    if (!visible) {
      onClose();
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        modalRef,
        modalNavRef,
        modalTableRef,
        file,
        type,
        vars,
        global,
        themeFiles,
        dispatch,
      }}
    >
      <ModalArray ref={modalRef}></ModalArray>

      <ModalNav onSave={onSave} ref={modalNavRef}></ModalNav>

      <ModalTable ref={modalTableRef}></ModalTable>

      <Drawer
        className={styles.drawer}
        width={320}
        title={desc}
        placement={'right'}
        closable={true}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
          </Space>
        }
      >
        {Object.keys(themeVars)?.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4>设置</h4>
            <VarsRender data={themeVars} />
          </div>
        )}

        {Object.keys(themeWidgets)?.length > 0 && (
          <div>
            <h4>组件</h4>
            <WidgetsRender data={themeWidgets} />
          </div>
        )}
      </Drawer>
    </DrawerContext.Provider>
  );
};

export default connect(({ global, themeFiles }: any) => ({
  global,
  themeFiles,
}))(DrawerSettings);

export const SettingsIcon = connect(({ global, user, themeFiles }: any) => ({
  global,
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
    <div
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
    >
      <SettingOutlined />
    </div>
  ) : (
    <></>
  );
});
