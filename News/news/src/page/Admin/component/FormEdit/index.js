import styles from './FormEdit.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from '../Form';

const cx = className.bind(styles);
function FormEdit() {
    const param = useParams();
    return (
        <div className={cx('wrapper')}>
            <Form id = {param.id}/>
        </div>
    );
}

export default FormEdit;