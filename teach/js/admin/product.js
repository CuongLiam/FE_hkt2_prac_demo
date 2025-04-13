// CHức năng của products admin
// let products = JSON.parse(localStorage.getItem("products")) || [];
let products = [
    {
        id: 1,
        name: "Wireless Mouse",
        description: "Compact ergonomic wireless mouse",
        price: 15.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 120
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard",
        price: 49.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 75
    },
    {
        id: 3,
        name: "HD Monitor",
        description: "24-inch Full HD LED monitor",
        price: 129.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 35
    },
    {
        id: 4,
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and Ethernet",
        price: 29.95,
        imgUrl: "https://via.placeholder.com/100",
        stock: 200
    },
    {
        id: 5,
        name: "Gaming Headset",
        description: "Surround sound gaming headset",
        price: 59.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 50
    },
    {
        id: 6,
        name: "Laptop Stand",
        description: "Aluminum adjustable laptop stand",
        price: 25.50,
        imgUrl: "https://via.placeholder.com/100",
        stock: 80
    },
    {
        id: 7,
        name: "Webcam",
        description: "1080p HD webcam with microphone",
        price: 39.00,
        imgUrl: "https://via.placeholder.com/100",
        stock: 45
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        description: "Portable wireless Bluetooth speaker",
        price: 22.95,
        imgUrl: "https://via.placeholder.com/100",
        stock: 60
    },
    {
        id: 9,
        name: "Power Bank",
        description: "10000mAh fast charging power bank",
        price: 18.50,
        imgUrl: "https://via.placeholder.com/100",
        stock: 150
    },
    {
        id: 10,
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor",
        price: 79.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 40
    },
    {
        id: 11,
        name: "External SSD",
        description: "500GB USB 3.1 portable SSD",
        price: 99.00,
        imgUrl: "https://via.placeholder.com/100",
        stock: 25
    },
    {
        id: 12,
        name: "Wireless Charger",
        description: "Fast wireless charger for smartphones",
        price: 19.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 85
    },
    {
        id: 13,
        name: "Noise Cancelling Earbuds",
        description: "In-ear earbuds with active noise cancellation",
        price: 69.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 65
    },
    {
        id: 14,
        name: "Portable Projector",
        description: "Mini projector for home or office use",
        price: 149.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 15
    },
    {
        id: 15,
        name: "Smart Light Bulb",
        description: "WiFi-enabled color smart bulb",
        price: 12.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 100
    },
    {
        id: 16,
        name: "Laptop Backpack",
        description: "Water-resistant backpack with USB port",
        price: 34.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 90
    },
    {
        id: 17,
        name: "Ergonomic Chair",
        description: "Adjustable mesh office chair",
        price: 199.00,
        imgUrl: "https://via.placeholder.com/100",
        stock: 10
    },
    {
        id: 18,
        name: "Tablet Stand",
        description: "Universal stand for tablets and phones",
        price: 16.95,
        imgUrl: "https://via.placeholder.com/100",
        stock: 140
    },
    {
        id: 19,
        name: "HDMI Cable",
        description: "High-speed 6ft HDMI cable",
        price: 8.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 300
    },
    {
        id: 20,
        name: "Graphic Tablet",
        description: "Drawing tablet with pressure sensitivity",
        price: 89.99,
        imgUrl: "https://via.placeholder.com/100",
        stock: 30
    }
];
let pagination = document.getElementById("list-pagination");
let tbody = document.getElementById("tbody");
let formSearch = document.getElementById("form-search");
let inputSearch = document.getElementById("keyword");
let direction = document.getElementById("direction");
let by = document.getElementById("sort-by");

let keyword = '';
let currentPage = 0;
let itemPerPage = 4;
let sortDirection="";
let sortBy="ASC";


const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const changePage = (page) => {
    currentPage = page;
    renderListProduct();
}

const renderPagination = (totalPages) => {
    let pageHTML = new Array(totalPages).fill(1)
        .reduce((temp, _, index) => temp + `<li class="page-item ${currentPage == index ? 'active' : ''}" onclick="changePage(${index})"><a class="page-link" href="#">${index + 1}</a></li>`, "")
    if (currentPage > 0) {
        pageHTML = ` <li class="page-item ${currentPage == 0 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">
            <a class="page-link">Previous</a>
          </li>`+pageHTML;
    }
    if (currentPage < totalPages - 1) {
        pageHTML += `<li class="page-item ${currentPage == totalPages - 1 ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">
            <a class="page-link" href="#">Next</a>
          </li>`;
    }
    pagination.innerHTML = pageHTML;
}
const renderListProduct = () => {
    let start = currentPage * itemPerPage;
    let filterArray = products.filter(pro => pro.name.toLowerCase().includes(keyword));
    //<img src="${pro.imgUrl}" alt="${pro.name}" width="200" height="100" style="object-fit: cover;">
    filterArray = sortProductList(filterArray);
    let html = filterArray.slice(start, start + itemPerPage).reduce((temp, pro, index) => temp + `<tr>
                <th scope="row">${index + 1}</th>
                <td>${pro.id}</td>
                <td>${pro.name}</td>
                <td> </td>
                <td>${pro.description}</td>
                <td>${USDollar.format(pro.price)}</td>
                <td>${pro.stock}</td>
                <td>${pro.status ? "Đang bán" : "Ngừng bán"}</td>
                <td><button class="btn btn-warning"><i class="fa-solid fa-comment-pen"></i></button></td>
                <td><button onclick="deleteProductById('${pro.id}')" class="btn btn-danger"><i class="fa-solid fa-trash-xmark"></i></button></td>
            </tr>`
        , "")


    // sử dụng innerHTML để hiển thị ra dom
    tbody.innerHTML = html;
    let totalPages = Math.ceil(filterArray.length / itemPerPage);
    renderPagination(totalPages);

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


const deleteProductById = (id) => {
    // confirm
    if (!confirm('Bạn có chắc chắn muốn xóa không')) {
        return;
    }
    // lọc các sản phẩm ko bị xóa và gán vào mảng ban đầu
    products = products.filter(pro => pro.id != id);
    renderListProduct();
}


const handleAddProduct = () => {
    let product = validateInputProduct();
    if (product) {
        // thành công nhưng sẽ load lại trang và tải lại dữu liêu : Browser Storage
        products.push(product);
        let myModal = document.getElementById('modal-add');
        let modal = bootstrap.Modal.getInstance(myModal)
        modal.hide();
        renderListProduct();
    }

}

const validateInputProduct = () => {
    // id ko đc để trống
    // id phải bắt đầu bằng chữ P và có 4 kí tự số
    // id ko đc trừng lặp
    let regex_id = /P[0-9]{4}/g; let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let imgUrl = document.getElementById("imgUrl").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let stock = document.getElementById("stock").value;
    let flag = false;
    if (id.trim() == "") {
        document.getElementById("error_id").innerText = "Không được để trống";
    } else if (!regex_id.test(id)) {
        document.getElementById("error_id").innerText = "Không đúng định dạng , phải bắt đàu bằng chữ P và có 4 kí tự số";
    } else if (products.some(p => p.id === id)) {
        document.getElementById("error_id").innerText = "ID đã tồn tại, vui lòng nhập id khác";
    } else {
        document.getElementById("error_id").innerText = "";
        flag = true;
    }

    return flag ? { id, name, description, price, imgUrl, stock } : null;
}


// tìm kiếm
formSearch.addEventListener("submit", function(e){
    currentPage = 0;
    e.preventDefault();
    keyword = inputSearch.value;
    renderListProduct();
})
direction.addEventListener("change", function(e){
    currentPage=0;
    sortDirection = e.target.value;
    renderListProduct();
})
by.addEventListener("change", function(e){
    currentPage =0;
    sortBy = e.target.value;
    renderListProduct();
})