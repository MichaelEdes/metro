import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { UserContext } from "../../UserContext";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gold",
    color: "black",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textTransform: "lowercase",
  },
}));

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/orders`);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllOrderItems = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/order_items`);
        setOrderItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllOrders();
    fetchAllOrderItems();
  }, [user.id]);

  function Row({ row }) {
    const [open, setOpen] = useState(false);

    const filteredItems = orderItems.filter((item) => item.order_id === row.id);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <StyledTableCell component="th" scope="row">
            {row.id}
          </StyledTableCell>
          <StyledTableCell align="right">
            {new Date(row.order_date).toLocaleDateString()}
          </StyledTableCell>
          <StyledTableCell align="right">£{row.total}</StyledTableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: "3vh 3vw 5vh 3vw" }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order Details
                </Typography>
                <Table
                  className="sub-table"
                  size="small"
                  aria-label="purchases"
                >
                  <TableHead sx={{ fontWeight: "bold" }}>
                    <TableRow>
                      <StyledTableCell align="left">ID</StyledTableCell>
                      <StyledTableCell align="right">Product</StyledTableCell>
                      <StyledTableCell align="right">Price</StyledTableCell>
                      <StyledTableCell align="right">Quantity</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <StyledTableCell align="left">
                          {item.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          £{item.price}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {item.quantity}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ fontWeight: "200" }}>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell component="th" scope="row">
              ID
            </StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders
            .filter((item) => item.user_id === user.id)
            .map((order, index) => (
              <Row key={index} row={order} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
