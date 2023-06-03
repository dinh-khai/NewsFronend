import styles from './SideBar.module.scss';
import className from 'classnames/bind';
import Title from '~/component/Title';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import NewsFlex from '~/component/NewsFlex';
import request from '~/untils/request';
import { useEffect, useState } from 'react';

const cx = className.bind(styles);
function SideBar({ margin }) {
    const wrapper = cx('wrapper', { margin });

    const [focus, setFocus] = useState([]);
    const [mostView, setMostView] = useState([]);

    useEffect(() => {
        request.get(`categories/1/`,{
            params : {
              page : 1,
              limit : 3,
              sortType : 'asc'
            }
          })
          .then(function(response) {
            setFocus(response.data)
          })
    }, []);

    useEffect(() => {
        request.get(`categories/1/`,{
            params : {
              page : 1,
              limit : 3,
              sortType : 'asc'
            }
          })
          .then(function(response) {
            setMostView(response.data)
          })
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
                {focus.list && (
                    <div className={cx('news__focus-content')}>
                        {focus.list.map((element, index) => {
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
                {mostView.list && (
                    <div className={cx('news__most_viewd-content')}>
                        {mostView.list.map((element, index) => {
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
