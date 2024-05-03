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

  const handleDelete = async () => {
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
  };

  return (
    <ProductionNavbar>
      <div className="product-details">
        {product ? (
          <>
            <h4>Product Name: {product.name}</h4>
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
              {product.color}
            </p>
            <p>
              <strong>Unit Price: </strong>
              {product.unitPrice}
            </p>
            <p>
              <strong>Available Quantity: </strong>
              {product.quantity}
            </p>
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
            <button className="button-2" onClick={handleDelete}>
              <FaRegTrashAlt />
            </button>
            <button
              className="button-1"
              onClick={() => navigate(`/edit-product/${product._id}`)}
            >
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
