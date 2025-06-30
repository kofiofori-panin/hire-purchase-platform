// customer.js
let customers = [];
let editIndex = null;

const customerForm = document.getElementById("customerForm");
const customerModal = new bootstrap.Modal(document.getElementById("customerModal"));
const viewCustomerModal = new bootstrap.Modal(document.getElementById("viewCustomerModal"));
const customerTableBody = document.getElementById("customerTableBody");

customerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const customer = {
    memberCode: document.getElementById("memberCode").value,
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    dob: document.getElementById("dob").value,
    nid: document.getElementById("nid").value,
    idIssue: document.getElementById("idIssue").value,
    idExpiry: document.getElementById("idExpiry").value,
    resAddress: document.getElementById("resAddress").value,
    postAddress: document.getElementById("postAddress").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    group: document.getElementById("groupSelect").value,
  };

  if (editIndex !== null) {
    customers[editIndex] = customer;
    editIndex = null;
  } else {
    customers.push(customer);
  }

  renderCustomers();
  customerForm.reset();
  customerModal.hide();
});

function renderCustomers() {
  customerTableBody.innerHTML = "";
  customers.forEach((cust, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${cust.memberCode}</td>
        <td>${cust.firstname}</td>
        <td>${cust.lastname}</td>
        <td>${cust.mobile}</td>
        <td>${cust.email}</td>
        <td>${cust.group}</td>
        <td>
          <button class="btn btn-sm btn-info me-1" onclick="viewCustomer(${index})">View <i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-warning me-1" onclick="editCustomer(${index})">Edit <i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteCustomer(${index})">Delete <i class="bi bi-trash"></i></button>
        </td>
      </tr>`;
    customerTableBody.innerHTML += row;
  });
}

function editCustomer(index) {
  const c = customers[index];
  document.getElementById("customerModalLabel").textContent = "Edit Customer";
  document.getElementById("memberCode").value = c.memberCode;
  document.getElementById("firstname").value = c.firstname;
  document.getElementById("lastname").value = c.lastname;
  document.getElementById("dob").value = c.dob;
  document.getElementById("nid").value = c.nid;
  document.getElementById("idIssue").value = c.idIssue;
  document.getElementById("idExpiry").value = c.idExpiry;
  document.getElementById("resAddress").value = c.resAddress;
  document.getElementById("postAddress").value = c.postAddress;
  document.getElementById("mobile").value = c.mobile;
  document.getElementById("email").value = c.email;
  document.getElementById("groupSelect").value = c.group;
  editIndex = index;
  customerModal.show();
}

function deleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    customers.splice(index, 1);
    renderCustomers();
  }
}

function viewCustomer(index) {
  const c = customers[index];
  document.getElementById("viewMemberCode").textContent = c.memberCode;
  document.getElementById("viewFirstname").textContent = c.firstname;
  document.getElementById("viewLastname").textContent = c.lastname;
  document.getElementById("viewDob").textContent = c.dob;
  document.getElementById("viewNid").textContent = c.nid;
  document.getElementById("viewIdIssue").textContent = c.idIssue;
  document.getElementById("viewIdExpiry").textContent = c.idExpiry;
  document.getElementById("viewResAddress").textContent = c.resAddress;
  document.getElementById("viewPostAddress").textContent = c.postAddress;
  document.getElementById("viewMobile").textContent = c.mobile;
  document.getElementById("viewEmail").textContent = c.email;
  document.getElementById("viewGroup").textContent = c.group;
  viewCustomerModal.show();
}

// Auto-generate Member Code
const modalEl = document.getElementById("customerModal");
modalEl.addEventListener("show.bs.modal", () => {
  if (editIndex === null) {
    document.getElementById("customerModalLabel").textContent = "Add Customer";
    document.getElementById("memberCode").value = "CUS-" + Date.now().toString().slice(-6);
  }
});
