import { Button, Grid, ImageList, TextField, Typography, Container, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import { useStyles } from './Loginstyles'
import Ellips from '../images/Ellipse 14.png'
import { useNavigate } from 'react-router-dom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUserName] = useState<any>("");
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (sessionStorage.getItem('logindata')) {
      navigate('/menu')
    }
  })

  const PostData = async () => {

    const Data: any = {
      username: username,
    }

    await fetch("https://extended-retail-app.herokuapp.com/api/customer/getOtp",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("result", respo);
        if (respo.status === 200) {
          localStorage.setItem("data", JSON.stringify(respo));
          localStorage.setItem("mob", username);
          toast('OTP sent to your mobile number')
          navigate(`/verification/${username}`)
        } else {
          toast('Please Enter valid Number ❌')
        }
      });
  }



  return (
    <Container maxWidth="lg">
      <Grid container minHeight="100vh" direction="row" columns={{ xs: 4, sm: 10, md: 12 }} alignItems="center" justifyContent="center">
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box >
              <img src='./images/logo 1.png' alt='logo' data-testid="logoImg" />
            </Box>
            <Box >
              <Typography variant="h3" sx={{ fontSize: "35px", fontFamily: "Bai Jamjuree" }} gutterBottom component="div">
                Welcome Back!
              </Typography>
            </Box>
            <Box >
              <Typography variant="h6" sx={{ color: "#A2A3A5" }} gutterBottom component="div">
                Login Account
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ height: "50px" }}
                label="Select"
              >
                <MenuItem value={10}><img src='images\1200px-Flag_of_India 1.png' style={{ marginTop: "5px" }} />+91</MenuItem>
              </Select>
              <TextField data-testid="loginInput" id="standard-basic" value={username} onChange={(e) => { setUserName(e.target.value) }} sx={{ width: "270px", height: "50px" }} placeholder="mobile no" label="mobile no" variant="standard" InputProps={{
                endAdornment: (
                  <LocalPhoneIcon />
                ),
              }} />
            </Box>
            <Button data-testid="loginButton" disabled={username.length < 10} className={username.length < 10 ? classes.otp1 : classes.otp} style={{ margin: "30px 0" }} onClick={PostData} >GET OTP</Button>
          </Box>
        </Grid>

        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Box sx={{ backgroundImage: `url(${Ellips})` }}>
            <img src='../images/img.png' alt='bike' style={{ width: "100%", backgroundRepeat: "no-repeat" }} />
          </Box>

        </Grid>
      </Grid>
      <ToastContainer position="top-center" />
    </Container >












  )
}

export default Login
