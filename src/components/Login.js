/* eslint-disable import/no-named-as-default */
import React, { useState } from "react";
import { Form, Icon, Input, Button, Alert, message } from 'antd';
import axios from 'axios';

function Login(props) {
  const [error, setError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let hide = message.loading('Loading User', 0);
        axios.post('https://agrix-api.herokuapp.com/server/api/user/login', values).then(res => {
          const { data } = res;
          if (data.status) {
            setError('');
            props.setLogged(true);
          } else{
            setError(data.data);
          }
         hide();
        })
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {error && error.length > 0 && <Form.Item>
        <Alert message={error} type="error" />
      </Form.Item>}
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
          </Button>
        <Button type="default" style={{ marginLeft: 20 }} onClick={props.hide}>
          Close
          </Button>
      </Form.Item>
    </Form>
  );

}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default (WrappedNormalLoginForm);

