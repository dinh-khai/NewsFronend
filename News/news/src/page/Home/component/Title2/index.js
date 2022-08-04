import styles from './Title2.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Title2({ text, padding, seeMore }) {
    const title = cx('wrapper', {
        padding,
        seeMore,
    });
    const titleText = cx('title-text', {});
    return (
        <div className={title}>
            <div className={cx('title-wrapper')}>
                <span className={titleText}>{text}</span>
            </div>
           {seeMore!=null && <div className={cx('action')}>
                <div className={cx('action-item')}>
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div className={cx('action-item')}>
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
            </div>}
        </div>
    );
}

export default Title2;
