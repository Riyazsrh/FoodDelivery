import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
        
    welcom: {
        color: "#161A1D",
        fontFamily: 'Bai Jamjuree !important',
        fontWeight: '600 !important',
        fontSize: '35px !important',
    },
    Login: {
        fontFamily: 'Bai Jamjuree !important',
        fontWeight: '600 !important',
        fontSize: '22px !important',
        color: '#A2A3A5',
        textDecoration: 'none !important',

    },
    otp: {
        color: "#FFFFFF !important",
        backgroundColor: "#DF201F !important",
        height: '60px',
        width: '270px',
        borderRadius: '31px !important',
        boxShadow: '2px 2px 25px 2px rgba(223, 32, 31, 0.5)',
    },
    otp1: {
        color: "#FFFFFF !important",
        backgroundColor: "gray !important",
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
    img: {
        backgroundImage: "url(../images/Ellipse 14.png)",
    },
    
    
}))