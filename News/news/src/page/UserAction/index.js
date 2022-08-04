import styles from './UserAction.module.scss';
import className from 'classnames/bind';
import Login from './component/Login';
import Register from './component/Register';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cx= className.bind(styles);
function UserAction() {
    const [hide,setHide]=useState(true);
    const param=useParams()

    useEffect(() => {
        if(param.name==='login'){
            setHide(true);
        }
        else{
            setHide(false);
        }
    },[param.name]);


    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-item',`${hide?'active':''}`)} onClick={() =>setHide(!hide)}>
                    <span>Đăng nhập</span>
                </div>
                <div className={cx('header-item',`${!hide?'active':''}`)} onClick={() =>setHide(!hide)}>
                    <span>Đăng Ký</span>
                </div>
            </div>
            <div className={cx('content')}>
                {hide&&<Login />}
                {!hide&&<Register />}
            </div>
        </div>
     );
}

export default UserAction;