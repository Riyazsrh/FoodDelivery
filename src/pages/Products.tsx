// import React from 'react'
// import TableData from '../Components/Table'

// const MenuuList = () => {
//   return (
//     <>
//       <TableData/>

      
//     </>
//   )
// }

// export default MenuuList





import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  DialogTitle
} from '@material-ui/core';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import { Box, Button, Container, MenuItem, Pagination, Select, TextField } from '@mui/material';

import React, { useEffect, useState } from 'react';
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import './Common.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Header from '../Components/Header';

const useStyles = makeStyles((theme: any) => ({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)"
    }
  },
  tableContainer: {
    borderRadius: 5,
    width: '100%',
    height: "auto",
    color: 'red !important'

  },
  tableHeaderCell: {
    fontWeight: 500,
    backgroundColor: "#DF201F",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    fontSize: 18,
    fontFamily: "Bai Jamjuree",

  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: "150px"
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  },
  Btn: {
    color: "#FFFFFF !important",
    backgroundColor: "#94CD00 !important",
    height: '60px',
    width: '270px',
    borderRadius: '31px !important',
  },
  delt: {
    color: "#FFFFFF !important",
    backgroundColor: "#DF201F !important",
    borderRadius: "20px",
    height: '30px !important',
    width: '30px !important',

  },
  headertitle: {
    backgroundColor: 'red !important',
    color: 'red',
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "gray",
      "&:active": {
        backgroundColor: "#DF201F",
      }
    }
  }
}));

function TableData() {
  const classes = useStyles();
  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [list, setList] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [editId, setEditId] = useState<any>(null);
  const [openDailoue, setOpenDailoue] = React.useState(false);
  const [deleteId, setDeleteId] = useState<any>("");


  const [menuItems, setMenuItems] = useState({
    name: "",
    price: "",
    discountPrice: "",
    weight: "",
    packingCharges: "",
    unit: "",
    stock: "",
    description: "",
  });

  const {
    name,
    discountPrice,
    price,
    weight,
    unit,
    packingCharges,
    stock,
    description,
  } = menuItems;


  const handleChange = (e: any) => {
    setMenuItems({
      ...menuItems, [e.target.name]: e.target.value,
    });
  };

  const handleOpenDialouge = (_id: any) => {
    setDeleteId(_id);
    setOpenDailoue(true);
  };

  const handleCloseDailouge = () => {
    setOpenDailoue(false);
  };




  const enterMenu = async () => {

    // add product////////////

    const menuData = {
      name: name,
      stock: 10,
      unit: "gms",
      weight: 200,
      price: price,
      isVeg: true,
      image: "https://thumbs.dreamstime.com/b/shai-pulao-vegetable-indian-biryani-31520269.jpg",
      discountPrice: discountPrice,
      packingCharges: 35,
      description: description,
      enabled: true,
      customerId: "624a61bbd873b1d7b1bc78bc"
    };

    const data: any = sessionStorage.getItem('logindata');
    const jsonData: any = JSON.parse(data);
    const token = jsonData.token


    await fetch("https://extended-retail-app.herokuapp.com/api/products/createMenuItem",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(menuData),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("result", respo);
        sessionStorage.setItem("menuItem", JSON.stringify(respo))
        if (respo?.success) {
        } else {
          alert(respo?.message)
        }
      });
    navigate("/menu")
    setOpen(false)
    getData();


    setMenuItems({
      name: "",
      price: "",
      discountPrice: "",
      weight: "",
      packingCharges: "",
      stock: "",
      unit: "",
      description: "",
    })
  }

  // get api/////////////////////

  useEffect(() => {
    getData();
  }, [])


  const getData = async () => {

    const data: any = sessionStorage.getItem('logindata');
    const jsonData: any = JSON.parse(data);
    const token = jsonData.token

    await fetch("https://extended-retail-app.herokuapp.com/api/products/getMenuItems?userId=624a61bbd873b1d7b1bc78bc",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log("result", respo);
        setList(respo.data)
        setDatas(respo.data);

      });
    console.log('itm', list);
  }


  //////// delet api/////////////////

  const deletItem = async (_id: any) => {

    const data: any = sessionStorage.getItem('logindata');
    const jsonData: any = JSON.parse(data);
    const token = jsonData.token
    const userId = jsonData?.data?._id;


    axios.delete(`https://extended-retail-app.herokuapp.com/api/products/deleteMenuItem?userId=${userId}&itemId=${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((resp) => {
        getData();
        console.log(resp.data);

      })
      .catch((err) => console.log(err)
      )
    setOpenDailoue(false);

  }


  // edit ////////////

  const Edite = async () => {

    const data: any = sessionStorage.getItem('logindata');
    const jsonData: any = JSON.parse(data);
    console.log('jj', jsonData);

    const token = jsonData.token
    const userId = jsonData.data._id;

    const editeData = {
      name: name,
      discountPrice: discountPrice,
      price: price,
      weight: weight,
      packingCharges: packingCharges,
      stock: stock,
      description: description,
    }

    console.log('ids', userId, editId, token);


    await fetch(`https://extended-retail-app.herokuapp.com/api/products/updateMenuItem?userId=${userId}&itemId=${editId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(editeData),
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        console.log('res', respo);
        sessionStorage.setItem("myedit", JSON.stringify(respo))
        if (respo?.success) {
        } else {
          alert(respo?.message)
        }
        setOpen(false)
        getData();
      });

  }

  const editss = (item: any) => {
    console.log(item);
    setEditId(item._id);
    setMenuItems({
      name: item.name,
      discountPrice: item.discountPrice,
      price: item.price,
      weight: item.weight,
      packingCharges: item.packingCharges,
      stock: item.stock,
      unit: item.unit,
      description: item.description,
    });
    setOpen(true)

  }
// SEARCH functionality
const handleSearch = ({ target }: any) => {
  var text = target?.value?.toUpperCase()?.trim();
  console.log("==!", text);
  var temparr = [];
  temparr = datas.filter((item: any) =>
    item?.name?.toUpperCase()?.trim()?.includes(text)
  );
  setList(temparr);
  console.log("temparr", temparr);
};

  return (
    <Grid>
      <Grid>
        <Header />
      </Grid>
      <Grid>
        {/* <Modal1---------------------------------/> */}
        <Container>
          <Grid container style={{ margin: "20px 0" }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography style={{
                fontWeight: "600",
                fontSize: "26px",
                lineHeight: "28px",
                fontFamily: "Bai Jamjuree",
                color: "#161A1D",
              }} >Product List</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField className="inputRounded"
                placeholder="Search..."
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  endAdornment: (
                    <SearchIcon />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Button onClick={handleOpen} className={classes.Btn} >ADD Products <AddIcon />  </Button>
              <Modal open={open} onClose={handleClose} style={{ overflowY: "scroll" }}>
                <Grid
                  container
                  spacing={3}
                  style={{
                    width: "72%",
                    margin: "auto",
                    backgroundColor: "white",
                    position: "absolute",
                    padding: "20px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Grid item lg={6}>
                    <img width="100%" src='../images/Rectangle 199.png' alt="" />
                  </Grid>

                  <Grid container item lg={6} spacing={3}>
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}>Product Name</Typography>
                      <TextField className="fInput" placeholder='Pizza'
                        style={{ width: "100%" }}
                        type="text"
                        variant="outlined"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required={true}
                        data-testid='textField1'

                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}>Stock</Typography>
                      <TextField
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "28px",
                          fontFamily: "Montserrat Alternates",
                          color: "#161A1D",

                        }}
                        type="number"
                        variant="outlined"
                        name="stock"
                        placeholder='25'
                        value={stock}
                        onChange={handleChange}
                        required={true}
                      />
                    </Grid>
                    <br />
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography>Weight</Typography>
                      <TextField
                        type="number"
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "28px",
                          fontFamily: "Montserrat Alternates",
                          color: "#161A1D"
                        }}
                        variant="outlined"
                        name="weight"
                        value={weight}
                        onChange={handleChange}
                        placeholder='Weight'
                        required={true}
                      />
                    </Grid>
                    <br />
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography>Price</Typography>
                      <TextField
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "28px",
                          fontFamily: "Montserrat Alternates",
                          color: "#161A1D",

                        }}
                        type="number"
                        variant="outlined"
                        name="price"
                        value={price}
                        placeholder='180'
                        onChange={handleChange}
                        required={true}
                      />
                    </Grid>
                    <br />
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}>Discount Price</Typography>
                      <TextField
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "28px",
                          fontFamily: "Montserrat Alternates",
                          color: "#161A1D",
                        }}
                        type="number"
                        variant="outlined"
                        name="discountPrice"
                        placeholder='175'
                        value={discountPrice}
                        onChange={handleChange}
                        required={true}
                      />
                    </Grid>
                    <br />
                    <Grid item lg={6} md={6} sm={12}>
                      <Typography>Packing Charges</Typography>
                      <TextField
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "28px",
                          fontFamily: "Montserrat Alternates",
                          color: "#161A1D",
                        }}
                        type="text"
                        variant="outlined"
                        name="packingCharges"
                        placeholder='15'
                        value={packingCharges}
                        onChange={handleChange}
                        required={true}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                      <Typography style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "28px",
                        fontFamily: "Montserrat Alternates",
                        color: "#161A1D",
                      }}>Description</Typography>
                      <textarea
                        style={{ width: "100%", height: "100px" }}
                        name="description"
                        placeholder='Type Here...'
                        value={description}
                        onChange={handleChange}
                        required={true}
                      />
                    </Grid>

                    <Grid item>
                      {editId ?
                        <Button className={classes.Btn} style={{ marginTop: 15 }} onClick={Edite}>Update PRODUCT</Button> :
                        <Button className={classes.Btn} style={{ marginTop: 15 }} type="submit" onClick={enterMenu}>SAVE PRODUCT</Button>
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Modal>
            </Grid>
          </Grid>
        </Container>
      </Grid>


      {/* table ---------------*/}
      <Container>
        <TableContainer component={Paper} className={classes.tableContainer} >
          <Table className={classes.table} aria-label="simple table" >
            <TableHead >
              <TableRow >
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>Product Id</TableCell>
                <TableCell className={classes.tableHeaderCell}>Quantity</TableCell>
                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                <TableCell className={classes.tableHeaderCell}>Discount Price</TableCell>
                <TableCell data-testid='DeleteBtn' className={classes.tableHeaderCell}>Delete</TableCell>
                <TableCell className={classes.tableHeaderCell}>Edite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
                list.map((item: any, i: any) => {
                  return (
                    <>
                      <TableRow hover>
                        <TableCell>
                          <Grid container>
                            <Grid item lg={2}>
                              <Avatar src={item.image} className={classes.avatar} />
                            </Grid>
                            <Grid item lg={10}>
                              <Typography className={classes.name}>{item.name}</Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">{i + 103}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="body2">9608</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="body2">In Stock</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="body2">{item.price}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="textSecondary" variant="body2">{item.discountPrice}</Typography>
                        </TableCell>
                        <TableCell>
                          <DeleteIcon style={{ color: "#da0e29", fontSize: '28px', cursor: 'pointer' }} onClick={() => handleOpenDialouge(item._id)} />
                        </TableCell>
                        <TableCell>
                          <EditIcon style={{ color: "#94CD00", fontSize: '28px', cursor: 'pointer' }} onClick={() => editss(item)} />
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Dialog
            open={openDailoue}
            onClose={handleCloseDailouge}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to delete the item ? "}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={handleCloseDailouge}
                variant="contained"
                color="error"
              >
                No
              </Button>
              <Button
                onClick={deletItem}
                autoFocus
                variant="contained"
                color="success"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Pagination
          classes={{ ul: classes.ul }}
          count={5}
          siblingCount={0}
          variant="outlined"
          shape="rounded"
          color="secondary"
          style={{ float: "right",marginTop:10 }} />
      </Container>
    </Grid>
  );
}

export default TableData;