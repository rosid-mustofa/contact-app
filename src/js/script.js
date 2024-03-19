function validateForm() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  if (name == "") {
    alert("name is Required");
    return false;
  }
  if (phone == "") {
    alert("phone is required");
    return false;
  }
  if (email == "") {
    alert("email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("invalid email address");
    return false;
  }
  return true;
}
function showData() {
  var contactList;
  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }
  var html = "";
  contactList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.address + "</td>";
    html += `<td><button onclick="deleteData(${index})" class ="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none">Delete</button><button onclick="updateData(${index})" class = "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none pl-3"> Edit</button></td>`;
    html += "</tr>";
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}
document.onload = showData();
function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    var contactList;
    if (localStorage.getItem("contactList") == null) {
      contactList = [];
    } else {
      contactList = JSON.parse(localStorage.getItem("contactList"));
    }
    contactList.push({
      name: name,
      phone: phone,
      email: email,
      address: address,
    });
    localStorage.setItem("contactList", JSON.stringify(contactList));
    showData;
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
  }
}
function deleteData(index) {
  var contactList;
  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }
  contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  showData();
}
function updateData(index) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";
  var contactList;
  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }
  document.getElementById("name").value = contactList[index].name;
  document.getElementById("phone").value = contactList[index].phone;
  document.getElementById("email").value = contactList[index].email;
  document.getElementById("address").value = contactList[index].address;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      contactList[index].name = document.getElementById("name").value;
      contactList[index].phone = document.getElementById("phone").value;
      contactList[index].email = document.getElementById("email").value;
      contactList[index].address = document.getElementById("address").value;
      localStorage.setItem("contactList", JSON.stringify(contactList));
      showData();
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      document.getElementById("address").value = "";
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
