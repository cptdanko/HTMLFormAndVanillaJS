const UPLOAD_URL = "https://dummy.restapiexample.com/api/v1/create";
let PROXY_URL = "https://cors-anywhere.herokuapp.com/" + UPLOAD_URL;

/* Adding it here, other we would have to write this code
three times for the onchange functions below */
function checkDisableSubmit() {
    let data = getFormData();
    let submitBtn = document.getElementById("submit");
    if(validateForm(data)) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
function toggleUI(state) {
    //we could get all the elements here using getFormElems
    //except we would have to add buttons to it?
    let elements = getFormElems();
    elements.forEach(elem => {
        elem.onchange = function() {
            elem.disabled = state;
        }
    });
    document.getElementById("submit").disabled = state;
    document.getElementById("reset").disabled = state;
}
/*
Adding an onchange method to input element means extra overhead
and can be problematic for large forms. Here, we have a very small
form with only a handful of fields.
*/
function setupUI() {
    //ha Javascript, we can use getFormElems here before 
    //declaration long live hoisting!!!!!
    let elements = getFormElems();
    elements.forEach(elem => {
        elem.onchange = function() {
            checkDisableSubmit();
        }
    });
}

function checkValidity() {
    let data = getFormData();
    if(validateForm(data)) {
        let submitBtn = document.getElementById("submit");
        submitBtn.disabled = false;
    }
}
/* use this function more in the rest of the code */
function getFormElems() {
    return [
        document.getElementById("name"),
        document.getElementById("salary"),
        document.getElementById("age")            
    ];
}
/* Code that's called from the HTML file 
typo Bhuman, it's consistent in both files
but spell better mate*/
function resetFromUI() {
    let formElems = getFormElems();
    resetForm(formElems);
}
/*
    Grab all values from the UI and return them 
    as a Javascript object. Separating out the code 
    so it's more testable.
    Use getFormElems() here? or maybe not? We have to 
    build the object and with the name, salary, age 
    properties anyway
*/
function getFormData() {
    let name = document.getElementById("name").value;
    let salary = document.getElementById("salary").value;
    if(salary.length > 0) {
        salary = Math.abs(salary);
    }
    let age = document.getElementById("age").valueAsDate;
    
    let data = {
        name: name,
        salary: salary,
        age: age,
    };
    return data;
}
function showHideLoad() {
    let elem = document.querySelector("#loadIcon");

    if(elem.classList.contains("hideElem")) {
        elem.classList.remove("hideElem");
        elem.classList.add('loading');
    } else {
        elem.classList.remove("loading");
        elem.classList.add('hideElem');
    }
}

function submitForm() {
    //capture the form field data
    let data = getFormData();
    //validate it
    if(!validateForm(data)) {
        alert("please ensure you add all correct values");
        return;
    }
    toggleUI(true);
    showHideLoad();
    //upload data to server
    uploadWithFetch(PROXY_URL, data).then(response => {
        alert(`Dear ${data.name} your user id is: ${response.data.id}`);
        let formElems = getFormElems();
        resetForm(formElems);
        toggleUI(false);
        showHideLoad();
    }).catch(() => {
        showHideLoad();
        toggleUI(false);
        alert(`Sorry we are having trouble creating your id, please try again later?`);
    });
}

/*
    This is the very modern implementation using 
    the newer fetch API. Won't be usable in older 
    browsers. If it's an issue, use XMLHttpRequest
*/
async function uploadWithFetch(url, data) {
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return resp.json();
}

function validateForm(data) {

    if(data.salary === "") {
        return false;
    }
    if(isNaN(data.salary)) {
        return false;
    }
    if(data.name.length < 1) {
        return false;
    }
    if(data.age === null) {
        return false;
    }
    if(Object.prototype.toString.call(data.age) !== "[object Date]") {
        return false;
    }
    if(isNaN(data.age.getTime())) {
        return false;
    }
    return true;
}
/* The method below is more like a private method */
function resetForm(elems) {
    elems.forEach(e => {
        e.value = "";
    });
}

module.exports = {
    validateForm: validateForm,
    checkValidity: checkValidity,
    setupUI: setupUI,   
    toggleUI: toggleUI,
    submitForm: submitForm,
    resetForm: resetForm,
    getFormElems: getFormElems,
};