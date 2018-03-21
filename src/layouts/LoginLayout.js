import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Icon, Input, Checkbox, message, notification } from "antd";
import md5 from "md5";
import styles from "./LoginLayout.less";
import logo from "../../public/favicon.ico";
import GlobalFooter from "../components/GlobalFooter";
import { login, userLogin } from "../services/api";
import { setCookie } from "../utils/utils.js"
import $ from 'jquery';

const FormItem = Form.Item;
const copyright = <div>Copyright <Icon type="copyright" /> 2018 云熵网络科技技术部出品</div>;
const links = [{
  title: '云熵官网',
  href: 'http://crazycdn.com',
  blankTarget: true,
}, {
  title: 'GitHub',
  href: 'https://github.com/oneandonly1111/console',
  blankTarget: true,
}, {
  title: 'Ant Design',
  href: 'http://ant.design',
  blankTarget: true,
}];
class LoginForm extends React.Component {

  state = {
    submitting: false,
  }

  /*登录验证*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        /*請求登録*/
        this.setState({
          submitting: true
        });
        const params = {
          username: values.username,
          password: values.password
        }
        userLogin(params).then(res => {
          if (res) {
            if (res.success) {
              // setCookie("userName", values.username);
              this.props.subscribeAuth(true);
              this.props.history.push("/");
              notification.open({
                message: '登录成功！',
                description: `${values.username}，欢迎访问CMS-UPLOAD~`,
                icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
              });
            } else {
              message.error("用户名或密码错误！请重新输入~");
            }
          }
          this.setState({
            submitting: false
          });
        });
      }
    });
  }

  render() {
    const { submitting } = this.state;
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
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请填写邮箱地址！' },{ type: 'email', message: '邮箱地址格式错误！', }],
              })(
                <Input size="large" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写密码！' }, { pattern: /^[\w]{8,}$/, message: '密码格式错误！（不少于8位字符的字母数字或下划线）' }],
              })(
                <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a className={styles.forgot_pwd} href="">忘记密码</a>
              <Button size="large" type="primary" htmlType="submit" className={styles.login_btn} loading={submitting}>
                登录
              </Button>
              或 <Link to="/user/register">立即注册！</Link>
            </FormItem>
          </Form>
        </div>
        <GlobalFooter className={styles.footer} copyright={copyright} />
      </div>
    );
  }
}

const LoginLayout = Form.create()(LoginForm);
export default LoginLayout;