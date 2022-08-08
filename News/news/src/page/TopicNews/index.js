import styles from './TopicNews.module.scss';
import className from 'classnames/bind';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import NewsFlex from '~/component/NewsFlex';
import Title from '~/component/Title';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const cx = className.bind(styles);
function TopicNews() {
    const param=useParams();
    const [news,setNews]=useState()
    const [page,setPage]=useState(1);
    const [pages,setPages]=useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/news/category/page/${param.id}`)
        .then(function(response) {
          setPages(response.data)
     })
      },[param.id])

    useEffect(() => {
        axios.get(`http://localhost:8080/news/newsByCate/${param.id}/${page-1}`)
        .then(function(response) {
          setNews(response.data)
     })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[page])


    useEffect(() => {
        axios.get(`http://localhost:8080/news/newsByCate/${param.id}/${0}`)
        .then(function(response) {
          setNews(response.data)
     })
      },[param.id])


    return (
        <div className={cx('wrapper')}>
            <Title text={param.name} />
            <div>
                {
                 news!=null && news.map((element, index) =>{
                   
                    return(                       
                        <NewsFlex key={index}
                        time={element.time}
                        imageNews={element.image}
                        topic={element.category.name}
                        topicLarge
                        title={element.title}
                        description="Trong tran dau vs Totenham anh bay na mot qua phao vao 
                    luoi cua doi chu nha la ga trong va mang ve ba ban thang cho MU, tuoi 37 ganh team 
                    dang cmn  cap luon , dit conme anh bay vip pro vai chuong , dang cap 4 qua trung vang."
                        titleLarge
                        imgLarge
                        id={element.id}
                    />
                    )
                  })  
                }
            </div>
            <ul className={cx('page')}>
                <li className={cx('page-item')}><FontAwesomeIcon className={cx('icon')} icon={faAngleLeft} /></li>
                {
                (()=>{
                    let items=[]
                    for(let i=1; i<=pages;i++) {
                      items.push(<li className={cx('page-item',`${page===i?'active':''}`)} onClick={()=>setPage(i)}  key={i}>{i}</li>)
                    }
                    return items;
                })      
                ()}
                <li className={cx('page-item')}><FontAwesomeIcon className={cx('icon')} icon={faAngleRight} /></li>
            </ul>
        </div>
    );
}

export default TopicNews;
