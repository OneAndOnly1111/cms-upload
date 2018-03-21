import React from "react";
import { Row, Col, Steps, Button, Icon, message, Form, Input, Select, Checkbox, Upload, Modal, Tooltip } from 'antd';
import Result from 'ant-design-pro/lib/Result';
import styles from './UploadVideo.less';
import { uploadVideo } from '../../services/api';
import $ from "jquery";
const Step = Steps.Step;
const FormItem = Form.Item;

class FormWrapper extends React.Component {
  state = {
    submitting: false,
    previewImage: '',
    fileListVideoOriginal: [],
    fileListVideoPreview: [],
    fileListVideoPoster: [],
  }

  handleChangeVideoOriginal = ({ fileList }) => this.setState({ fileListVideoOriginal: fileList })

  handleChangeVideoPreview = ({ fileList }) => this.setState({ fileListVideoPreview: fileList })

  handleChangeVideoPoster = ({ fileList }) => this.setState({ fileListVideoPoster: fileList })

  beforeUpload = (file) => {
    console.log("before-upload-file", file);
    const isVideo = file.type === 'video/mp4';
    if (!isVideo) {
      message.error('你只能上传格式为mp4视频文件!');
    }
    // const isLt20M = file.size / 1024 / 1024 < 20;
    // if (!isLt20M) {
    //   message.error('视频大小不得超过20M');
    // }
    // return isVideo && isLt20M;
    return false;
  }

  beforeUploadPoster = (file) => {
    console.log("file", file);
    const isVideo = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isVideo) {
      message.error('你只能上传格式为jpeg、png、jpg的图片!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('图片大小不得超过2M');
    // }
    // return isVideo && isLt20M;
    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const params = {
        original_file: this.state.fileListVideoOriginal[0],
        passage_file: this.state.fileListVideoPreview[0],
        poster_file: this.state.fileListVideoPoster[0],
        video_name: values.video_name,
        desc: values.desc,
        detail: values.detail,
        degree: values.degree
      };
      if (!err) {
        this.setState({ submitting: true });
        var formData = new FormData();
        formData.append("video_name", values.video_name);
        formData.append("degree", values.degree);
        formData.append("original_file", this.state.fileListVideoOriginal[0]);
        values.desc ? formData.append("desc", values.desc) : null;
        values.detail ? formData.append("detail", values.detail) : null;
        this.state.fileListVideoPreview.length ? formData.append("passage_file", this.state.fileListVideoPreview[0]) : null;
        this.state.fileListVideoPoster.length ? formData.append("poster_file", this.state.fileListVideoPoster[0]) : null;
        $.ajax({
          url: '/upload',
          type: 'post',
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          success: (res) => {
            if (res.success) {
              message.success('上传成功！');
              const current = this.state.current + 1;
              this.setState({ current });
              this.setState({
                submitting: false,
                fileListVideoPoster: [],
                fileListVideoPreview: [],
                fileListVideoOriginal: []
              });
              this.props.form.setFieldsValue({
                video_name: '',
                desc: '',
                detail: '',
                degree: ''
              });
            } else {
              message.error('上传失败！');
              const current = this.state.current + 1;
              this.setState({ current });
              this.setState({
                submitting: false,
                fileListVideoPoster: [],
                fileListVideoPreview: [],
                fileListVideoOriginal: []
              });
              this.props.form.setFieldsValue({
                video_name: '',
                desc: '',
                detail: '',
                degree: ''
              });
            }
          }
        });
      }
    });
  }

  render() {
    const { current, fileListVideoPreview, fileListVideoOriginal, fileListVideoPoster, submitting } = this.state;
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
          {getFieldDecorator('original_file', {
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
          {getFieldDecorator('passage_file', {
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
          {getFieldDecorator('poster_file', {
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
          {getFieldDecorator('video_name', {
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
          {getFieldDecorator('desc', {
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
          {getFieldDecorator('detail', {
            rules: [{
              required: false, message: 'Please input your password!',
            }],
          })(
            <Input.TextArea rows={4} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              公开情况&nbsp;
              <Tooltip title="公开代表直接发布到APP,私有代表暂时不发布">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('degree', {
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
          <Button type="primary" htmlType="submit" loading={submitting}>确认上传</Button>
        </FormItem>
      </Form>
    );

    return (
      <div>
         <Row type="flex" justify="center">
          <Col span={18}>
            <div className={styles.steps_content}>{firstContent}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

const UploadVideo = Form.create()(FormWrapper);
export default UploadVideo;