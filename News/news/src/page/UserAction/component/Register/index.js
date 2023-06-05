import styles from './Register.module.scss';
import className from 'classnames/bind';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import request from '~/untils/request';
import { useNavigate } from 'react-router-dom';

const cx= className.bind(styles);
function Register() {
    const {register, handleSubmit,formState:{errors} ,watch}=useForm();
    const [datas,setDatas]=useState(null);
    const pass=watch('password')  
    const [imageD,setImageD]=useState(); 
    const navigate=useNavigate()
    const handleSendData=(data)=>{
      setDatas(data);
    }  
    useEffect(()=>{
        if(datas!==null){
            request.post('users/'
            ,{
                dto : JSON.stringify({
                    username:datas.userName,
                    password:datas.password,
                    fullName:datas.fullName,  
                    email:datas.email,
                }),
                file:imageD,
            },{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
            )
            .then((response)=>{
                console.log(response.data.msg)
                    alert("Dang ky tai khoan thanh cong")
                    navigate("/userAction/login")
            })
            .catch((error)=>{
                alert(error.response.data.msg)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[datas]) 

    return ( 
    <div className={cx('wrapper')}>
        <form className={cx('from-register')}  onSubmit={handleSubmit(handleSendData)}>
            <div className={cx('input-item')}>
                <input type="text" placeholder="Tên đăng nhập" {...register("userName",{required:true})} name="userName" className={cx('input-value')}></input>
                {errors.userName&&<span className={cx('err')}>Chưa nhập tên đăng Nhập</span>}
            </div>
            <div className={cx('input-item')}>
                <input type="text"  placeholder="Nhập họ tên" {...register("fullName",{required:true})} className={cx('input-value')} name="fullName"></input>
                {errors.fullName&&<span className={cx('err')}>Chưa nhập họ tên</span>}
            </div>
            <div className={cx('input-item')}>
                <input type="text"  placeholder="Nhập email" {...register("email",{required:true})} className={cx('input-value')} name="email"></input>
                {errors.email&&<span className={cx('err')}>Chưa nhập email</span>}
            </div>
            <div className={cx('input-item')}>
                <input type="file" onChange={(e)=>setImageD(e.target.files[0])} className={cx('input-value')} name="file"></input>
                {/* {errors.email&&<span className={cx('err')}>Chưa nhập email</span>} */}
            </div>
            <div className={cx('input-item')}>
                <input type="password" placeholder="Nhập mật khẩu" {...register("password",{required:true})} className={cx('input-value')} name="password"></input>
                {errors.password&&<span className={cx('err')}>Chưa nhập mật khẩu</span>}
            </div>
            <div className={cx('input-item')}>
                <input type="password" placeholder="Nhập lại mật khẩu" {...register("rePassword",{required:true,validate:(value)=>value===pass})} className={cx('input-value')} name="rePassword"></input>
                {errors.rePassword?.type==='required'&&<span className={cx('err')}>Nhập lại mật khẩu</span>}
                {errors.rePassword?.type==='validate'&&<span className={cx('err')}>Mật khẩu không trùng khớp</span>}
            </div>
            <div className={cx('btn-login')}>
                <button type="submit">Đăng ký</button>
            </div>
        </form>
    </div>
     );
}

export default Register;