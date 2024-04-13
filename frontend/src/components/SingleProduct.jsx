import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../hooks/useProductsContext";
import ProductDetails from "../components/ProductDetails"; // Import existing ProductDetails component
import ProductionNavbar from "../components/ProductionNavbar";
import Swal from "sweetalert2";
import { FaRegTrashCan } from "react-icons/fa6";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SingleProduct = () => {
  const { dispatch } = useProductContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  // Fetch product data based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const json = await response.json();

      if (response.ok) {
        setProduct(json);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

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
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: id }); // Dispatch action for context
          navigate("/products"); // Redirect to Products.jsx using useNavigate
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
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

  // Render product details or loading message
  return (
    <ProductionNavbar>
      <div className="product-details">
        {product ? (
          <>
            <h4>Product Name: {product.name}</h4>
            <p>
              <strong>Category: </strong>
              {product.category}
            </p>
            <p>
              <strong>Unit Price: </strong>
              {product.unitPrice}
            </p>
            {product.colors.map((colors) => (
              <div>
                <p>
                  <strong>Color : </strong>
                  {colors.color}
                </p>
                <p>
                  <strong>Quantity : </strong>
                  {colors.quantity}
                </p>
              </div>
            ))}
            <p>
              <strong>Created: </strong>
              {formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p>
              <strong>Last Updated: </strong>
              {formatDistanceToNow(new Date(product.updatedAt), {
                addSuffix: true,
              })}
            </p>
            <button onClick={handleDelete}>
              <FaRegTrashCan />
            </button>
            <button onClick={() => navigate(`/edit-product/${product._id}`)}>
              Edit
            </button>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </ProductionNavbar>
  );
};

export default SingleProduct;
