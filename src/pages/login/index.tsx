/*
 * @Author: czx
 * @Date: 2022-05-21 09:22:35
 * @LastEditTime: 2022-05-22 10:44:56
 * @LastEditors: czx
 * @Description:
 */
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { history } from 'umi';
import './index.less';

export default function IndexPage() {
  const [loginState, setLoginState] = useState({
    account: '',
    password: '',
  });
  //: 输入框动画效果
  useEffect(() => {
    const emailLabel = document.querySelector(
      "label[for='email']",
    ) as HTMLLabelElement;
    const pwdLabel = document.querySelector(
      "label[for='pwd']",
    ) as HTMLLabelElement;

    const RegEXP = /\S/g;
    replaceLabel(pwdLabel.textContent, RegEXP, pwdLabel);
    replaceLabel(emailLabel.textContent, RegEXP, emailLabel);

    function replaceLabel(
      content: string | null,
      RegEXP: any,
      inserEl: HTMLLabelElement,
    ) {
      const result = content?.matchAll(RegEXP) ?? [];
      inserEl.innerHTML = '';
      [...result].map((item, index) => {
        inserEl.insertAdjacentHTML(
          'beforeend',
          `<span style="transition-delay:${index * 50}ms">${item}</span>`,
        );
      });
    }
  }, []);
  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, account: e.target?.value });
  };
  const handlePwdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, password: e.target?.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push('/record');
  };
  return (
    <div className="container">
      <div className="form">
        <h1>学习记录</h1>
        <form id="form" onSubmit={handleSubmit}>
          <div className="email">
            <input
              id="email"
              required
              value={loginState.account}
              onChange={handleAccountChange}
            />
            <label htmlFor="email">账号</label>
          </div>
          <div className="pwd">
            <input
              type="password"
              id="pwd"
              required
              value={loginState.password}
              onChange={handlePwdChange}
            />
            <label htmlFor="pwd">密码</label>
          </div>
          <button>登录</button>
        </form>
      </div>
    </div>
  );
}
