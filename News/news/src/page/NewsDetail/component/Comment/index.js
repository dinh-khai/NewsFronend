import styles from './Comment.module.scss';
import className from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';
import userCreate from '~/untils/getUserInfo';
import moment from 'moment';

const cx = className.bind(styles);
function Comment({ user, content, time, avatar, length, id }) {
    const [hide, setHide] = useState(false);

    const [reComments, setReComments] = useState([]);

    const [inputReComment, setInputReCommet] = useState('');

    const [saveReComment, setSaveReComment] = useState(false);

    const inputRep = useRef();

    useEffect(() => {
        request.get(`comments/${id}/recomments/`).then(function (response) {
            setReComments(response.data);
        });
    }, [id]);

    useEffect(() => {
        if (inputRep.current) {
            inputRep.current.focus();
        }
    }, [hide]);

    useEffect(() => {
        if (!saveReComment) return;

        request.post(
            'recomments/',
            {
                description: inputReComment,
                username: userCreate.username,
                cmtId: id,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        )
        .then(response => {
            setInputReCommet('');
            inputRep.current.value='';
            inputRep.current.focus();

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveReComment]);
    const handleSaveReCmt = () => {
        if (!localStorage.getItem('user')) {
            alert('Vui lòng đăng nhập để bình luận');
            return;
        }

        if (!inputReComment.trim()) {
            alert('Vui lòng nhập bình luận');
            return;
        }

        setSaveReComment(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('comment')}>
                <div className={cx('avatar')}>
                    <img src={avatar} alt=""></img>
                </div>
                <div className={cx('container')}>
                    <div className={cx('name_time')}>
                        <span className={cx('name')}>{user}</span>
                        <span className={cx('time')}>{moment(time).startOf('hour').fromNow()}</span>
                    </div>
                    <div className={cx('content')}>
                        <p>{content}</p>
                    </div>
                    <div className={cx('content-reply')} onClick={() => setHide(!hide)}>
                        <span>Trả lời ({length})</span>
                    </div>
                </div>
            </div>
            {/* reply comment */}
            {hide && (
                <div className={cx('re-comment-wrapper')}>
                    <div className={cx('input-reply')}>
                        <textarea
                            ref={inputRep}
                            onChange={(e) => setInputReCommet(e.target.value)}
                            rows="3"
                            cols="50"
                            placeholder="Viết bình luận của bạn"
                        ></textarea>
                        <button onClick={handleSaveReCmt}>Gửi</button>
                    </div>
                    <div>
                        {reComments && (
                            <React.Fragment>
                                {reComments.map((element, index) => {
                                    return (
                                        // <div className={cx('re-comment-wrapper')} key={index}>
                                        <div className={cx('re-comment')} key={index}>
                                            <div className={cx('avatar')}>
                                                <img src={element.user.avatar} alt=""></img>
                                            </div>
                                            <div className={cx('container')}>
                                                <div className={cx('name_time')}>
                                                    <span className={cx('name')}>{element.user.username}</span>
                                                    <span className={cx('time')}>{moment(element.createdTime).startOf('hour').fromNow()}</span>
                                                </div>
                                                <div className={cx('content')}>
                                                    <p>{element.content}</p>
                                                </div>
                                                <div className={cx('content-reply')}>
                                                    <span>Trả lời</span>
                                                </div>
                                            </div>
                                        </div>
                                        // </div>
                                    );
                                })}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comment;
