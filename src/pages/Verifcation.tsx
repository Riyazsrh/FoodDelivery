import { Button, Container, Grid, ImageList, Typography,Box } from '@mui/material'
import { useStyles } from './VerifictionStyles'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Common.css';
import ReplayIcon from '@mui/icons-material/Replay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from 'react-otp-input'

const Verifcation = () => {
  const { username } = useParams();

  const [password, setPassword] = useState<any>("");
  const [counter, setCounter] = React.useState(59);

  const classes = useStyles();
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (event: any) => {
    setPassword(event);
    console.log(event);
  };
  const mobile = localStorage.getItem('mob');

  const userLogin = async () => {

    const Data: any = {
      username: username,
      password: password,
      device_token: "device token goes here",
      device_type: "android|ios|web",
    }

    await fetch("https://extended-retail-app.herokuapp.com/api/customer/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        body: JSON.stringify(Data),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("result", respo);
        if (respo.status === 200) {
          sessionStorage.setItem('logindata', JSON.stringify(respo))
          toast('Login Successful');
          navigate('/menu');
        } else {
          toast('Please Enter valid OTP');
        }
      });
  }

  return (
    <Container maxWidth="lg">
      <Grid container minHeight="100vh" direction="row" columns={{ xs: 4, sm: 10, md: 12 }} alignItems="center" justifyContent="center">
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ImageList sx={{ ml: 10 }} >
              <img src='../images/logo 1.png' alt='logo' data-testid="img" />
            </ImageList>
            <Box >
              <Typography variant="h3" className={classes.verify} gutterBottom component="div">
                Verification
              </Typography>
            </Box>
            <Box >
              <Typography variant="h6" sx={{ display: "flex" }} className={classes.Login} gutterBottom component="div">
                Enter the OTP sent to +91 {mobile}
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <OtpInput
                  data-testid="otp-input"
                  placeholder="****"
                  inputStyle={{
                    width: "60px",
                    height: "50px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    margin: "0 5px 0 18px",
                    fontSize: "20px",
                    alignItems: "center"
                  }}
                  isInputNum
                  isInputSecure
                  value={password}
                  onChange={handleChange}
                  numInputs={4}
                />
                <Typography className={classes.timer}>Sec {counter} </Typography>
                <Box className="tog" >
                  <Typography className="resend" variant='h6' >
                    Resend OTP
                  </Typography>
                  <Button onClick={()=>{toast("OTP sent to your mobile number")}}> <ReplayIcon className="repay" /></Button>
                </Box>
              </Box>
            </Box>
            <Button data-testid="VerifcationButton" disabled={password.length < 4} className={password.length < 4 ? classes.VeriTxt1 : classes.VeriTxt} onClick={userLogin} >
              <Box className='btn-text'>Verifcation</Box>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={7} sm={7} md={7} lg={7}>
          <Box>
            <img data-testid="mobImg" src='../images/img-1.png' alt='mobile' style={{ width: "100%", backgroundRepeat: "no-repeat" }} />
          </Box>
        </Grid>
      </Grid>
      <ToastContainer position="top-center" />
    </Container >
  )
}

export default Verifcation


