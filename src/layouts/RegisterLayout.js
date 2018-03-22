import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Icon, Input, Checkbox, message, notification, Radio } from "antd";
import $ from "jquery";
import styles from "./LoginLayout.less";
import logo from "../assets/logo.ico";
import GlobalFooter from "../components/GlobalFooter";
import { queryVerifyCode, userRegister } from "../services/api.js";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const copyright = <div>Copyright <Icon type="copyright" /> 2018 云熵网络科技技术部出品</div>;
const links = [{
  title: '云熵官网',
  href: 'http://crazycdn.com',
  blankTarget: true,
}, {
  title: 'GitHub',
  href: 'https://github.com/oneandonly1111/blockchain_demo',
  blankTarget: true,
}, {
  title: 'Ant Design',
  href: 'http://ant.design',
  blankTarget: true,
}];

const codeUrl = 'http://' + window.location.host // http://192.168.2.39:8000';
console.log("codeUrl", codeUrl);

class LoginForm extends React.Component {

  state = {
    confirmDirty: false,
    submitting: false,
    captcha: {},
  }

  componentDidMount() {
    this.getVerifyCode();
  }

  /*获取验证码*/
  getVerifyCode = () => {
    queryVerifyCode().then((res) => {
      this.setState({
        captcha: res
      });
    })
  }

  /*注册验证*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          submitting: true
        });
        const params = {
          email: values.email,
          password: values.password,
          captcha_0: this.state.captcha.captcha_key,
          captcha_1: values.verifyCode
        };
        userRegister(params).then(res => {
          if (res.success) {
            message.success('注册成功！我们已经发了一封邮件到您的邮箱，请前往验证！', 3);
          } else {
            message.error(`注册失败！${res.msg}`);
          }
          this.setState({
            submitting: false
          });
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请重新输入！');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordComfirm'], { force: true });
    }
    callback();
  }


  render() {
    const { captcha } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>DAPP</span>
            </Link>
          </div>
          <div className={styles.desc}></div>
        </div>
        <div className={styles.main}>
          <h3>用户注册</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请填写邮箱地址！' },{ type: 'email', message: '邮箱地址格式错误！', }],
              })(
                <Input size="large" placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写密码！' },{ pattern:/^[\w]{8,}$/, message:'密码格式不正确！（不少于8位字符的字母数字下划线）' },{ validator: this.checkConfirm }],
              })(
                <Input size="large" type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('passwordComfirm', {
                rules: [{ required: true, message: '请确认密码！' },{ pattern:/^[\w]{8,}$/, message:'密码格式不正确！（不少于8位字符的字母数字下划线）' },{ validator: this.checkPassword }],
              })(
                <Input size="large" onBlur={this.handleConfirmBlur} type="password" placeholder="确认密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('verifyCode', {
                rules: [{ required: true, message: '请填写验证码！' }],
              })(
                <div>
                  <img
                    style={{width:'30%',marginRight:'2%',verticalAlign:'top'}}
                    src={ codeUrl+this.state.captcha.captcha_image_url }
                    onClick={this.getVerifyCode}
                    alt="点击刷新"
                  />
                  <Input size="large" style={{display:'inlineBlock',width:'68%'}} placeholder="验证码" />
                </div>
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                className={styles.submit}
                type="primary"
                htmlType="submit"
                loading={this.state.submitting}
              >
                {this.state.submitting ? '注册中...' : '注册'}
              </Button> 
              <Link className = { styles.login } to = "/user/login"  >使用已有账户登录 </Link> 
            </FormItem>
          </Form>
        </div>
        <GlobalFooter className={styles.footer} copyright={copyright} />
      </div>
    );
  }
}

const RegisterLayout = Form.create()(LoginForm);
export default RegisterLayout;