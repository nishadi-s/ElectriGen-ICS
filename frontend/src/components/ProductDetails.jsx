import { useProductContext } from "../hooks/useProductsContext";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductContext();

  const handleClick = async () => {
    const response = await fetch("/api/products" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="product-details">
      {/* Table starts here */}

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
          {/* Table row starts here */}
          <tr key={product._id}>
            <td>
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
            <td>{product.createdAt}</td>
            <td>
              <button onClick={handleClick}>Delete</button>
            </td>
          </tr>
          {/* Table row ends here */}
        </tbody>
      </table>
      {/* Table ends here */}
    </div>
  );
};

export default ProductDetails;
