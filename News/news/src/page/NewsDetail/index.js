import styles from './NewsDetail.module.scss';
import className from 'classnames/bind';
import Title from '~/component/Title';
import Comment from './component/Comment';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import request from '~/untils/request';
import user from '~/untils/getUserInfo'
import { useRef } from 'react';

const cx = className.bind(styles);
function NewsDetail() {
    const param = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState('');
    const inputRef = useRef();
    const [saveComment, setSaveComment] = useState(false);

    useEffect(() => {
        request.get(`news/${param.id}`).then((res) => setNews(res.data));
    }, [param.id]);

    useEffect(() => {
        request.get(`news/${param.id}/comments/`,{
            params : {
            page : 0,
            limit : 10
            }
        }).then(function (response) {
            setComments(response.data);
            inputRef.current.focus();
        })  
    }, [param.id]);

    useEffect(() => {
        if (!saveComment) return;
        request.post(
            'comments/',
            {
                description: inputComment,
                username: user.username,
                newsId: news.id,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveComment]);

    const handleSaveCmt = () => {
        if (!localStorage.getItem('user')) {
            alert('Vui lòng đăng nhập để bình luận');
            return;
        }

        if (!inputComment.trim()) {
            alert('Vui lòng nhập bình luận');
            return;
        }
       setSaveComment(true);
    };

    return (
        <div className={cx('wrapper')}>
            {news && (
                <div>
                    <div className={cx('topic')}>
                        <span>{news.topic}</span>
                    </div>
                    <div className={cx('title')}>
                        <h3>{news.title}</h3>
                    </div>
                    <div className={cx('img')}>
                        <img src={news.image} alt=""></img>
                    </div>
                    <div className={cx('description')} dangerouslySetInnerHTML = {{__html : news.description}}>
                    </div>
                </div>
            )}

            {/* comment */}
            <div className={cx('comment-wrapper')}>
                <Title text="Bình luận" />
                <div className={cx('comment-input')}>
                    <textarea
                        rows="3"
                        cols="50"
                        ref={inputRef}
                        onChange={(e) => setInputComment(e.target.value)}
                        placeholder="Viết bình luận của bạn"
                    ></textarea>
                    <button onClick={handleSaveCmt}>Gửi</button>
                </div>
                {comments.list && (
                    <React.Fragment>
                        {comments.list.map((comment, index) => {
                            return (
                                <Comment
                                    user={comment.user.username}
                                    content={comment.description}
                                    length={comments.length}
                                    time={comment.createdTime}
                                    id={comment.id}
                                    key={index}
                                    avatar={comment.user.avatar}
                                ></Comment>
                            );
                        })}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default NewsDetail;
