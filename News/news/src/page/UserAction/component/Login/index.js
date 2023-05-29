import styles from './Login.module.scss';
import className from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';
import { useNavigate } from 'react-router-dom';

const cx= className.bind(styles);
function Login() {
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');

    const [checkName,setCheckName]=useState(true);
    const [checkPass,setCheckPass]=useState(true);

    const navigate=useNavigate();

    const[call,setCall]=useState(true);
    const handleLogin = () => {
        if(!userName){
            setCheckName(false)
            // return;
        }
        else{
            setCheckName(true)
        }

        if(!password){
            setCheckPass(false)
            // return;
        }
        else{
            setCheckPass(true)
        }

        if(userName&&password){
            setCheckName(true)
            setCheckPass(true)
            setCall(!call)
        }
    }

    useEffect(() => {
        if(userName&&password){
            request.post('users/login',{
                username:userName,
                password:password,
            },
            {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
            
            )
            .then((response) => {
                if(response.data===''){
                    alert('Thông tin tài khoản hoặc mật khẩu không chính xác');
                    return;
                }
                
                console.log(response);
                localStorage.setItem('user',JSON.stringify(response.data));
                navigate('/')
                
            })
            .catch((err)=>{
                console.log(err);
            })
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[call])
    return (
        <div className={cx('wrapper')}>
            <form className={cx('from-login')}>
                <div className={cx('input-item')}>
                    <input type="text" id="username-input" onChange={(e) => setUserName(e.target.value)} placeholder="Tên đăng nhập" name="username" className={cx('input-value')}></input>
                    {!checkName && <span>Vui long nhap ten dang nhap</span>}
                </div>
                <div className={cx('input-item')}>
                    <input type="password" id="password-input" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu    "className={cx('input-value')} name="password"></input>
                    {!checkPass&&<span>Vui long nhap mat khau</span>}
                </div>
                <div className={cx('btn-login')}>
                    <button type="button" onClick={handleLogin}>Đăng nhập</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
