let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Compact ergonomic wireless mouse",
    price: 15.99,
    imgUrl: "https://p1-ofp.static.pub//fes/cms/2024/05/20/x70abmv0yon191rf6haufcupbgcimu221325.png",
    stock: 120,
    status: true
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard",
    price: 49.99,
    imgUrl: "https://p1-ofp.static.pub//fes/cms/2024/05/20/x70abmv0yon191rf6haufcupbgcimu221325.png",
    stock: 75,
    status: true
  },
  {
    id: 3,
    name: "HD Monitor",
    description: "24-inch Full HD LED monitor",
    price: 129.99,
    imgUrl: "https://p1-ofp.static.pub//fes/cms/2024/05/20/x70abmv0yon191rf6haufcupbgcimu221325.png",
    stock: 35,
    status: true
  },
  {
    id: 4,
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI and Ethernet",
    price: 29.95,
    imgUrl: "https://p1-ofp.static.pub//fes/cms/2024/05/20/x70abmv0yon191rf6haufcupbgcimu221325.png",
    stock: 200,
    status: true
  },
  {
    id: 5,
    name: "Gaming Headset",
    description: "Surround sound gaming headset",
    price: 59.99,
    imgUrl: "https://p1-ofp.static.pub//fes/cms/2024/05/20/x70abmv0yon191rf6haufcupbgcimu221325.png",
    stock: 50,
    status: true
  },
];


let formSearch = document.getElementById("form-search");
let inputSearch = document.getElementById("keyword");
let keyword = "";
let direction = document.getElementById("direction");
let by = document.getElementById("sort-by");
let sortDirection="";
let sortBy="ASC";

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const displayProducts = () => {
  // Step 1: Filter products by the global keyword, if provided
  let filteredProducts = products;
  if (keyword.trim() !== "") {
    filteredProducts = products.filter((pro) =>
      pro.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // Step 2: Optionally sort the filtered products (if sortDirection is set)
  let sortedProducts = sortProductList(filteredProducts);

  // Step 3: Build HTML from the sorted (and filtered) product list
  let html = sortedProducts.reduce(
    (acc, pro, index) =>
      acc +
      `<tr>
        <th scope="row">${index + 1}</th>
        <td>${pro.id}</td>
        <td>${pro.name}</td>
        <td>${pro.description}</td>
        <td>${USDollar.format(pro.price)}</td>
        <td>
          <img src="${pro.imgUrl}" alt="${pro.name}" width="150" height="150" style="object-fit: cover;">
        </td>
        <td>${pro.stock}</td>
        <td>${pro.status ? "Đang bán" : "Ngừng bán"}</td>
        <td>
          <button class="btn btn-success" onclick = "openEditModal(${pro.id})">
            <i class="fa-solid fa-comment-pen"></i>
          </button>
        </td>
        <td>
          <button onclick="deleteProductById(${pro.id})" class="btn btn-danger">
            <i class="fa-solid fa-trash-xmark"></i>
          </button>
        </td>
      </tr>`,
    ""
  );

  // Step 4: Inject the HTML into the table body
  let tbody = document.getElementById("tbody");
  if (tbody) {
    tbody.innerHTML = html;
  } else {
    console.error("Table body element not found");
  }
};

document.addEventListener("DOMContentLoaded", displayProducts);
// displayProducts();

const handleAddProduct = () => {
  let product = validateInputProduct();
    if (product) {
        // thành công nhưng sẽ load lại trang và tải lại dữu liêu : Browser Storage
        products.push(product);
        let myModal = document.getElementById('modal-add');
        let modal = bootstrap.Modal.getInstance(myModal)
        modal.hide();
        displayProducts();
    }
}

const deleteProductById = (id) => {
  if(!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
  products = products.filter(pro => String(pro.id) !== String(id));

  displayProducts();
}


const validateInputProduct = () => {
  // id ko đc để trống
  // id ko đc trừng lặp
  // let regex_id = /P[0-9]{4}/g; let id = document.getElementById("id").value;
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let imgUrl = document.getElementById("imgUrl").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("price").value;
  let stock = document.getElementById("stock").value;
  let flag = false;
  if (id.trim() == "") {
      document.getElementById("error_id").innerText = "Không được để trống";
  } else if (products.some(p => p.id === id)) {
      document.getElementById("error_id").innerText = "ID đã tồn tại, vui lòng nhập id khác";
  } else if (isNaN(id)) {
      document.getElementById("error_id").innerText = "ID phải là số";
  } else {
      document.getElementById("error_id").innerText = "";
      flag = true;
  }

  return flag ? { id, name, description, price, imgUrl, stock } : null;
}

const sortProductList = (list)=>{
  if(sortDirection=="name"){
      return list.sort((a,b)=>sortBy=="DESC"?b.name.localeCompare(a.name):a.name.localeCompare(b.name));
  }else if(sortDirection=="price"){
      return list.sort((a,b)=>sortBy=="DESC"?b.price-a.price:a.price-b.price);
  }else if(sortDirection=="stock"){
      return list.sort((a,b)=>sortBy=="DESC"?b.stock-a.stock:a.stock-b.stock);
  }
  return list;
}

formSearch.addEventListener("submit", function(e){
  e.preventDefault();
  keyword = inputSearch.value;
  console.log("Keyword:", keyword);
  displayProducts();
})

direction.addEventListener("change", function(e){
  sortDirection = e.target.value;
  displayProducts();
})
by.addEventListener("change", function(e){
  sortBy = e.target.value;
  displayProducts();
})

const openEditModal = (id) => {
  const product = products.find(p => p.id == id);
  if (!product) return;

  // Fill modal inputs
  document.getElementById("edit-id").value = product.id;
  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-description").value = product.description;
  document.getElementById("edit-imgUrl").value = product.imgUrl;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-stock").value = product.stock;

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("modal-edit"));
  modal.show();
};

const handleEditSave = () => {
  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("edit-name").value;
  const description = document.getElementById("edit-description").value;
  const imgUrl = document.getElementById("edit-imgUrl").value;
  const price = parseFloat(document.getElementById("edit-price").value);
  const stock = parseInt(document.getElementById("edit-stock").value);

  const index = products.findIndex(p => p.id == id);
  if (index === -1) return;

  products[index] = {
    ...products[index],
    name,
    description,
    imgUrl,
    price,
    stock
  };

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modal-edit"));
  modal.hide();

  displayProducts();
};
