
import './hardLayout.scss'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import homeOcean from '../../assets/Image/home2.jpg'
import maxRes from '../../assets/Image/home3.jpg'
import unique from '../../assets/Image/home1.jpg'
import dogBed from '../../assets/Image/animal.jpg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const themeCustom = createTheme({
  breakpoints: {
    values: {
      xs: 480,
      sm: 576,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});

function HardLayout() {
  return (
    <div className='feature-sub'>
      <h1>Không phải nơi nào bạn đến, mà là cách bạn làm cho nơi đó trở nên đặc biệt.</h1>
      <ThemeProvider theme={themeCustom}>
        <Box sx={{ flexGrow: 1 }} className='mui-box'>
          <Grid container spacing={2} className='mui-grid'>
            <Grid item md={3} sm={6} xs={6}  className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src={homeOcean} alt="..." />
                  <p>Nơi ở thoáng mát</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src={unique} alt="..." />
                  <p>Tiện nghi đầy đủ</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src={maxRes} alt="..." />
                  <p>Phong cả và thiên nhiên hữu tình</p>
                </div>
              </Item>
            </Grid>
            <Grid item md={3} sm={6} xs={6} className='mui-grid-item'>
              <Item className='mui-item'>
                <div className="feature-sub-item">
                  <img src={dogBed} alt="..." />
                  <p>Có thể mang theo thú cưng của bạn</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default HardLayout