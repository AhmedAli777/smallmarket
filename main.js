let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discout = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let arabic = document.getElementById("arabic");
let english = document.getElementById("english");
let day = document.getElementById("day");
let anight = document.getElementById("night");

let btnMood = 1;
let Mode;

/*****************DarkMode**********************/

function e_dayMode() {
  document.body.classList.add("dark");
}

function d_dayMode() {
  document.body.classList.remove("dark");
}

/****************Languages**********************/

/***********************************************/

/***********************************************/
/****************Functions**********************/
/***********************************************/

/***********************************************/
/****************Get Total**********************/
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discout.value;
    total.innerHTML = result;
    total.style.background = "#32cd32";
  } else {
    total.innerHTML = "";
    total.style.background = "#ff0000";
  }
}

/***********************************************/
/****************create product****************/
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

showData();

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discout: discout.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //creat & count & update
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (btnMood == 1) {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      btnMood = 1;
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  //save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));

  //clear iputs
  //clearData();
  //read data
  showData();
};

//clear iputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discout.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

/****************Show Data**********************/

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td> ${i + 1} </td>
            <td> ${dataPro[i].title}</td>
            <td> ${dataPro[i].price}</td>
            <td> ${dataPro[i].taxes}</td>
            <td> ${dataPro[i].ads}</td>
            <td> ${dataPro[i].discout}</td>
            <td> ${dataPro[i].total}</td>
            <td> ${dataPro[i].category} </td>
            <td> <button onclick="updateData(${i})"id="update">update</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
        </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delete all (${dataPro.length})</button> 
        
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}

/***********************************************/
/****************Delete*************************/
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  clearData();
  showData();
}

/***********************************************/
/*****************update************************/

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discout.value = dataPro[i].discout;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  btnMood = 0;
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

/***********************************************/
/*****************Search************************/

let searchMode = "Title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "Title";
  } else {
    searchMode = "Category";
  }
  search.placeholder = " Search By " + searchMode;
  search.focus;
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode == "title") {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td> ${i} </td>
                    <td> ${dataPro[i].title}</td>
                    <td> ${dataPro[i].price}</td>
                    <td> ${dataPro[i].taxes}</td>
                    <td> ${dataPro[i].ads}</td>
                    <td> ${dataPro[i].discout}</td>
                    <td> ${dataPro[i].total}</td>
                    <td> ${dataPro[i].category} </td>
                    <td> <button onclick="updateData(${i})"id="update">update</button> </td>
                    <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
                </tr>
                `;
      }
    } else {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td> ${i} </td>
                    <td> ${dataPro[i].title}</td>
                    <td> ${dataPro[i].price}</td>
                    <td> ${dataPro[i].taxes}</td>
                    <td> ${dataPro[i].ads}</td>
                    <td> ${dataPro[i].discout}</td>
                    <td> ${dataPro[i].total}</td>
                    <td> ${dataPro[i].category} </td>
                    <td> <button onclick="updateData(${i})"id="update">update</button> </td>
                    <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
                </tr>
                `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data
