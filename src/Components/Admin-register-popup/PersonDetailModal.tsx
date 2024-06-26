import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './adminRegister.scss';
import { IProfile } from '../../constant/constant';

interface IProps {
    personData: IProfile;
    closeModal: () => void;
    openUpdate: () => void;
}

export default function PersonModal({ personData, closeModal, openUpdate }: IProps) {
    const [image, setImage] = useState<string>(personData?.avatar || '../../assets/Image/avatar-icon-images.jpg');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="card-detail">
            <Card sx={{ width: 500, height: 650 }} className='card-wrapper'>
                <CardMedia
                    sx={{ height: 300 }}
                    image={image}
                    title={`Avatar của ${personData?.name}`}
                />
                <CardContent className='mui-card-content'>
                    <Typography gutterBottom variant="h2" component="div">
                        {personData?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className='mui-typography-card'>
                        <h4>Thông tin cá nhân:</h4>
                        <ul>
                            <li>Ngày sinh: <span>{personData?.birthday}</span> </li>
                            <li>Email: <span>{personData?.email}</span> </li>
                            <li>Giới tính: <span>{personData?.gender ? 'Nam' : 'Nữ'}</span></li>
                            <li>Số điện thoại: <span>{personData?.phone}</span></li>
                            <li>Mật khẩu: <span>{personData?.password}</span></li>
                            <li>Quyền: <span>{personData?.role}</span></li>
                        </ul>
                    </Typography>
                </CardContent>
                <CardActions className='btn-group-card'>
                    <Button size="large" onClick={() => { openUpdate(); closeModal(); }}>Sửa</Button>
                    <Button size="large" onClick={closeModal}>Đóng</Button>
                </CardActions>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="upload-photo"
                />
                <label htmlFor="upload-photo">
                    <Button variant="contained" component="span">
                        Tải lên ảnh
                    </Button>
                </label>
            </Card>
        </div>
    );
}
