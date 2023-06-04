import styles from './NewFirst.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import request from '~/untils/request';
import moment from 'moment';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faComment } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NewFirst({
    id,
    image,
    timeCreate,
    topic,
    titleNews,
    fontSize,
    fontLargeSize,
    fontSmallSize,
    fontMediumSize,
    iconCommentSmall,
    iconCommentLarge,
    numberOfCommentsSmall,
    numberOfCommentsLarge,
}) {
    const props = {};
    const title = cx('title', {
        fontLargeSize,
        fontSmallSize,
    });

    const time = cx('time');

    return (
        <div className={cx('wrapper')} {...props} style={{ backgroundImage: `url(${image})` }}>
            <div className={cx('info')}>
                <h4 className={cx('topic')}>{topic}</h4>
                <div className={cx('content')}>
                    <div>
                        <h3 className={title}>
                            <Link to={`/newsDetail/${id}`} className={cx('title-link')}>
                                {titleNews}
                            </Link>
                        </h3>
                    </div>
                    <div className={cx('other')}>
                        <p className={time}>{moment(timeCreate).format('DD-MM-yyyy')}</p>

                        {/* <div className={cx('comments')}>
                            <FontAwesomeIcon icon={faComment} className={iconComment}></FontAwesomeIcon>
                            <span className={numberOfComments}>50</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewFirst;
