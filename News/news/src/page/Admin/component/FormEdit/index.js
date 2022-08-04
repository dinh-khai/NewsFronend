import styles from './FormEdit.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const cx = className.bind(styles);
function FormEdit() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [cate, setCate] = useState(0);
    const [classify, setClassify] = useState(0);
    const [featured, setFeatured] = useState(false);

    const [cates, setCates] = useState([]);
    const [classifies, setClassifies] = useState([]);
    const [send, setSend] = useState(false);

    const refTitle = useRef();
    const refDescription = useRef();

    const [id,setId]=useState(null);
    const [action,setAction]=useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/news/category/all').then((response) => setCates(response.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/news/classify/all').then((response) => setClassifies(response.data));
    }, []);

    useEffect(() => {
        if (!send) return;
        axios
            .post(
                'http://localhost:8080/admin/news/save',
                {
                    title: title,
                    description: description,
                    file: file,
                    cateId: cate + 1,
                    classifyId: classify,
                    featured: featured == null ? false : featured,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((res) => {
                setId(res.data.id);
                setAction(false)
                setTitle('');
                setDescription('');

            })
            .catch((error) => console.log(error));
        setSend(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [send]);

    const handleSend = () => {
        if (!title.trim()) {
            alert('Vui lòng nhật tiêu đề cho tin tức');
            return;
        }

        if (!description.trim()) {
            alert('vui lòng nhập mô tả cho tin tức');
            return;
        }

        setSend(true);
        setAction(true);
        refTitle.current.value = '';
        refTitle.current.focus();
        refDescription.current.value = '';
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('add-form')}    >
                <div className={cx('add')}>
                    <div className={cx('form-primary')}>
                        <div className={cx('input-item')}>
                            <label>Tiêu đề</label>
                            <input
                                name="title"
                                id="title"
                                ref={refTitle}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Nhập tiêu đề"
                                className={cx('title')}
                            ></input>
                        </div>
                        <div className={cx('input-item')}>
                            <label>Mô tả</label>
                            <textarea
                                name="description"
                                ref={refDescription}
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                rows="4"
                                cols="50"
                                type="text"
                                placeholder="Nhập mô tả"
                            ></textarea>
                        </div>
                        <div className={cx('input-item')}>
                            <label>Chọn ảnh</label>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
                        </div>
                        <div className={cx('input-item')}>
                            <label>Chọn thể loại</label>
                            <select className={cx('input-select')} onChange={(e) => setCate(e.target.selectedIndex)}>
                                {cates.map((c, index) => {
                                    return <option key={index}>{c.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className={cx('input-item')}>
                            <label>Chọn phân loại</label>
                            <select
                                className={cx('input-select')}
                                onChange={(e) => setClassify(e.target.selectedIndex)}
                            >
                                <option>Không thuộc phân loại nào</option>
                                {classifies.map((c, index) => {
                                    return <option key={index}>{c.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className={cx('input-item', 'input-check')}>
                            <label>Thuộc tin tức nổi bật</label>
                            <input type="checkbox" onChange={(e) => setFeatured(e.target.checked)} />
                        </div>
                    </div>
                </div>
                <div className={cx('btn-send')}>
                    <button type="button" onClick={handleSend}>
                        Gửi
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormEdit;