import styles from './NewsBlock.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import request from '~/untils/request';
import moment from 'moment';
const cx = classNames.bind(styles);

function NewsBlock({
    imgNews,
    imgLarge,
    imgSmall,
    hide,
    imageNews,
    topic,
    title,
    description,
    time,
    comment,
    titleSmall,
    id,
}) {
    const cssTitle = cx('title', { titleSmall });
    const image = cx('img-wrapper', { imgLarge });
    return (
        <div className={cx('wrapper')}>
            <Link to={`/newsDetail/${id}`} className={cx('wrapper-link')}>
                <div className={image}>
                    <img src={imageNews} alt=""></img>
                </div>
                <div className={cx('content')}>
                    <div className={cx('topic-name')}>
                        <span to="/contact">
                            <p>{topic}</p>
                        </span>
                    </div>
                    <div className={cssTitle}>
                        <span>{title}</span>
                    </div>
                    <div className={cx('time_comment')}>
                        <span className={cx('time')}>{moment(time).format('DD-MM-yyyy')}</span>
                        <span className={cx('comment')}>
                            <FontAwesomeIcon icon={faComment} className={cx('icon-comment')}></FontAwesomeIcon>
                            <span className={cx('number-comments')}>{comment}</span>
                        </span>
                    </div>
                    <div className={cx('description')}>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default NewsBlock;
