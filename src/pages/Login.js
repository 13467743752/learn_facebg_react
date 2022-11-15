import React, { useState } from 'react';
import { AxiosUtil } from '../utils/AxiosUtil';

export default (props) => {
    const [account, setAccount] = useState();
    const [password, setPassword] = useState(); 
    const handleSubmit = (e) => {
        e.preventDefault();
        // 判断输入帐号和密码
        AxiosUtil.post('login',{
            account:account,
            password:password
        }).then((res)=>{
            if(res.data.flag)
            {
                props.saveToken(account)
            }else{
                alert(res.data.msg)
            }
            
        }).catch((error)=>{
            alert('Invalid account or password!');
        })
        // if (account == 'admin' && password == '123456') {
        //     props.saveToken(account)
        // } else {
        //     alert('Invalid account or password!');
        // }
    }
    return (<div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Account:</p>
                <input type="text" onChange={e => setAccount(e.target.value)} />
            </label>
            <label>
                <p>Password:</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <p>
                <button type="submit">Submit</button>
            </p>
        </form>
    </div>)
}