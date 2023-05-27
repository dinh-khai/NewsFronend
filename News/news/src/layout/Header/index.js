import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './component/Search';
import Account from './component/Account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import request from '~/untils/request.js';

const cx = classNames.bind(styles);

function Header() {
    const [hide,setHide]=useState(true);
    const [text,setText]=useState('');
    const [categories,setCategory]=useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      request.get('categories/')
           .then(function(response) {
             setCategory(response.data)
        })
        .catch(function(err) {
            console.log("khaidz")
        })
    },[])

    const obj=[
        {
            name:'Trang chủ',
            path:'/',
        },
        
        {
            name:'Tin tức',
            path:'',
        },
        
        {
            name:'Liên hệ',
            path:'',
        },

        {
            name:'Giới thiệu',
            path:'',

        }
    ]

    return (
        <div className={cx('header')}>
            <div className="grid">
                <nav className={cx('nav')}>
                    <div className={cx('logo')} onClick={() =>navigate('/')}>
                            <img
                                src="https://demo.tagdiv.com/newspaper_pro/wp-content/uploads/2021/06/newspaper-11-logo-blue.png"
                                alt=""
                            ></img>
                    </div>
                    <Search />
                    <Account />
                </nav>
                <div className={cx('header-category')}>
                    <ul className={cx('header-category-list')}>
                        {
                            obj.map((element,index) => {
                                return(
                                    <li className={cx('header-category-list__item')} 
                                    key={index} 
                                    onClick={element.name==='Tin tức'?()=>{
                                        setHide(!hide)
                                        setText(element.name)
                                    }:()=>setText(element.name) }
                                    style={element.name===text?{ borderBottom: 'solid 3px var(--primary-color)'}:{}}
                                    >
                                        {element.name!=='Tin tức' && <Link to={element.path} className={cx('header-category-list__item--link')}>
                                            {element.name}
                                        </Link>}
                                        {element.name==='Tin tức' && 
                                        <React.Fragment>
                                            {element.name}
                                        {hide&&<FontAwesomeIcon className={cx('icon-down')} icon={faSortDown}/>}
                                        {!hide&&<FontAwesomeIcon className={cx('icon-up')} icon={faSortUp}/>}
                                    
                                        {!hide&&<div className={cx('category_news')}>  
                                            { categories.map((category,index)=>{
                                            return (
                                                <NavLink  
                                                key={index} 
                                                to={`/topicNews/${category.name}/${1}/${category.id}`} className={(nav)=>cx('category_news__item-link')}>{category.name}</NavLink>
                                            )
                                            }
                                            )
                                                
                                                }
                                           
                                        </div>}
                                        </React.Fragment>
                            }
                                     </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Header;
