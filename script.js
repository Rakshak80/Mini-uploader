
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if(email && password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({email, password, website: ""});
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered Successfully! Now login.');
  } else {
    alert('Please fill all fields.');
  }
}
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if(email === 'admin' && password === '1234') {
    localStorage.setItem('admin', 'true');
    window.location.href = 'admin.html';
  } else {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials.');
    }
  }
}
function saveWebsite() {
  const website = document.getElementById('website').value;
  const email = localStorage.getItem('loggedInUser');
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => {
    if(u.email === email) {
      u.website = website;
    }
    return u;
  });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('status').innerText = 'Website Saved!';
}
function listUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = '<h3>Registered Users:</h3>';
  users.forEach(u => {
    usersList.innerHTML += `<p>Email: ${u.email} | Website: ${u.website || 'N/A'}</p>`;
  });
}
function logout() {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('admin');
  window.location.href = 'index.html';
}
