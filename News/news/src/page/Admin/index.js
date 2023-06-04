import styles from './Admin.module.scss';
import className from 'classnames/bind';
import Title from '~/component/Title';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrashCan, faXmark, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Form from './component/Form';
import { useEffect, useState } from 'react';
import momment from 'moment';
import request from '~/untils/request';

const cx= className.bind(styles);
function Admin() {

    const [hideAdd,setHideAdd] =useState(false);
    const [hideEdit,setHideEdit]=useState(false);
    const [news,setNews] = useState([]);
    const [loadAll,setLoadAll]=useState(true);
    const [page,setPage] = useState(0);

    const [idN,setIdN] = useState();
    
    useEffect(() => {
        if(!idN) return;
        request.delete(`news/`
        ,{
            params : {
                id : idN,
            }
        }
        )
        .then(res=>{setLoadAll(true)})
    },[idN])

    useEffect(() => {
        request.get('news/',{
            params : {
                page : page,
                limit : 12,

            }
        })
        .then(res=>{
            setNews(res.data);
            setLoadAll(false);
        }
            )
    },[page, loadAll])


    return (     
        <div className={cx('wrapper')}>
            {hideEdit&&<div className={cx('edit-wrapper')}>
               <div className={cx('edit')}>
                <div className={cx('close')} onClick={() =>setHideEdit(false)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                <Form />
               </div>
            </div>}
            <Title text='Quản lý tin tức' />
            <div className={cx('container')}>
                <div className={cx('list-news')}>
                    <ul className={cx('list')}>
                        <li className={cx('item')}><h3>ID</h3></li>
                        <li className={cx('item')}><h3>Tiêu đề</h3></li>
                        <li className={cx('item')}><h3>Hình ảnh</h3></li>
                        <li className={cx('item')}><h3>Thời gian</h3></li>
                        <li className={cx('item')}><h3>Sửa/Xóa</h3></li>
                    </ul>
                    {
                       news.list && news.list.map((element,index) => {
                            return(
                                    <ul className={cx('list')} key={index}>
                                        <li className={cx('item')}>{element.id}</li>
                                        <li className={cx('item')}><p>{element.title}</p></li>
                                        <li className={cx('item')}><img src={element.image} alt="" /></li>
                                        <li className={cx('item')}>{momment(element.time).format('DD-MM-yyyy')}</li>
                                        <li className={cx('item')}>
                                            <button className={cx('btn')} onClick={() =>setHideEdit(true)}>
                                                <span>Sửa</span>
                                                <FontAwesomeIcon icon={faPen}/>
                                            </button>
                                            <button className={cx('btn')} onClick={() =>setIdN(element.id)}>
                                                <span>Xóa</span>
                                                <FontAwesomeIcon icon={faTrashCan}/>
                                            </button>
                                        </li>                   
                                    </ul>
                                )
                            })
                    }                      
                </div>
                <div>
                <ul className={cx('page')}>
                {(news) && <li className={cx('page-item')} onClick={()=>{
                  if(!news.first) {
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
                  if(!news.last) {
                    setPage(page+1)
                  }
                  }}><FontAwesomeIcon className={cx('icon')} icon={faAngleRight} /></li>
            </ul>
                </div>
                <div className={cx('add')}>
                    <div className={cx('btn-add')}>
                        <button onClick={()=>setHideAdd(!hideAdd)}>
                            <div className={cx('icon-add')}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div>
                                <span>Thêm</span>
                            </div>
                        </button>
                    </div>
                    {hideAdd && <Form />}
                </div>
            </div>
        </div>
     );
}

export default Admin;