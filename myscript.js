//updateList(listItem);

function changeTab(element) {
    var tab = element.getAttribute("data-tab");
    var allTab = document.querySelectorAll(".section");
    for (var i = 0; i < allTab.length; i++) {
        allTab[i].style.display = "none";
    }
    document.getElementById(tab + "-content").style.display = "block";
}
var suggestions = new Array();

function addInList() {
    var table = document.getElementById("myTable");
    var value = document.getElementById("search").value;
    if (value == "" || value == null)
        alert("Please enter a value");
    else if (suggestions.includes(value))
        alert("Item already exists");
    else {
        var body = '<tr class="rows">' +
            '<td class="editvalue" >' + value + '</td>' +
            '<td >' +
            '<a href="javascript:void(0)" onclick="editText(this)">EDIT </a>' + '&nbsp' +
            '<a href="javascript:void(0)" onclick="return deleteRow(this)"> DELETE </a>' +
            '</td>' +
            '</tr>'
        table.innerHTML += body;
        suggestions.push(value);
    }
}

function showSuggestion(inputvalue) {
    var sortedlist = [];
    var a, b;
    var input;
    inputelement = document.getElementById("search");
    hideallLists();

    a = document.createElement("DIV");
    a.setAttribute("id", inputelement.id + "suggestionlist");
    a.setAttribute("class", "listitems");
    inputelement.parentNode.appendChild(a);

    for (i = 0; i < suggestions.length; i++) {
        if (suggestions[i].substr(0, inputvalue.length).toUpperCase() == inputvalue.toUpperCase()) {
            sortedlist.push(suggestions[i]);
        }
    }

    for (i = 0; i < sortedlist.length; i++) {
        b = document.createElement("DIV");
        b.setAttribute("id", "finallist");
        b.innerHTML = sortedlist[i];
        b.innerHTML += "<input type='hidden' value='" + sortedlist[i] + "'>";
        b.onclick = function() {
            inputelement.value = this.getElementsByTagName("input")[0].value;
            hideallLists();
        };
        a.appendChild(b);
    }
}

function hideallLists() {
    var x = document.getElementsByClassName("listitems");
    for (var i = 0; i < x.length; i++) {
        x[i].parentNode.removeChild(x[i]);

    }
}


function hideSuggestion() {
    document.getElementById("searchsuggestionlist").style.display = "none";
}


function editText(x) {
    var previousValue = document.getElementById("myTable").rows[x.parentNode.parentNode.rowIndex].cells[0].innerHTML
    var updatedValue = prompt("Please update the item", previousValue);
    if (updatedValue == null || updatedValue == "") {
        updatedValue = previousValue;
    }
    document.getElementById("myTable").rows[x.parentNode.parentNode.rowIndex].cells[0].innerHTML = updatedValue;
    var str = suggestions.toString();
    str = str.replace(previousValue, updatedValue);
    suggestions = str.split(',');
}

function deleteRow(x) {
    document.getElementById("myTable").deleteRow(x.parentNode.parentNode.rowIndex);
    suggestions.pop(suggestions[x.parentNode.parentNode.rowIndex]);
}