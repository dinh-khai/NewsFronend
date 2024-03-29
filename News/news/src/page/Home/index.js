import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Title from '~/component/Title';
import NewsBlock from '~/component/NewsBlock';
import NewsFlex from '~/component/NewsFlex';
import NewFirst from '~/component/NewFirst';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';

const cx = classNames.bind(styles);
function Home() {
    const [mostNews, setMostNews] = useState([]);
    const [world, setWorld] = useState([]);
    const [politics, setPolitics] = useState([]);
    const [sport, setSport] = useState([]);
    const [technology, setTechnology] = useState([]);
    const [healthy, setHealthy] = useState([]);

    useEffect(() => {
        request.get('news/', {
            params : {
                page : 0,
                limit : 6,
                sortType : "desc",
            }
        }).then(function (response) {
            setMostNews(response.data);
        })
    }, []);

    useEffect(() => {
        request.get(`categories/1/news/`, {
            params : {
                page : 0,
                limit : 6,
                sortType : 'desc'
            }
        }).then(function (response) {
            setWorld(response.data.list);
        });
    }, []);

    useEffect(() => {
        request.get(`categories/2/news/`, {
            params : {
                page : 0,
                limit : 6,
                sortType : 'desc'
            }
        }).then(function (response) {
            setPolitics(response.data.list);
        });
    }, []);

    useEffect(() => {
        request.get(`categories/3/news/`, {
            params : {
                page : 0,
                limit : 6,
                sortType : 'desc'
            }
        }).then(function (response) {
            setSport(response.data.list);
        });
    }, []);

    useEffect(() => {
        request.get(`categories/3/news/`, {
            params : {
                page : 0,
                limit : 6,
                sortType : 'desc'
            }
        }).then(function (response) {
            setTechnology(response.data.list);
        });
    }, []);
    useEffect(() => {
        request.get(`categories/3/news/`, {
            params : {
                page : 0,
                limit : 6,
                sortType : 'desc'
            }
        }).then(function (response) {
            setHealthy(response.data.list);
        }); 
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <div className={cx('home')}>
            {/* news new */}
            <div className={cx('news-new')}>
                <Title text="Tin mới" />
                <div className="news-new-content">
                    {mostNews && mostNews.totalPages > 0 && (
                        <div className="grid__row">
                            <div className="grid__col-6">
                                <NewsBlock
                                    id={mostNews.list[0].id}
                                    time={mostNews.list[0].time}
                                    imageNews={mostNews.list[0].image}
                                    topic={mostNews.list[0].category.name}
                                    title={mostNews.list[0].title}
                                    description
                                />
                                {mostNews.length > 1 && (
                                    <NewsBlock
                                        id={mostNews.list[1].id}
                                        time={mostNews.list[1].time}
                                        imageNews={mostNews.list[1].image}
                                        topic={mostNews.list[1].category.name}
                                        title={mostNews.list[1].title}
                                        description
                                    />
                                )}
                            </div>
                            {mostNews.list.length > 2 && (
                                <div className="grid__col-6">
                                    {mostNews.list.map((element, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {index > 1 && (
                                                    <NewsFlex
                                                        id={element.id}
                                                        time={element.time}
                                                        imageNews={element.image}
                                                        topic={element.category.name}
                                                        title={element.title}
                                                        description
                                                        titleSmall
                                                    />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* world */}
            <div className={cx('news-world')}>
                <Title text="Thế giới" seeMore />
                <div className={cx('news-world-content')}>
                    {world.length > 0 && (
                        <Slider {...settings}>
                            {world.map((element, index) => {
                                return (
                                    <div className={cx('test')} key={index}>
                                        <div className={cx('world', 'heal')}>
                                            <NewFirst
                                                id={element.id}
                                                image={element.image}
                                                timeCreate={element.time}
                                                topic={element.category.name}
                                                titleNews={element.title}
                                                largeHeight
                                                fontMediumSize
                                                iconCommentSmall
                                                iconCommentLarge
                                                numberOfCommentsLarge
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </div>
            </div>
            {/* Politics */}
            <div className={cx('news-politics')}>
                <Title text="Chính trị" />
                {politics.length > 0 && (
                    <div className="news-politics-content">
                        <div className="grid__row">
                            <div className="grid__col-6">
                                <NewsBlock
                                    id={politics[0].id}
                                    time={politics[0].time}
                                    imageNews={politics[0].image}
                                    topic={politics[0].category.name}
                                    title={politics[0].title}
                                    description
                                />
                                {politics.length > 1 && (
                                    <NewsBlock
                                        id={politics[1].id}
                                        time={politics[1].time}
                                        imageNews={politics[1].image}
                                        topic={politics[1].category.name}
                                        title={politics[1].title}
                                        description
                                    />
                                )}
                            </div>
                            {politics.length > 2 && (
                                <div className="grid__col-6">
                                    {politics.map((element, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {index > 1 && (
                                                    <NewsFlex
                                                        id={element.id}
                                                        time={element.time}
                                                        imageNews={element.image}
                                                        topic={element.category.name}
                                                        title={element.title}
                                                        description
                                                        titleSmall
                                                    />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* sports and technology */}
            <div className={cx('sport_technology')}>
                <div className="grid__row">
                    {/* sport */}
                    <div className="grid__col-6">
                        <Title text="Thể thao" />
                        {sport.length > 0 && (
                            <div className="sport-content">
                                {sport.map((element, index) => {
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
                    {/* technology */}
                    <div className="grid__col-6">
                        <Title text="Công nghệ" />
                        {technology.length > 0 && (
                            <div className="sport-content">
                                {technology.map((element, index) => {
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
                </div>
            </div>

            {/* healthy */}
            <div className={cx('healthy')}>
                <Title text="Sức khỏe" seeMore />
                <div className={cx('healthy-content')}>
                    {healthy.length > 0 && (
                        <Slider {...settings}>
                            {healthy.map((element, index) => {
                                return (
                                    <div className={cx('test')} key={index}>
                                        <div className={cx('world', 'heal')}>
                                            <NewFirst
                                                id={element.id}
                                                image={element.image}
                                                timeCreate={element.time}
                                                topic={element.category.name}
                                                titleNews={element.title}
                                                largeHeight
                                                fontMediumSize
                                                iconCommentSmall
                                                iconCommentLarge
                                                numberOfCommentsLarge
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
