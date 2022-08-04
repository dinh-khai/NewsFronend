import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Search() {
    const[input,setInput]=useState('');

    const inputRef=useRef(); 

    const handeDeleteAll=()=>{
        setInput("");
        inputRef.current.focus();
    }

    return (
        <div className={cx('search')}>
            <input type="text" placeholder="Tìm kiếm" 
            value={input} 
            onChange={(e)=>setInput(e.target.value)} 
            ref={inputRef}
            />
          { input!=="" && input!=null && 
          <div className={cx('clear-wrapper')} onClick={handeDeleteAll}>
                <FontAwesomeIcon icon={faCircleXmark} className={cx('clear')} />
            </div>}
            <button type="button">
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Search;
