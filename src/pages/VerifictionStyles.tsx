import { makeStyles } from "@mui/styles";
// import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({

    verify: {
        color: "#161A1D",
        fontFamily: 'Bai Jamjuree !important',
        fontWeight: '600 !important',
        fontSize: '35px !important',
        // [theme.breakpoints.down('sm')]: {
        //     color: "green",
        // }

    },
    Login: {
        fontFamily: 'Bai Jamjuree !important',
        fontWeight: '600 !important',
        fontSize: '22px !important',
        color: '#A2A3A5',
        textDecoration: 'none !important',
        textAlign: 'center',

    },
    otp: {
        color: "#FFFFFF !important",
        backgroundColor: "#DF201F !important",
        height: '60px',
        width: '270px',
        borderRadius: '31px !important',
    },
    otpTxt: {
        fontFamily: 'Bai Jamjuree',
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: 'bold',
        letterSpacing: ' 0.10em',
    },
    // redbg: {
    //    backgroundImage:"url(../images/reload 1.png)",
    // },
    timer: {
        textAlign: "center",
        lineHeight: '4 !important',
        fontFamily: 'Bai Jamjuree !important',
        fontWeight: '600 !important',
        fontSize: '18px !important',
        color: '#DF201F',
    },
    ResendOtp: {
        textAlign: "center",
        fontFamily: 'Montserrat Alternates !important',
        fontWeight: '600 !important',
        fontSize: '18px !important',
        color: '161A1D',
        letterSpacing: ' 0.10em',
    },
    VeriTxt: {
        color: "#FFFFFF !important",
        backgroundColor: "#DF201F !important",
        height: '60px',
        width: '270px',
        borderRadius: '31px !important',
        boxShadow: '2px 2px 25px 2px rgba(223, 32, 31, 0.5)',
    },
    VeriTxt1: {
        color: "#FFFFFF !important",
        backgroundColor: "gray !important",
        height: '60px',
        width: '270px',
        borderRadius: '31px !important',
    },
}))
