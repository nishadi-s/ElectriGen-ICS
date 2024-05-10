import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../hooks/useProductsContext";
import ProductionNavbar from "../components/ProductionNavbar";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const SingleProduct = () => {
  const { dispatch } = useProductContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: "Enter your password to confirm deletion",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const password = result.value;
        // Check if the entered password is correct
        if (password === "Sp123") {
          try {
            const response = await fetch(`/api/products/${id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              dispatch({ type: "DELETE_PRODUCT", payload: id });
              navigate("/products");
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            } else {
              throw new Error("Failed to delete the product");
            }
          } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product.",
              icon: "error",
            });
          }
        } else {
          // Incorrect password
          Swal.fire("Error!", "Incorrect password.", "error");
        }
      }
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const json = await response.json();
        setProduct(json);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  return (
    <ProductionNavbar>
      <div className="production-header">
        <h1>Product Data</h1>
      </div>
      <div className="product-details">
        {product ? (
          <div
            style={{
              backgroundColor: "rgba(136, 132, 216, 0.5)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "left",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4>Name: {product.name}</h4>
            <p>
              <strong>Product Code: </strong>
              {product.itemCode}
            </p>
            <p>
              <strong>Category: </strong>
              {product.category}
            </p>
            <p>
              <strong>Color: </strong>
              {product.color}{" "}
              <span style={{ marginLeft: "5px" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    backgroundColor: product.color,
                    borderRadius: "50%",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                ></div>
              </span>
            </p>
            <p>
              <strong>Unit Price: </strong>
              {product.unitPrice}
            </p>
            <p>
              <strong>Available Quantity: </strong>
              {product.quantity}
            </p>
            <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
              <strong>Created: </strong>
              {formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
              <strong>Last Updated: </strong>
              {formatDistanceToNow(new Date(product.updatedAt), {
                addSuffix: true,
              })}
            </p>
            <button className="button-2" onClick={handleDelete}>
              <FaRegTrashAlt />
            </button>
            <button
              className="button-1"
              onClick={() => navigate(`/edit-product/${product._id}`)}
            >
              Edit
            </button>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </ProductionNavbar>
  );
};

export default SingleProduct;
