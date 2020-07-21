const indexModule = require("./index");

function mockElements() {
    let name = document.createElement("input");
    name.type = "text";
    name.value = "Gorn";

    let salary = document.createElement("input");
    salary.type = "number";
    salary.value = 30000;

    let age = document.createElement("input");
    age.type = "date";
    age.value = new Date();

    return [name,salary,age];
}
function mockdata() {
    return {
        name: "Bhuman",
        salary: 12345,
        age: new Date()
    };
}
describe("Test form elements manipulation methods", () => {
    test("Expect to get 3 elements from getFormElems", () => {
        let elems = indexModule.getFormElems();
        expect(elems).toHaveLength(3);
    });
    test("Does the reset form elements method work?", () => {
        let elems = mockElements();
        indexModule.resetForm(elems);
        expect(elems[1].value).toBe("");
    });

    test("validateForm() to return false for invalid form?", () => {
        let data = mockdata();
        data.name = "";
        expect(indexModule.validateForm(data)).toBeFalsy();
    });

    test("validateForm() to return false when passing a bad date?", () => {
        let data = mockdata();
        data.age = "asdaadsa";
        expect(indexModule.validateForm(data)).toBeFalsy();
    });

    test("validateForm() to returns true for a valid form", () => {
        let data = mockdata();
        expect(indexModule.validateForm(data)).toBeTruthy();
    });

});