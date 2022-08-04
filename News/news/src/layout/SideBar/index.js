import styles from './SideBar.module.scss';
import className from 'classnames/bind';
import Title from '~/page/Home/component/Title';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import NewsFlex from '~/component/NewsFlex';
import axios from 'axios';
import { useEffect, useState } from 'react';

const cx = className.bind(styles);
function SideBar({ margin }) {
    const wrapper = cx('wrapper', { margin });

    const [focus, setFocus] = useState([]);
    const [mostView, setMostView] = useState([]);
    const callApi = async (url, setCategory) => {
        const res = await axios.get(url);
        return setCategory(res.data);
    };

    useEffect(() => {
        callApi(`http://localhost:8080/news/mostByClassify/${1}`, setFocus);
    }, []);

    useEffect(() => {
        callApi(`http://localhost:8080/news/mostViews`, setMostView);
    }, []);

    return (
        <aside className={wrapper}>
            <div className={cx('connect')}>
                <Title text="Kết nối với chúng tôi" />
                <div className={cx('connect-content')}>
                    {/* facebook */}
                    <div className={cx('connect__item')}>
                        <Link to="" className={cx('connect__item-link')}>
                            <div className={cx('connect__item-icon')}>
                                <div className={cx('icon-wrapper', 'icon-fb')}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <span>100,000 Fans</span>
                            </div>
                            <div className={cx('connect__item-action')}>
                                <span>Like</span>
                            </div>
                        </Link>
                    </div>
                    {/* twitter */}
                    <div className={cx('connect__item')}>
                        <Link to="" className={cx('connect__item-link')}>
                            <div className={cx('connect__item-icon')}>
                                <div className={cx('icon-wrapper', 'icon-twitter')}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <span>100,000 Fans</span>
                            </div>
                            <div className={cx('connect__item-action')}>
                                <span>Follow</span>
                            </div>
                        </Link>
                    </div>
                    {/* youtube */}
                    <div className={cx('connect__item')}>
                        <Link to="" className={cx('connect__item-link')}>
                            <div className={cx('connect__item-icon')}>
                                <div className={cx('icon-wrapper', 'icon-youtube')}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </div>
                                <span>100,000 Fans</span>
                            </div>
                            <div className={cx('connect__item-action')}>
                                <span>subscribe</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* tieu diem */}
            <div className={cx('news__focus')}>
                <Title text="Tiêu điểm" />
                {focus.length > 0 && (
                    <div className={cx('news__focus-content')}>
                        {focus.map((element, index) => {
                            return (
                                <NewsFlex
                                    id={element.id}
                                    key={index}
                                    time={element.time}
                                    imageNews={element.image}
                                    topic={element.category.name}
                                    title={element.title}
                                    description
                                    titleSmall
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* most views */}
            <div className={cx('news__most_viewd')}>
                <Title text="Xem nhiều" />
                {mostView.length > 0 && (
                    <div className={cx('news__most_viewd-content')}>
                        {mostView.map((element, index) => {
                            return (
                                <NewsFlex
                                    id={element.id}
                                    key={index}
                                    time={element.time}
                                    imageNews={element.image}
                                    topic={element.category.name}
                                    title={element.title}
                                    description
                                    titleSmall
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </aside>
    );
}

export default SideBar;
