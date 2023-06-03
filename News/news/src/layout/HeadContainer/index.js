import styles from './HeadContainer.module.scss';
import className from 'classnames/bind';
import NewFirst from '~/component/NewFirst';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';

const cx = className.bind(styles);
function HeadContainer() {
    const [featured, setFeatured] = useState(null);
    useEffect(() => {
        request.get('news/featured/', {
            params : {
                page : 0,
                limit : 4
            }
        }).then((res) => setFeatured(res.data));
    }, []);
    return (
        <div className={cx('wrapper')}>
            {featured && (
                <React.Fragment>
                    <div className={cx('most_news-featured')}>
                        <NewFirst
                            id={featured[0].id}
                            image={featured[0].image}
                            timeCreate={featured[0].time}
                            topic={featured[0].category.name}
                            titleNews={featured[0].title}
                            largeHeight
                            fontLargeSize
                            iconCommentSmall
                            iconCommentLarge
                            numberOfCommentsLarge
                        />
                    </div>
                    <div className={cx('other_news-featured')}>
                        <div className={cx('second-featured')}>
                            <NewFirst
                                id={featured[1].id}
                                image={featured[1].image}
                                timeCreate={featured[1].time}
                                topic={featured[1].category.name}
                                titleNews={featured[1].title}
                                largeHeight
                                fontLargeSize
                                iconCommentSmall
                                iconCommentLarge
                                numberOfCommentsLarge
                            />
                        </div>
                        <div className={cx('other-featured')}>
                            {featured.map((element, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {index > 1 && (
                                            <div className={cx('other')}>
                                                <NewFirst
                                                    id={element.id}
                                                    image={element.image}
                                                    timeCreate={element.time}
                                                    topic={element.category.name}
                                                    titleNews={element.title}
                                                    fontSmallSize
                                                    iconCommentSmall
                                                    numberOfCommentsSmall
                                                />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                            {/* <div className={cx('other')}>
                                <NewFirst image={imageR} fontSmallSize iconCommentSmall numberOfCommentsSmall />
                            </div> */}
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default HeadContainer;
