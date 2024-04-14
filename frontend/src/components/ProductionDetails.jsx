const ProducionDetails = ({ production }) => {
  return (
    <div className="product-details">
      <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
          <tr>
            <th>Date</th>
            <th>Material name</th>
            <th>Material code</th>
            <th>Material quantity</th>
            <th>Product name</th>
            <th>Product color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  class="rounded-circle"
                />
                <div class="ms-3">
                  <p class="fw-bold mb-1">{production.date}</p>
                </div>
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-link btn-sm btn-rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* <table className="productsTable">
          <tr>
            <th></th>
          </tr>
          <tr>
            <td>{product.itemCode}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.color}</td>
            <td>{product.cost}</td>
            <td>{product.unitPrice}</td>
            <td></td>
          </tr>
    </table>*/}
    </div>
  );
};

export default ProducionDetails;
