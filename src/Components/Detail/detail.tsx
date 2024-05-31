import './detail.scss';
import '/src/Components/UtilityIcon/utility.scss';
import { ACCESS_USER_ID, IComment, ILocationItem, IRoomDetail, ICommentId } from '../../constant/constant';
import AlertDialogSlide from '../Dialog/dialog';
import { BanLa, BanUi, Bep, DieuHoa, DoXe, HoBoi, MayGiat, Tivi, Wifi } from '../UtilityIcon/UtilityIcon';
import DisabledOptions from './guestComponent';
import { Comment, CommentBox, CommentSlider } from './commentComponent';
import { getLocal } from '../../utils/utils';
import { CardSlider } from '../CardSlider/cardslider';
// static img file
import ava from '../../assets/Image/du-lich-da-nang.jpg';

interface IProps {
    dataDetail: IRoomDetail;
    location?: ILocationItem;
    comment: IComment[];
    commentIdList: ICommentId[];
}

function Detail({ dataDetail, location, comment, commentIdList }: IProps) {
    const currentLocation = location ? `${location.tenViTri} - ${location.tinhThanh}, ${location.quocGia}` : '';
    const textSplit = dataDetail.moTa ? dataDetail.moTa.split(/\r?\n/) : [];
    
    const tienNghi = (text: string) => {
        return (
            <div className={`${text}`}>
                {dataDetail.banLa && <div className='col-md-6 col-sm-12'><BanLa /></div>}
                {dataDetail.banUi && <div className='col-md-6 col-sm-12'><BanUi /></div>}
                {dataDetail.bep && <div className='col-md-6 col-sm-12'><Bep /></div>}
                {dataDetail.dieuHoa && <div className='col-md-6 col-sm-12'><DieuHoa /></div>}
                {dataDetail.doXe && <div className='col-md-6 col-sm-12'><DoXe /></div>}
                {dataDetail.hoBoi && <div className='col-md-6 col-sm-12'><HoBoi /></div>}
                {dataDetail.mayGiat && <div className='col-md-6 col-sm-12'><MayGiat /></div>}
                {dataDetail.tivi && <div className='col-md-6 col-sm-12'><Tivi /></div>}
                {dataDetail.wifi && <div className='col-md-6 col-sm-12'><Wifi /></div>}
            </div>
        );
    };

    const averageStar = Math.ceil(comment.reduce((total, next) => total + next.saoBinhLuan, 0) / comment.length);

    return (
        <div className='detail-page'>
            <h1 className='detail-heading'>{dataDetail.tenPhong}</h1>
            {/* Heading */}
            <div className='detail-gimmick d-flex justify-content-between align-content-center'>
                <div className='detail-sub-heading'>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <p className='rating'>{averageStar || "0"}</p>
                    <p>·</p>
                    <p className='onDetail'>({comment.length} đánh giá)</p>
                    <p>·</p>
                    <p className='onDetail'>{currentLocation}</p>
                </div>
                <div className='detail-saveShare'>
                    <div className='share'>
                        <span className='onDetail'>Chia sẻ</span>
                    </div>
                    <div className='save'>
                        <span className='onDetail'>Lưu</span>
                    </div>
                </div>
            </div>
            {/* Image */}
            <img className="detail-img" src={dataDetail.hinhAnh} alt={dataDetail.tenPhong} />
            {/* Main Section */}
            <section className='detail-main-section'>
                <div className='detail-left'>
                    <div className='detail-left-heading'>
                        <div>
                            <h2>Toàn bộ căn hộ Condo</h2>
                            <p>dành cho {dataDetail.khach} khách - Bao gồm {dataDetail.phongNgu} phòng ngủ và {dataDetail.phongTam} phòng tắm</p>
                        </div>
                        <img className="avatar" src={ava} alt="Host Avatar" />
                    </div>
                    <hr />
                    <div className='my-4'>
                        {textSplit.map((text: string, index: number) => (
                            <div key={index} className='detail-description d-flex align-items-center my-3'>
                                <div className='detail-icon'><i className={`fa-sharp fa-solid fa-${index}`} ></i></div>
                                <div><span>{text}</span></div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className='detail-decription-more'>
                        <div className='detail-translate'>
                            <h3>Dịch sang Tiếng Việt</h3>
                        </div>
                        <p className='detail-describe'>{dataDetail.moTa}</p>
                        <AlertDialogSlide buttonName="Hiển Thị Thêm" title="About this space" description={dataDetail.moTa} />
                    </div>
                    <hr />
                    <div className='detail-sleep'>
                        <h2>Nơi bạn ngủ</h2>
                        <img src="/src/assets/Image/bed.jpeg" alt="Bed" />
                        <h3>Giường</h3>
                        <p>{dataDetail.giuong} cái giường</p>
                    </div>
                    <hr />
                    <div className='detail-utility'>
                        <h2>Tiện Nghi</h2>
                        {tienNghi("row")}
                        <AlertDialogSlide buttonName="Hiển Thị Các Tiện Nghi" title="Tiện nghi" description={tienNghi("none")} />
                    </div>
                </div>
                <div className='detail-right'>
                    <section className='detail-purchase'>
                        <h1>${dataDetail.giaTien}<span> / đêm</span></h1>
                        <div className='detail-sub-heading yeet'>
                            <i className="fa fa-star"></i>
                            <p className='rating'>{averageStar || "0"}</p>
                            <p>·</p>
                            <p className='onDetail'>({comment.length} đánh giá)</p>
                        </div>
                        <DisabledOptions giaTien={dataDetail.giaTien} khachMax={dataDetail.khach} phone={false} dataDetail={dataDetail} />
                    </section>
                </div>
            </section>
            <hr />
            {/* Comment display */}
            <section className='detail-comment'>
                <div className='detail-comment-rating'>
                    <i className="fa fa-star"></i>
                    <h1>{averageStar || "0"}</h1>
                    <p>·</p>
                    <h1 className='rating-comment'>{comment.length} đánh giá</h1>
                </div>
                
                {averageStar && 
                    <div className='detail-comment-slider'>
                        <CommentSlider classes="row" />
                    </div>
                }

                <div className='detail-comment-section'>
                    {comment.slice(0, 5).map((currentComment: IComment, index: number) => (
                        <div key={index}>
                            <Comment currentComment={currentComment} limit={true} commentIdList={commentIdList} /> 
                        </div>
                    ))}
                </div>

                {averageStar && 
                    <div className='detail-comment-section-phone'>
                        <CardSlider comment={comment} limit={true} sliceMax={5} />
                    </div>
                }

                {averageStar ? 
                    <AlertDialogSlide 
                        buttonName={`Hiển Thị ${comment.length} Đánh Giá`} 
                        title={`★ ${averageStar} · ${comment.length} đánh giá`} 
                        description={
                            <div>
                                {comment.map((currentComment: IComment, index: number) => (
                                    <div key={index}>
                                        <Comment currentComment={currentComment} limit={false} /> 
                                    </div>
                                ))}
                            </div>
                        }
                    />
                : 
                    <h3>Hãy là người đánh giá đầu tiên</h3>
                }
            </section>
            <hr />
            {/* Comment */}
            <div className='my-5'>
                <h1>Phần Bình Luận</h1>
                {getLocal(ACCESS_USER_ID) ? <CommentBox /> : <h3>Bạn cần phải đăng nhập để bình luận</h3>}
            </div>
            <section className='detail-phone-size'>
                <div>
                    <h1>${dataDetail.giaTien}<span> / đêm</span></h1>
                </div>
                <DisabledOptions giaTien={dataDetail.giaTien} khachMax={dataDetail.khach} phone={true} dataDetail={dataDetail} />
            </section>
        </div>
    );
}

export default Detail;
