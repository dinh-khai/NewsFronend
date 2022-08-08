import styles from './NewsDetail.module.scss';
import className from 'classnames/bind';
import Title from '~/component/Title';
import Comment from './component/Comment';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const cx = className.bind(styles);
function NewsDetail() {
    const param = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState('');
    const inputRef = useRef();
    const [saveComment, setSaveComment] = useState(false);

    // const [reloadCmt,setReLoadCmt] = useState(false)

    const [moreDes, setMoreDes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/news/getNews?id=${param.id}`).then((res) => setNews(res.data));
    }, [param.id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/news/allCommentOfNews/${param.id}`).then(function (response) {
            setComments(response.data);
            inputRef.current.focus();
        })  
    }, [param.id]);

    // useEffect(() => {
    //     if(!reloadCmt) return;
    //     axios.get(`http://localhost:8080/news/allCommentOfNews/${param.id}`)
    //     .then(response=>{
    //         setComments(response.data);
    //         setReLoadCmt(false)
    //     })    
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [reloadCmt])

    useEffect(() => {
        axios.get(`http://localhost:8080/news/loadMoreDes?id=${param.id}`).then(function (response) {
            setMoreDes(response.data);
        });
    }, [param.id]);

    useEffect(() => {
        if (!saveComment) return;
        axios.post(
            'http://localhost:8080/news/comment/saveComment',
            {
                description: inputComment,
                userName: JSON.parse(localStorage.getItem('user')).userName,
                id: news.id,
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
                    <div className={cx('description')}>
                        <p>{news.description} </p>
                    </div>
                    <div className={cx('img')}>
                        <img src={news.image} alt=""></img>
                    </div>

                    {moreDes.map((element, index) => {
                        return (
                            <div className={cx('description')} key={index}>
                                <p>{element.description} </p>
                            </div>
                        );
                    })}
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
                {comments.length > 0 && (
                    <React.Fragment>
                        {comments.map((comment, index) => {
                            return (
                                <Comment
                                    user={comment.userCreator.userName}
                                    content={comment.content}
                                    length={comments.length}
                                    time={comment.createdTime}
                                    id={comment.id}
                                    key={index}
                                    avatar={comment.userCreator.avatar}
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
