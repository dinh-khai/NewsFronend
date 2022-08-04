import styles from './AddMore.module.scss';
import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const cx = className.bind(styles);
function AddMore({ id, action }) {
    const [listInput, setListInput] = useState([{ description: '' }]);
    const [descriptions, setDescriptions] = useState([]);

    const ref=useRef();
    const handleRemove = (index) => {
        const list = [...listInput];
        list.splice(index, 1);
        setListInput(list);
    };

    const handleChangeAdd = (e, index) => {
        const { name, value } = e.target;
        const list = [...listInput];
        list[index][name] = value;
        setListInput(list);
    };

    useEffect(() => {
        if (!action) return;
        const arrDes = [];
        listInput.forEach((element, index) => {
            arrDes.push(element.description);
            setDescriptions(arrDes);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);

    useEffect(() => {
        if (id === null) return;
        if (descriptions.length === 1 && !descriptions[0]) return;
        axios
            .post(
                'http://localhost:8080/admin/news/saveMoreDes',
                {
                    idNews: id,
                    descriptions: descriptions,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) =>
            {
                setListInput([{description:''}])
                ref.current.value='';
        
        }
            )
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <h3>Thêm mô tả cho bài viết</h3>
            {listInput.map((element, index) => {
                return (
                    <div key={index}>
                        <div className={cx('input-item')}>
                            <label>Mô tả</label>
                            <textarea
                            ref={ref}
                                name="description"
                                onChange={(e) => handleChangeAdd(e, index)}
                                id="description"
                                rows="4"
                                cols="50"
                                type="text"
                                placeholder="Nhập mô tả"
                            ></textarea>
                        </div>
                        {listInput.length > 1 && (
                            <button type="button" onClick={() => handleRemove(index)} className={cx('remove')}>
                                Xoa
                            </button>
                        )}
                    </div>
                );
            })}
            {/* <button type="button" onClick={() =>}>Test</button> */}
            {listInput.length < 6 && (
                <button
                    className={cx('btn-add')}
                    type="button"
                    onClick={() => setListInput([...listInput, { description: '', image: null }])}
                >
                    Them
                </button>
            )}
        </div>
    );
}

export default AddMore;
