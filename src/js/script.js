function validateContactForm() {
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
	if (address == "") {
		alert("address is required");
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

function showContacts(page = 1, itemsPerPage = 3) {
	document.getElementById("update").style.display = "none";
	document.getElementById("submit").style.display = "";

	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedContacts = contacts.slice(startIndex, endIndex);

	let html = "";
	paginatedContacts.forEach(function (element, index) {
		const row = document.createElement("tr");
		html += `<tr>
            <td>${element.name}</td>
            <td>${element.phone}</td>
            <td>${element.email}</td>
            <td>${element.address}</td>
            <td style="display: flex; justify-content: space-between; align-items: center;">
                <button onclick="deleteContact(${index})" class ="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none">Delete</button>
                <button onclick="updateContact(${index})" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none pl-3"> Edit</button>
            </td>
        </tr>`;
	});

	document.querySelector("#contactList tbody").innerHTML = html;

	// Create pagination links
	const totalPages = Math.ceil(contacts.length / itemsPerPage);
	let paginationHtml = "";
	for (let i = 1; i <= totalPages; i++) {
		paginationHtml += `<button onclick="showContacts(${i}, ${itemsPerPage})">${i}</button>`;
	}
	document.querySelector("#pagination").innerHTML = paginationHtml;
	document
		.getElementById("searchInput")
		.addEventListener("input", searchContacts);
}

function addContact() {
	if (validateContactForm() == true) {
		let name = document.getElementById("name").value;
		let phone = document.getElementById("phone").value;
		let email = document.getElementById("email").value;
		let address = document.getElementById("address").value;

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
		const searchParams = new URLSearchParams(location.search);
		searchParams.delete("param2");
		location.search = searchParams.toString();
		console.log(location.href);

		document.getElementById("name").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("email").value = "";
		document.getElementById("address").value = "";

		showContacts();
	}
}

function deleteContact(index) {
	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	contacts.splice(index, 1);
	localStorage.setItem("contacts", JSON.stringify(contacts));
	showContacts();
}

function updateContact(index) {
	document.getElementById("submit").style.display = "none";
	document.getElementById("update").style.display = "block";

	let contacts;
	if (localStorage.getItem("contacts") == null) {
		contacts = [];
	} else {
		contacts = JSON.parse(localStorage.getItem("contacts"));
	}

	document.getElementById("name").value = contacts[index].name;
	document.getElementById("phone").value = contacts[index].phone;
	document.getElementById("email").value = contacts[index].email;
	document.getElementById("address").value = contacts[index].address;

	document.getElementById("update").onclick = function () {
		if (validateContactForm() == true) {
			contacts[index].name = document.getElementById("name").value;
			contacts[index].phone = document.getElementById("phone").value;
			contacts[index].email = document.getElementById("email").value;
			contacts[index].address = document.getElementById("address").value;

			localStorage.setItem("contacts", JSON.stringify(contacts));

			showContacts();

			document.getElementById("name").value = "";
			document.getElementById("phone").value = "";
			document.getElementById("email").value = "";
			document.getElementById("address").value = "";

			document.getElementById("submit").style.display = "block";
			document.getElementById("update").style.display = "none";
		}
	};
}

document.addEventListener("DOMContentLoaded", function () {
	function searchContacts() {
		let searchText = document.getElementById("searchInput").value.toLowerCase();
		let rows = document.querySelectorAll("#contactList tbody tr");

		rows.forEach(function (row) {
			let name = row.cells[0].innerText.toLowerCase();
			let phone = row.cells[1].innerText.toLowerCase();
			let email = row.cells[2].innerText.toLowerCase();
			let address = row.cells[3].innerText.toLowerCase();

			if (
				name.includes(searchText) ||
				phone.includes(searchText) ||
				email.includes(searchText) ||
				address.includes(searchText)
			) {
				row.style.display = "";
			} else {
				row.style.display = "none";
			}
		});
	}

	// Assuming you have an input element with the ID "searchInput"
	document
		.getElementById("searchInput")
		.addEventListener("input", searchContacts);

	// Assuming you have a function named showContacts to display the initial list of contacts
	showContacts(); // Call the function to initially display all contacts
});
