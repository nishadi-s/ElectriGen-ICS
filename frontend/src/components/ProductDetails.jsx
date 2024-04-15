import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductContext } from "../hooks/useProductsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  return (
    <TableContainer component={Paper}>
      {/* Moved TableHead outside the loop */}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
          {/* Table body with product details */}
          <TableRow>
            <TableCell component="th" scope="row">
              <Link key={product._id} to={`/product/${product._id}`}>
                {product.name}
              </Link>
            </TableCell>
            <TableCell align="right">{product.category}</TableCell>
            <TableCell align="right">{product.color}</TableCell>
            <TableCell align="right">{product.unitPrice}</TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductDetails;