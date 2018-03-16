import React from "react";
import { Row, Col, Steps, Button, Icon, message, Form, Input, Select, Checkbox, Upload, Modal } from 'antd';
import Result from 'ant-design-pro/lib/Result';
import styles from './UploadVideo.less';
const Step = Steps.Step;
const FormItem = Form.Item;

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500, marginBottom: 16 }}>
      您提交的内容有如下错误：
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />您的账户已被冻结
      <a style={{ marginLeft: 16 }}>立即解冻 <Icon type="right" /></a>
    </div>
    <div>
      <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />您的账户还不具备申请资格
      <a style={{ marginLeft: 16 }}>立即升级 <Icon type="right" /></a>
    </div>
  </div>
);
const actions = <Button type="primary">返回修改</Button>;

const lastContent = (
  <div>
    <Result
      type="success"
      title="提交成功"
      description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示“单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
      extra={extra}
      actions={actions}
      style={{ width: '50%' }}
    />
  </div>
);

class FormWrapper extends React.Component {
  state = {
    current: 0,
    previewImage: '',
    fileList: [],
    fileListVideoOriginal: [],
    fileListVideoPreview: [],
    fileListVideoPoster: [],
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleChangeVideoOriginal = ({ fileList }) => this.setState({ fileListVideoOriginal: fileList })

  handleChangeVideoPreview = ({ fileList }) => this.setState({ fileListVideoPreview: fileList })

  handleChangeVideoPoster = ({ fileList }) => this.setState({ fileListVideoPoster: fileList })


  beforeUpload = (file) => {
    console.log("file", file);
    const isVideo = file.type === 'video/mp4';
    if (!isVideo) {
      message.error('你只能上传视频文件');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('视频大小不得超过20M');
    }
    // return isVideo && isLt20M;
    return false;
  }

  beforeUploadPoster = (file) => {
    console.log("file", file);
    const isVideo = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isVideo) {
      message.error('你只能上传格式为jpeg、png、jpg的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不得超过2M');
    }
    // return isVideo && isLt20M;
    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form:--eror ', values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { current, fileListVideoPreview, fileListVideoOriginal, fileListVideoPoster } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const firstContent = (
      <Form  onSubmit={this.handleSubmit} layout="horizontal">
        <FormItem
          {...formItemLayout}
          label="上传视频"
        >
          {getFieldDecorator('video', {
            rules: [{
              required: true, message: '请先上传视频！',
            }],
          })(
          <div>
            <Upload
              listType="picture-card"
              fileList={fileListVideoOriginal}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChangeVideoOriginal}
              onPreview={this.handlePreview}
            >
              {fileListVideoOriginal.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传预览视频"
        >
          {getFieldDecorator('videoPreview', {
            rules: [{
              required: false, message: 'Please input your E-mail!',
            }],
          })(
          <div>
            <Upload
              listType="picture-card"
              fileList={fileListVideoPreview}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChangeVideoPreview}
            >
              {fileListVideoPreview.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传视频封面"
        >
          {getFieldDecorator('videoPoster', {
            rules: [{
              required: false, message: 'Please input your E-mail!',
            }],
          })(
          <div>
            <Upload
              listType="picture-card"
              fileList={fileListVideoPoster}
              beforeUpload={this.beforeUploadPoster}
              onChange={this.handleChangeVideoPoster}
            >
              {fileListVideoPoster.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="视频名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请填写视频名称！',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="视频描述"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: false, message: 'Please input your password!',
            }],
          })(
            <Input.TextArea rows={4} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="视频详情"
        >
          {getFieldDecorator('details', {
            rules: [{
              required: false, message: 'Please input your password!',
            }],
          })(
            <Input.TextArea rows={4} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公开情况"
        >
          {getFieldDecorator('authority', {
            initialValue:"public",
            rules: [{
              required: true, message: '请先选择视频公开情况！',
            }],
          })(
            <Select style={{width:180}} allowClear>
              <Select.Option value="public">公开</Select.Option>
              <Select.Option value="private">私有</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            initialValue:true,
            valuePropName: 'checked',
          })(
            <Checkbox>我已阅读 <a href="">用户条款</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认上传</Button>
        </FormItem>
      </Form>
    );
    const steps = [{
      title: '填写视频信息',
      content: firstContent,
    }, {
      title: '完成',
      content: lastContent,
    }];
    return (
      <div>
         <Row type="flex" justify="center">
          <Col span={18}>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className={styles.steps_content}>{steps[this.state.current].content}</div>
            <div className={styles.steps_action}>
              {
                this.state.current < steps.length - 1
                &&
                <Button type="primary" onClick={() => this.next()}>确认上传</Button>
              }
              {
                this.state.current === steps.length - 1
                &&
                <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
              }
              {
                this.state.current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  继续上传
                </Button>
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const UploadVideo = Form.create()(FormWrapper);
export default UploadVideo;