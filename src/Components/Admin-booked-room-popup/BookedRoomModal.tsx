import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IRoomDetail, IProfile } from '../../constant/constant';
import './bookedRoomModal.scss';

interface IProps {
  currentDataUser: IProfile;
  currentDataRoom: IRoomDetail;
}

interface ExpandMoreProps extends IconButtonProps {
  expanded: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expanded }) => ({
  transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BookedRoomModal = React.forwardRef<HTMLInputElement, IProps>((props: IProps, ref) => {
  const { currentDataRoom, currentDataUser } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card ref={ref} sx={{ maxWidth: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} className='mui-card-custom'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={currentDataUser?.avatar ?? undefined}>
          </Avatar>
        }
        title={<h3>{`Khách hàng: ${currentDataUser?.name ?? 'N/A'}`}</h3>}
        subheader={currentDataUser?.email ?? 'N/A'}
      />
      <CardMedia
        component="img"
        height="194"
        image={currentDataRoom?.hinhAnh ?? ''}
        alt="Room Image"
      />
      <CardContent>
        <h4>{currentDataRoom?.tenPhong ?? 'N/A'}</h4>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.6rem' }}>
          {currentDataRoom?.moTa ?? 'No description available.'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expanded={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ fontSize: '1.6rem', fontWeight: 600 }}>Thông tin chi tiết:</Typography>
          <Typography paragraph sx={{ fontSize: '1.6rem' }}>
            - Về thông tin phòng có thể tra cứu <NavLink to={'/@@admin/roomdetail'}>tại đây</NavLink> với id là: <Typography variant='h4' sx={{ display: 'inline' }}>{currentDataRoom?.id}</Typography>
          </Typography>
          <Typography paragraph sx={{ fontSize: '1.6rem' }}>
            {currentDataUser?.id === -1
              ? <span>- <Typography sx={{ display: 'inline', fontSize: '1.6rem', color: 'red' }}>Thông tin người dùng hiện không tồn tại vui lòng kiểm tra tại mục quản lý người dùng</Typography> <NavLink to={'/@@admin/user'}>tại đây</NavLink> hoặc <Typography sx={{ display: 'inline', fontSize: '1.6rem', color: 'red' }}>hủy đơn</Typography></span>
              : <span>- Về thông tin chi tiết có thể <NavLink to={'/@@admin/user'}>tra người dùng</NavLink> với id: <Typography variant='h4' sx={{ display: 'inline' }}>{currentDataUser?.id}</Typography></span>}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
});

export default BookedRoomModal;
