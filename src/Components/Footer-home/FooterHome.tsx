import './footerHome.scss';
// MUI UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme?.palette?.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme?.typography?.body2,
  padding: theme?.spacing(1),
  textAlign: 'left',
  color: theme?.palette?.text?.secondary,
}));

function FooterHome() {
  return (
    <div className="footer">
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }} className="mui-box">
          <Grid container spacing={2} className="mui-grid">
            <Grid item xs={3} className="mui-grid-item">
              <Item className="mui-item">
                <p>Hỗ Trợ</p>
                <ul>
                  <li><a href="#">Trung tâm trợ giúp</a></li>
                  <li><a href="#">AirCover</a></li>
                  <li><a href="#">Chống phân biệt đối xử</a></li>
                  <li><a href="#">Hỗ trợ người khuyết tật</a></li>
                  <li><a href="#">Các tùy chọn hủy</a></li>
                  <li><a href="#">Báo cáo lo ngại của khu dân cư</a></li>
                </ul>
              </Item>
            </Grid>
            <Grid item xs={3} className="mui-grid-item">
              <Item className="mui-item">
                <p>Đón tiếp khách</p>
                <ul>
                  <li><a href="#">Cho thuê nhà trên Airbnb</a></li>
                  <li><a href="#">AirCover cho Chủ nhà</a></li>
                  <li><a href="#">Tài nguyên về đón tiếp khách</a></li>
                  <li><a href="#">Đón tiếp khách có trách nhiệm</a></li>
                  <li><a href="#">Tham gia khóa học miễn phí về công việc Đón tiếp khách</a></li>
                </ul>
              </Item>
            </Grid>
            <Grid item xs={3} className="mui-grid-item">
              <Item className="mui-item">
                <p>Airbnb</p>
                <ul>
                  <li><a href="#">Trang tin tức</a></li>
                  <li><a href="#">Tính năng mới</a></li>
                  <li><a href="#">Cơ hội nghề nghiệp</a></li>
                  <li><a href="#">Nhà đầu tư</a></li>
                  <li><a href="#">Chỗ ở khẩn cấp Airbnb.org</a></li>
                </ul>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <div className="sub-footer">
          <div className="left-sub-footer">
            <p>© by TS 2024 AirBB, Inc. All rights reserved. <a href="#">Quyền riêng tư</a> . <a href="#">Điều khoản</a> . <a href="#">Hồ sơ trang web</a></p>
          </div>
          <div className="right-sub-footer">
            <i className="fas fa-globe"></i>
            <p>Tiếng Việt</p>
            <p>$</p>
            <p>VND</p>
            <i className="fa fa-facebook-square"></i>
            <i className="fa fa-twitter-square"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FooterHome;
