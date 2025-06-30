let roles = [];
let editIndex = null;

const $roleModal = new bootstrap.Modal(document.getElementById("roleModal"));
const $roleForm = $("#roleForm");
const $roleModalLabel = $("#roleModalLabel");
const $roleTableBody = $("#roleTableBody");

// Open modal manually
function openRoleModal(isEdit = false) {
  if (!isEdit) {
    $roleForm[0].reset(); // Only reset form when adding
    $("#permissions input[type=checkbox]").prop("checked", false);
    $("#roleId").val(""); // Clear any hidden ID
  }

  $roleModalLabel.text(isEdit ? "Edit Role" : "Add New Role");
  $roleModal.show();
}

// Render roles in the table
function renderRoles() {
  $roleTableBody.empty();
  roles.forEach((role, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${role.name}</td>
        <td>${role.description}</td>
        <td>
          <button class="btn btn-info btn-sm text-white me-1" onclick="viewRole(${index})">View <i class="bi bi-eye"></i></button>
          <button class="btn btn-warning btn-sm me-1" onclick="editRole(${index})">Edit <i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteRole(${index})">Delete <i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
    $roleTableBody.append(row);
  });
}

// View role
function viewRole(index) {
  const role = roles[index];
  $("#viewRoleName").val(role.name);
  $("#viewRoleDesc").val(role.description);

  const permList = role.permissions.length
    ? role.permissions.join(", ")
    : "None";
  $("#viewPermissions").text(permList);

  new bootstrap.Modal(document.getElementById("viewRoleModal")).show();
}

// Edit role
function editRole(index) {
  const role = roles[index];

  $("#roleId").val(index);
  $("#roleName").val(role.name);
  $("#roleDesc").val(role.description);

  // Uncheck all permissions first, then it check the selected ones
  $("#permissions input[type=checkbox]").prop("checked", false);
  role.permissions.forEach((perm) => {
    $(`#permissions input[value="${perm}"]`).prop("checked", true);
  });

  editIndex = index;
  openRoleModal(true); 
}

// Delete role
function deleteRole(index) {
  if (confirm("Are you sure you want to delete this role?")) {
    roles.splice(index, 1);
    renderRoles();
  }
}

// Save role with spinner
$roleForm.on("submit", function (e) {
  e.preventDefault();
  $(".btn-primary", this)
    .html('Saving... <span class="spinner-border spinner-border-sm"></span>')
    .prop("disabled", true);

  const role = {
    name: $("#roleName").val(),
    description: $("#roleDesc").val(),
    permissions: $("#permissions input:checked")
      .map(function () {
        return $(this).val();
      })
      .get(),
  };

  setTimeout(() => {
    if (editIndex !== null) {
      roles[editIndex] = role;
      editIndex = null;
    } else {
      roles.push(role);
    }

    renderRoles();
    $roleForm[0].reset();
    $roleModal.hide();
    $(".btn-primary", this).html("Save").prop("disabled", false);
    $roleModalLabel.text("Add New Role");
  }, 1500);
});

// Bind Add New Role button to manual modal trigger
$(document).ready(() => {
  $("#openRoleModalBtn").on("click", () => openRoleModal(false));
});
