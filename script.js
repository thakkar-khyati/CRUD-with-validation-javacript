


let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email").value;
let MobileNumber = document.getElementById("MobileNumber").value;
let bDate = document.getElementById("bDate");
let age = getAge(bDate);
let address = document.getElementById("address");
let gender = "";

if (document.getElementById("female").checked) {
    gender = "female";
}
else if (document.getElementById("male").checked) {
    gender = "male";
}

let EError = document.getElementById("EError");

function getAge(bDate) {
    var millisecondsBetweenDOBAnd1970 = Date.parse(bDate);
    var millisecondsBetweenNowAnd1970 = Date.now();
    var ageInMilliseconds = millisecondsBetweenNowAnd1970 - millisecondsBetweenDOBAnd1970;
    var milliseconds = ageInMilliseconds;
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var year = day * 365;
    var years = Math.round(milliseconds / year);
    console.log(years);

    return years;
}

function emailValidate(email) {

    let eReg = /^([a-zA-Z0-9\.-]+)([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z])$/;
    if (eReg.test(email.value)) {
        return true;
    }
    else {
        EError.style.visibility = "visible";
        return false;
    }
}


function validate() {

    if (emailValidate(email)) {
        return true;
    }
    else {
        return false;
    }
}


function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.firstName + "</td>";
        html += "<td>" + element.lastName + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.MobileNumber + "</td>";
        html += "<td>" + element.bDate + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += "<td>" + element.address + "</td>";
        html += `<td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#popup"  onClick="updateData(${index})" >Update</button>
        <button class="btn btn-danger" onClick="deleteData(${index})" >Delete</button></td>`
        html += "</tr>";
    })

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function addData() {

    if (validate()) {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let MobileNumber = document.getElementById("MobileNumber").value;
        let bDate = document.getElementById("bDate").value;
        let age = getAge(bDate);
        let address = document.getElementById("address").value;
        let gender = "";

        if (document.getElementById("female").checked) {
            gender = "female";
        }
        else if (document.getElementById("male").checked) {
            gender = "male";
        }
        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            MobileNumber: MobileNumber,
            bDate: bDate,
            age: age,
            gender: gender,
            address: address
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
    }
}

function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function getGenderValue() {
    let gender = document.getElementsByName("gender");
    let selected = Array.from(gender).find(gender => gender.checked);
    location.reload();
    return selected.value;
}

function setGenderValue(gender) {
    document.getElementById(gender).checked = true;
}

function updateData(index) {

    document.getElementById("submit").classList.add("d-none");
    document.getElementById("update").classList.remove("d-none");

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstName").value = peopleList[index].firstName;
    document.getElementById("lastName").value = peopleList[index].lastName;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("MobileNumber").value = peopleList[index].MobileNumber;
    document.getElementById("bDate").value = peopleList[index].bDate;
    setGenderValue(peopleList[index].gender);
    document.getElementById("address").value = peopleList[index].address;

    document.querySelector("#update").onclick = function () {

        if (validate()) {
            peopleList[index].firstName = document.getElementById("firstName").value;
            peopleList[index].lastName = document.getElementById("lastName").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].MobileNumber = document.getElementById("MobileNumber").value;
            peopleList[index].bDate = document.getElementById("bDate").value;
            peopleList[index].age = getAge(document.getElementById("bDate").value)
            if (document.getElementsByName("gender").value == document.getElementById("female").checked) {
                peopleList[index].gender = "female";
            }
            else if (document.getElementsByName("gender").value == document.getElementById("male").checked) {
                peopleList[index].gender = "male";
            }
            peopleList[index].address = document.getElementById("address").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();
        }



        // document.getElementById("firstName").value ="";
        // document.getElementById("lastName").value ="";
        // document.getElementById("email").value ="";
        // document.getElementById("MobileNumber").value ="";
        // document.getElementById("bDate").value ="";
        // document.getElementById("age").value ="";
        // document.getElementById("gender").checked= none;
        // document.getElementById("address").value ="";

        document.getElementById("submit").classList.remove("d-none");
        document.getElementById("update").classList.add("d-none");
    }
}