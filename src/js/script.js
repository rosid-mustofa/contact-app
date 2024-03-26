function validateContextForm() {
	let name = document.getElementById("name").value;
	let phone = document.getElementById("phone").value;
	let email = document.getElementById("email").value;
	let address = document.getElementById("address").value;

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

function showContext() {
	document.getElementById("update").style.display = "none";
	document.getElementById("submit").style.display = "";

	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	var html = "";
	contacts.forEach(function (element, index) {
		html += `<tr>
            <td>${element.name}</td>
            <td>${element.phone}</td>
            <td>${element.email}</td>
            <td>${element.address}</td>
            <td style="display: flex; justify-content: space-between; align-items: center;"><button onclick="deleteContext(${index})" class ="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none">Delete</button><button onclick="updateContext(${index})" class = "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none pl-3"> Edit</button></td>
		    </tr>`;
	});

	document.querySelector("#tableContext tbody").innerHTML = html;
}
document.onload = showContext();

function addContext() {
	if (validateContextForm() == true) {
		var name = document.getElementById("name").value;
		var phone = document.getElementById("phone").value;
		var email = document.getElementById("email").value;
		var address = document.getElementById("address").value;

		let contacts;
		if (localStorage.getItem("contacts") == null) {
			contacts = [];
		} else {
			contacts = JSON.parse(localStorage.getItem("contacts"));
		}
		contacts.push({
			name: name,
			phone: phone,
			email: email,
			address: address,
		});

		localStorage.setItem("contacts", JSON.stringify(contacts));
		showContext();
		document.getElementById("name").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("email").value = "";
		document.getElementById("address").value = "";
	}
}
function deleteContext(index) {
	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	contacts.splice(index, 1);
	localStorage.setItem("contacts", JSON.stringify(contacts));
	showContext();
}
function updateContext(index) {
	document.getElementById("submit").style.display = "none";
	document.getElementById("update").style.display = "block";

	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	// Menampilkan data yang akan diperbarui dalam formulir
	document.getElementById("name").value = contacts[index].name;
	document.getElementById("phone").value = contacts[index].phone;
	document.getElementById("email").value = contacts[index].email;
	document.getElementById("address").value = contacts[index].address;

	// Menangani aksi ketika tombol "Update" diklik
	document.getElementById("update").onclick = function () {
		if (validateContextForm() == true) {
			// Memperbarui data kontak yang dipilih
			contacts[index].name = document.getElementById("name").value;
			contacts[index].phone = document.getElementById("phone").value;
			contacts[index].email = document.getElementById("email").value;
			contacts[index].address = document.getElementById("address").value;

			// Menyimpan data yang diperbarui kembali ke local storage
			localStorage.setItem("contacts", JSON.stringify(contacts));

			// Menampilkan kembali data kontak yang diperbarui dalam tabel
			showContext();

			// Mengosongkan nilai input setelah pembaruan berhasil
			document.getElementById("name").value = "";
			document.getElementById("phone").value = "";
			document.getElementById("email").value = "";
			document.getElementById("address").value = "";

			// Mengembalikan tampilan tombol "Submit" dan menyembunyikan tombol "Update"
			document.getElementById("submit").style.display = "block";
			document.getElementById("update").style.display = "none";
		}
	};
}
