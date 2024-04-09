import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useProductContext } from "../hooks/useProductsContext";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#233066",
      cancelButtonColor: "#EC2026",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/products/" + product._id, {
          method: "DELETE",
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: json });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="product-details">
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Color</th>
            <th>Product cost</th>
            <th>Unit Price</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={product._id}>
            <td>
              <Link to={`/products/${product._id}`} className="product-link">
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.name}</p>
                    <p className="text-muted mb-0">{product.itemCode}</p>
                  </div>
                </div>
              </Link>
            </td>
            <td>
              <p className="fw-normal mb-1">{product.category}</p>
              <p className="text-muted mb-0">IT department</p>
            </td>
            <td>
              <span className="badge badge-success rounded-pill d-inline">
                Color
              </span>
            </td>
            <td>{product.cost}</td>
            <td>{product.unitPrice}</td>
            <td>
              {formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
              })}
            </td>
            <td>
              <button onClick={handleDelete}>
                <FaRegTrashCan />
              </button>
              <Link to={`/UpdateProduct/${product._id}`} className="edit-link">
                <button>Edit</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
