import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Checkbox, Message, Icon, Form } from '@alifd/next';

import styles from './index.module.scss';

const FormItem = Form.Item;

const UserLogin = withRouter((props) => {
  const [value, setValue] = useState({
    userName: '',
    passWord: '',
    
  });

  function handleFormChange(formValue) {
    setValue(formValue);
  }
  function handleSubmit(values, errors) {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    fetch('http://localhost:8080/base/user/login',{
      method: 'POST',
      body:JSON.stringify(values),
      headers: {'Content-type': 'application/json;charset=UTF-8'},
  }).then(
      function(response){
          if(response.status!==200){
            
              console.log("aaa");
          }
        }
        );

    Message.success('登录成功');
    setValue(values);
    sessionStorage.setItem("userName",values.userName);
    props.history.push({ pathname: "/", props: {userName: values.userName } });
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <Form
        value={value}
        onChange={handleFormChange}
        size="large"
      >
        <FormItem required requiredMessage="必填">
          <Input
            innerBefore={(
              <Icon
                type="account"
                size="small"
                className={styles.inputIcon}
              />
)}
            name="userName"
            size="large"
            maxLength={20}
            placeholder="用户名"
          />
        </FormItem>
        <FormItem required requiredMessage="必填">
          <Input
            innerBefore={(
              <Icon
                type="account"
                size="small"
                todo="lock"
                className={styles.inputIcon}
              />
)}
            name="passWord"
            size="large"
            htmlType="passWord"
            placeholder="密码"
          />
        </FormItem>
        <FormItem>
          <Checkbox name="checkbox" className="checkbox">记住账号</Checkbox>
        </FormItem>
        <div>
          <Form.Submit
            type="primary"
            validate
            onClick={handleSubmit}
            className="submitBtn"
          >
              登 录
          </Form.Submit>
          <Link to="/account/register" className={styles.registry}>
              立即注册
          </Link>
        </div>
      </Form>
    </div>
  );
});

export default UserLogin;
