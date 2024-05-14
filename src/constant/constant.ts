export const CYBER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETjEwIiwiSGV0SGFuU3RyaW5nIjoiMjIvMDgvMjAyNCIsIkhldEhhblRpbWUiOiIxNzI0Mjg0ODAwMDAwIiwibmJmIjoxNjkzMTU1NjAwLCJleHAiOjE3MjQ0MzI0MDB9.JjDqstSevsNiLhXlkGx2wJPz6otbfBWxfaCHMzBpb6s'
export const ACCESS_TOKEN = 'accessToken'
export const BASE_URL = 'https://airbnbnew.cybersoft.edu.vn'
export const ACCESS_USER_ID = 'accessUserById'
export const PAGE_SIZE = 2; 
export interface IRoomDetail {
    id: number,
    tenPhong: string,
    khach: number,
    phongNgu: number,
    giuong: number,
    phongTam: number,
    moTa: string,
    giaTien: number,
    mayGiat: boolean,
    banLa: boolean,
    tivi: boolean,
    dieuHoa: boolean,
    wifi: boolean,
    bep: boolean,
    doXe: boolean,
    hoBoi: boolean,
    banUi: boolean,
    maViTri: number,
    hinhAnh: string,
}

export interface ILocationItem {
    hinhAnh: string,
    id: number,
    quocGia: string,
    tenViTri: string,
    tinhThanh: string
}
export interface IBookRoom{ 
    id: number,
    maPhong: number,
    ngayDen: string,
    ngayDi: string,
    soLuongKhach: number,
    maNguoiDung: number
}

export interface IValueUpdate{ 
    name: string,
    email: string,
    phone: string,
    birthday: string,
    role: string,
    gender: boolean,
}


export const regex = {
    nameByVietnamese: /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/,
    password: /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^& "]).*$/,
}

