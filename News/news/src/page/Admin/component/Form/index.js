import styles from './Form.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';
import AddMore from '../AddMore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const cx = className.bind(styles);
function Form() {
    // const {register, handleSubmit,formState:{errors} ,watch}=useForm();
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
        request.get('categories/').then((response) => setCates(response.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/news/classify/all').then((response) => setClassifies(response.data));
    }, []);

    useEffect(() => {
        if (!send) return;
        request
            .post(
                'news/',
                {
                     dto : JSON.stringify({
                        title: title,
                        description: description,
                        categoryId: cate + 1,
                        classifyId: classify,
                        featured: featured == null ? false : featured,
                    }),
                    file: file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((res) => {
                console.log(res);
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

        // if (!file) {
        //     alert('vui long thêm hình ảnh');
        //     return;
        // }

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
            <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                       
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDescription(...data);
                    } }
                    onBlur={ ( event, editor ) => {
                        
                    } }
                    onFocus={ ( event, editor ) => {
                        
                    } }
                />
            </div>
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

export default Form;
