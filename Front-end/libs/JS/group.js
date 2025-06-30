let groups = [];
let editIndex = null;

const $groupModal = new bootstrap.Modal(document.getElementById("groupModal"));
const $groupForm = $("#groupForm");
const $groupTableBody = $("#groupTableBody");
const $groupModalLabel = $("#groupModalLabel");

// Manually open the modal
function openGroupModal(isEdit = false) {
  if (!isEdit) {
    $groupForm[0].reset();
    $("#groupId").val("");
  }
  $groupModalLabel.text(isEdit ? "Edit Group" : "Add New Group");
  $groupModal.show();
}

// Render table rows
function renderGroups() {
  $groupTableBody.empty();
  groups.forEach((group, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${group.name}</td>
        <td>${group.shortName}</td>
        <td>${group.description}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editGroup(${index})">Edit <i class="bi bi-pencil-square"></i></button>
          <button class="btn btn-sm btn-danger" onclick="deleteGroup(${index})">Delete <i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `;
    $groupTableBody.append(row);
  });
}

// Edit handler
function editGroup(index) {
  const group = groups[index];
  $("#groupId").val(index);
  $("#groupName").val(group.name);
  $("#groupShortName").val(group.shortName);
  $("#groupDescription").val(group.description);
  editIndex = index;
  openGroupModal(true);
}

// Delete handler
function deleteGroup(index) {
  if (confirm("Are you sure you want to delete this group?")) {
    groups.splice(index, 1);
    renderGroups();
  }
}

// Submit form with spinner
$groupForm.on("submit", function (e) {
  e.preventDefault();
  $(".btn-primary", this)
    .html('Saving... <span class="spinner-border spinner-border-sm"></span>')
    .prop("disabled", true);

  const group = {
    name: $("#groupName").val(),
    shortName: $("#groupShortName").val(),
    description: $("#groupDescription").val()
  };

  setTimeout(() => {
    if (editIndex !== null) {
      groups[editIndex] = group;
      editIndex = null;
    } else {
      groups.push(group);
    }

    renderGroups();
    $groupForm[0].reset();
    $groupModal.hide();
    $(".btn-primary", this).html("Save").prop("disabled", false);
    $groupModalLabel.text("Add New Group");
  }, 1500);
});

// Optional: trigger from a dedicated "Add" button in future
$(document).ready(() => {
  // Example: $("#openGroupModalBtn").on("click", () => openGroupModal());
});
