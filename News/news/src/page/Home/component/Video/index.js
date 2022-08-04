import ReactPlayer from 'react-player';
import styles from './Video.module.scss';
import className from 'classnames/bind';

const cx=className.bind(styles);
function Video() {
    return <div className={cx('wrapper')}>
        <ReactPlayer url='https://www.youtube.com/watch?v=I90no1eQ45E' width='100%'></ReactPlayer>
    </div>;
}

export default Video;
