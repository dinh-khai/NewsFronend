import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Account() {
    const [hide, setHide] = useState(false);
    const handle = () => setHide(!hide);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setShow(true);
            return;
        }

        if (localStorage.getItem('user') === null) {
            setShow(false);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('user')]);

    return (
        <div className={cx('wrapper')}>
            {!show && !localStorage.getItem('user') && (
                <div className={cx('account-wrapper')}>
                    <div className={cx('account')} onClick={handle}>
                        <span>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faUser}></FontAwesomeIcon>
                        </span>
                        <span className={cx('account-title')}>Tài khoản</span>
                    </div>
                    {hide && (
                        <div className={cx('login-in_register')}>
                            <button onClick={() => navigate(`/userAction/${'login'}`)}>Đăng nhập</button>
                            <button onClick={() => navigate('/userAction/register')}>Đăng ký</button>
                        </div>
                    )}
                </div>
            )}
            {/* user before login */}

            {show && localStorage.getItem('user') && (
                <div className={cx('account-wrapper')}>
                    <div className={cx('account')} onClick={handle}>
                        <div className={cx('avatar')}>
                            <img src={JSON.parse(localStorage.getItem('user')).avatar} alt=""></img>
                        </div>
                        <div className={cx('full-name')}>{JSON.parse(localStorage.getItem('user')).fullName}</div>
                    </div>
                    {hide && (
                        <div className={cx('login-in_register')}>
                            <button
                                onClick={() =>
                                    navigate(`/accManager/${JSON.parse(localStorage.getItem('user')).userName}`)
                                }
                            >
                                Quản lý tài khoản
                            </button>
                            {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).admin && (
                                <button
                                    onClick={() =>
                                        navigate(`/admin`)
                                    }
                                >
                                    Admin
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setHide(false);
                                    localStorage.removeItem('user');
                                    setShow(false);
                                }}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(Account);
