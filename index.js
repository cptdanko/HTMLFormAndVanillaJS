const UPLOAD_URL = "https://dummy.restapiexample.com/api/v1/create";
const PROXY_URL = `http://localhost:9999/create`;

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
    document.getElementById("name").disabled = state;
    document.getElementById("salary").disabled = state;
    document.getElementById("age").disabled = state;
    document.getElementById("submit").disabled = state;
    document.getElementById("reset").disabled = state;
}
/*
Adding an onchange method to input element means extra overhead
and can be problematic for large forms. Here, we have a very small
form with only a handful of fields
*/
function setupUI() {
    document.getElementById("name").onchange = function() {
        checkDisableSubmit();
    };
    document.getElementById("salary").onchange = function() {
        checkDisableSubmit();
    }
    document.getElementById("age").onchange = function() {
        checkDisableSubmit();
    };
}

function checkValidity() {
    let data = getFormData();
    if(validateForm(data)) {
        let submitBtn = document.getElementById("submit");
        submitBtn.disabled = false;
    }
}

function getFormElems() {
    return [
        document.getElementById("name"),
        document.getElementById("salary"),
        document.getElementById("age")            
    ];
}
/*
    Grab all values from the UI and return them 
    as a Javascript object. Separating out the code 
    so it's more testable
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

function submitForm() {
    //capture the form field data
    let data = getFormData();
    //validate it
    if(!validateForm(data)) {
        alert("please ensure you add all correct values");
        return;
    }
    toggleUI(true);
    //upload data to server
    uploadWithFetch(PROXY_URL, data).then(response => {
        alert(`Dear ${data.name} your user id is: ${response.data.id}`);
        let formElems = getFormElems();
        resetForm(formElems);
        toggleUI(false);
    }).catch(() => {
        toggleUI(false);
    });
}
/*
    This is the very modern implementation using 
    some the newer fetch API. Won't be usable in older 
    browsers. Depends on browsers we intend to support
*/
async function uploadWithFetch(url = '', data) {
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return resp.json();
}
/*
    If browser compatibility is sn issue, then use this method to 
    upload as XMLHttpRequest is compitable with older browsers.
*/
function uploadData(url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        //request.open("POST", PROXY_URL, true);
        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        request.onload = function(e) {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    let responseBody = JSON.parse(request.responseText);
                    resolve(responseBody);
                } else {
                    reject('Error posting');
                }
            } 
        }
        request.send(data);
    });

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
    if(data.age == null) {
        return false;
    }
    return true;
}
function resetFromUI() {
    let formElems = getFormElems();
    resetForm(formElems);
}
/* The method below is more like a private method */
function resetForm(elems) {
    elems.forEach(e => {
        e.value = "";
    });
}

/*module.exports = {
    validateForm: validateForm,
    checkValidity: checkValidity,
    setupUI: setupUI,   
    toggleUI: toggleUI,
    submitForm: submitForm,
    resetForm: resetForm
};*/