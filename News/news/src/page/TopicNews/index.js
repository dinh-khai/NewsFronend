import styles from './TopicNews.module.scss';
import className from 'classnames/bind';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NewsFlex from '~/component/NewsFlex';
import Title from '~/component/Title';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import request from '~/untils/request';
import { useState } from 'react';
import user from '~/untils/getUserInfo';

const cx = className.bind(styles);
function TopicNews() {
    const param = useParams();
    const [news,setNews] = useState()
    const [page,setPage] = useState(0);

    useEffect(() => {
      request.get(`categories/${param.id}/news`,{
        params : {
          page : page,
          limit : 3,
        }
      })
      .then(function(response) {
        setNews(response.data)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    return (
        <div className={cx('wrapper')}>
            <Title text={param.name} />
            <div>
                {
                 news!=null && news.list.map((element, index) =>{
                   
                    return(                       
                        <NewsFlex key={index}
                        time={element.time}
                        imageNews={element.image}
                        topic={element.category.name}
                        topicLarge
                        title={element.title}
                        shortDescription={element.shortDescription}
                        titleLarge
                        imgLarge
                        id={element.id}
                    />
                    )
                  })  
                }
            </div>
            <ul className={cx('page')}>
                {(news) && <li className={cx('page-item')} onClick={()=>{
                  if(page < 0) {
                    setPage(page-1)
                  }
                }}><FontAwesomeIcon className={cx('icon')} icon={faAngleLeft} /></li>}
                {
                (()=>{
                  let items=[]
                  if(news !=null) {
                    for(let i = 0; i < news.totalPages;i++) {
                        items.push(<li className={cx('page-item',`${page===i?'active':''}`)} onClick={()=>setPage(i)}  key={i}>{i+1}</li>)
                      }
                  }
                    return items;
                })      
                ()}
                <li className={cx('page-item')} onClick={()=>{
                  if(page < news.totalPages - 1) {
                    setPage(page+1)
                  }
                  }}><FontAwesomeIcon className={cx('icon')} icon={faAngleRight} /></li>
            </ul>
        </div>
    );
}

export default TopicNews;
