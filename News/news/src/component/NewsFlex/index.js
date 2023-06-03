import styles from './NewsFlex.module.scss';
import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import request from '~/untils/request';
import moment from 'moment';
const cx = classNames.bind(styles);

function NewsFlex({ id, topic, topicLarge, imgLarge, title, shortDescription, time, imageNews, comment, titleLarge }) {
    const cssTitle = cx('title', { titleLarge });
    const img = cx('img-wrapper', { imgLarge });
    const topicName = cx('topic-name', { topicLarge });

    const handleSetView = (id) => {
        axios.put(`http://localhost:8080/news/updateView?id=${id}`);
    };

    return (
        <div className={cx('wrapper')} onClick={() => handleSetView(id)}>
            <Link to={`/newsDetail/${id}`} className={cx('wrapper-link')}>
                <div className={img}>
                    <img src={imageNews} alt=""></img>
                </div>
                <div className={cx('content')}>
                    <div className={topicName}>
                        <span>
                            <p>{topic}</p>
                        </span>
                    </div>
                    <div className={cssTitle}>
                        <span>{title}</span>
                    </div>
                    {imgLarge != null && (
                        <div className={cx('description')}>
                            <p>{shortDescription}</p>
                        </div>
                    )}
                    <div className={cx('time_comment')}>
                        <div className={cx('time')}>
                            <p>{moment(time).format('DD-MM-yyyy')}</p>
                        </div>
                        {/* <div className={cx('comment')}>
                            <FontAwesomeIcon icon={faComment} className={cx('icon')}></FontAwesomeIcon>
                            <span className={cx('number-comments')}>{comment}</span>
                        </div> */}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default NewsFlex;
