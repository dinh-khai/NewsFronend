import styles from './Form.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import request from '~/untils/request';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import user from '~/untils/getUserInfo'

const cx = className.bind(styles);
function Form() {
    // const {register, handleSubmit,formState:{errors} ,watch}=useForm();
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [cate, setCate] = useState(0);
    const [classify, setClassify] = useState(0);
    const [featured, setFeatured] = useState(false);

    const [cates, setCates] = useState([]);
    const [classifies, setClassifies] = useState([]);
    const [send, setSend] = useState(false);

    const refTitle = useRef();
    const [action,setAction]=useState(false);
    const [isCreate, setIsCreate] = useState(true);

    useEffect(() => {
        request.get('categories/').then((response) => setCates(response.data));
    }, []);

    useEffect(() => {
        request.get('classifications/').then((response) => setClassifies(response.data));
    }, []);

    // useEffect(() => {
    //     request.get(`news/${id}`).then((response) => setClassifies(response.data));
    // }, []);

    useEffect(() => {
        if (!send) return;
        request
            .post(
                'news/',
                {
                     dto : JSON.stringify({
                         title: title,
                         shortDescription : shortDescription,
                         description: description,
                         categoryId: cate + 1,
                         classifyId: classify,
                         featured: featured == null ? false : featured,
                         username : user.username,
                    }),
                    file: file,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((res) => {
                if(res.status === 201) {
                    setAction(false)
                    setTitle('');
                    setDescription('');
                    setShortDescription('')
                } else {
                    alert(res.data);
                }

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

                        <div className={cx('input-item')}>
                            <label>Mô tả ngắn</label>
                            <textarea
                                name="title"
                                id="title"
                                onChange={(e) => setShortDescription(e.target.value)}
                                type="text"
                                placeholder="Nhập mô tả ngắn"
                                maxLength="200"
                                className={cx('title')}
                                value={shortDescription}
                            ></textarea>
                        </div>

                        <div className={cx('input-item')}>
                            <label>Mô tả </label>
                            <div className="item">
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={description}
                                    onReady={ editor => {
                                    
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        
                                    } }
                                />
                            </div>
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
