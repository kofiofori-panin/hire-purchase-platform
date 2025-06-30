let users = [];
let editIndex = null;
const modal = new bootstrap.Modal(document.getElementById('userModal'));
const modalTitle = document.getElementById('userModalLabel');

// Open modal manually
document.getElementById('openUserModalBtn').addEventListener('click', () => {
  modalTitle.textContent = 'Add User';
  document.getElementById('userForm').reset();
  modal.show();
});

// Form submit with simulated AJAX
$('#userForm').on('submit', function (e) {
  e.preventDefault();

  // Simulate processing
  $('#userModal').modal('hide');
  $('#processingIndicator').removeClass('d-none');

  // Capture user input
  const user = {
    firstname: $('#firstname').val(),
    lastname: $('#lastname').val(),
    mobile: $('#mobile').val(),
    email: $('#email').val(),
    role: $('#role').val(),
  };

  // Simulate AJAX delay
  setTimeout(() => {
    if (editIndex !== null) {
      users[editIndex] = user;
      editIndex = null;
    } else {
      users.push(user);
    }

    renderUsers();
    $('#processingIndicator').addClass('d-none');
  }, 1500); // simulate 1.5 seconds delay
});

function renderUsers() {
  const tbody = $('#userTableBody');
  tbody.empty();
  users.forEach((user, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${user.firstname}</td>
      <td>${user.lastname}</td>
      <td>${user.mobile}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-sm btn-info me-1 text-white" onclick="viewUser(${index})">View <i class="bi bi-eye-fill"></i></button>
        <button class="btn btn-sm btn-warning me-1" onclick="editUser(${index})">Edit <i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Delete <i class="bi bi-trash"></i></button>
      </td>
    </tr>`;
    tbody.append(row);
  });
}

function viewUser(index) {
  const user = users[index];
  $('#viewFirstname').text(user.firstname);
  $('#viewLastname').text(user.lastname);
  $('#viewMobile').text(user.mobile);
  $('#viewEmail').text(user.email);
  $('#viewRole').text(user.role);

  new bootstrap.Modal(document.getElementById('viewUserModal')).show();
}

function editUser(index) {
  const user = users[index];
  $('#firstname').val(user.firstname);
  $('#lastname').val(user.lastname);
  $('#mobile').val(user.mobile);
  $('#email').val(user.email);
  $('#role').val(user.role);
  editIndex = index;

  modalTitle.textContent = 'Edit User';
  modal.show();
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    renderUsers();
  }
}
