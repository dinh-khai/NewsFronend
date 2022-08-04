import styles from './AccManager.module.scss';
import className from 'classnames/bind';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Title from '~/page/Home/component/Title';

const cx = className.bind(styles);
function AccManager() {
    const param = useParams();
    const [newPass, setNewPass] = useState(null);
    const [reNewPass, setReNewPass] = useState(null);
    const [hideChange,setHideChange]= useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleChangePass = () => {
        if (!newPass) {
            alert('Vui lòng nhập mật khẩu mới');
            return;
        }

        if (reNewPass !== newPass) {
            alert('Mật khẩu nhập lại không khớp');
            return;
        }

        axios.put(`http://localhost:8080/news/user/changePass`, {
            password: newPass,
            userName: user.username,
        },
        {
            headers: {"Content-Type": "application/json"}
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Title text="Quản lý tài khoản" />
            <form className={cx('from-register')}>
                <div className={cx('input-item')}>
                    <span>Tên đăng nhập :</span>
                    <span>{param.name}</span>
                </div>
                <div className={cx('input-item')}>
                    <span>Tên đăng nhập :</span>
                    <span>{user.fullName}</span>
                </div>
                <div className={cx('input-item')}>
                    <span>Email :</span>
                    <span>{user.email}</span>
                </div>
                <div className={cx('avatar')}>
                    <img src={user.avatar} alt=""></img>
                </div>
                <button type="button" className={cx('btn')} onClick={()=>setHideChange(!hideChange)}>
                    Thay đổi mật khẩu
                </button>
                {hideChange && <div className={cx('change-password')}>
                    <input
                        type="password"
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                    />
                    <input
                        type="password"
                        onChange={(e) => setReNewPass(e.target.value)}
                        placeholder="Nhâp lại mật khẩu mới"
                    />
                    <div className={cx('btn-login')}>
                        <button type="button" onClick={handleChangePass}>
                            Thay đổi
                        </button>
                    </div>
                </div>}
            </form>
        </div>
    );
}

export default AccManager;
