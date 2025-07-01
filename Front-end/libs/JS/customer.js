let customers = [];
let editIndex = null;

const $customerModal = new bootstrap.Modal(document.getElementById("customerModal"));
const $customerForm = $("#customerForm");
const $customerTableBody = $("#customerTableBody");

// Open Modal Manually
function openCustomerModal(isEdit = false) {
  if (!isEdit) {
    $customerForm[0].reset();
    $("#customerId").val("");
    $("#customerModalLabel").text("Add Customer");
    // Auto-generate Member Code only on add
    $("#memberCode").val("CUS-" + Date.now().toString().slice(-6));
  } else {
    $("#customerModalLabel").text("Edit Customer");
  }

  $customerModal.show();
}

// Render Customers
function renderCustomers() {
  $customerTableBody.empty();
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
          <button class="btn btn-info btn-sm me-1 text-white" onclick="viewCustomer(${index})">View <i class="bi bi-eye"></i></button>
          <button class="btn btn-warning btn-sm me-1" onclick="editCustomer(${index})">Edit <i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${index})">Delete <i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
    $customerTableBody.append(row);
  });
}

// View Customer
function viewCustomer(index) {
  const c = customers[index];
  $("#viewMemberCode").text(c.memberCode);
  $("#viewFirstname").text(c.firstname);
  $("#viewLastname").text(c.lastname);
  $("#viewDob").text(c.dob);
  $("#viewNid").text(c.nid);
  $("#viewIdIssue").text(c.idIssue);
  $("#viewIdExpiry").text(c.idExpiry);
  $("#viewResAddress").text(c.resAddress);
  $("#viewPostAddress").text(c.postAddress);
  $("#viewMobile").text(c.mobile);
  $("#viewEmail").text(c.email);
  $("#viewGroup").text(c.group);

  new bootstrap.Modal(document.getElementById("viewCustomerModal")).show();
}

// Edit Customer
function editCustomer(index) {
  const c = customers[index];
  $("#customerId").val(index);
  $("#firstname").val(c.firstname);
  $("#lastname").val(c.lastname);
  $("#dob").val(c.dob);
  $("#nid").val(c.nid);
  $("#idIssue").val(c.idIssue);
  $("#idExpiry").val(c.idExpiry);
  $("#resAddress").val(c.resAddress);
  $("#postAddress").val(c.postAddress);
  $("#mobile").val(c.mobile);
  $("#email").val(c.email);
  $("#groupSelect").val(c.group);
  $("#memberCode").val(c.memberCode);

  editIndex = index;
  openCustomerModal(true);
}

// Delete Customer
function deleteCustomer(index) {
  if (confirm("Are you sure you want to delete this customer?")) {
    customers.splice(index, 1);
    renderCustomers();
  }
}

// Submit with Spinner Simulation
$customerForm.on("submit", function (e) {
  e.preventDefault();
  $(".btn-primary", this)
    .html('Saving... <span class="spinner-border spinner-border-sm"></span>')
    .prop("disabled", true);

  const customer = {
    memberCode: $("#memberCode").val(),
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    dob: $("#dob").val(),
    nid: $("#nid").val(),
    idIssue: $("#idIssue").val(),
    idExpiry: $("#idExpiry").val(),
    resAddress: $("#resAddress").val(),
    postAddress: $("#postAddress").val(),
    mobile: $("#mobile").val(),
    email: $("#email").val(),
    group: $("#groupSelect").val(),
  };

  setTimeout(() => {
    if (editIndex !== null) {
      customers[editIndex] = customer;
      editIndex = null;
    } else {
      customers.push(customer);
    }

    renderCustomers();
    $customerForm[0].reset();
    $customerModal.hide();
    $(".btn-primary", this).html("Save").prop("disabled", false);
    $("#customerModalLabel").text("Add Customer");
  }, 1500);
});

// "Add Customer" manually
$(document).ready(() => {
  $("button[data-bs-target='#customerModal']").on("click", () => openCustomerModal(false));
});
