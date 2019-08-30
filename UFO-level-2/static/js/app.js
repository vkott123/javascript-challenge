// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function appendRowsAndData(obj) {
    var row = tbody.append("tr");

    // Below loop assumes object keys are in same order and are present every time
    Object.entries(obj).forEach(([key, value]) => {
        row.append("td").text(value); 
    })
};

// Append all table rows and data
data.forEach(appendRowsAndData);

// Filter button
var button = d3.select("#filter-btn");

// This function only runs when the button is clicked
button.on("click", function() {
    d3.event.preventDefault();

    // Filter by date
    var dateInput = d3.select("#datetime");
    var datetime = dateInput.property("value");

    var filterInputs = {};

    if (datetime !== "") {
        filterInputs.datetime = datetime;
    }

    // More filters function
    if (usingMoreFilters) {

        // Filter by city
        var cityFilter = d3.select("#City-filter");
        var city = cityFilter.property("value").toLowerCase();

        if (city !== "") {
            filterInputs.city = city;
        }

        // Filter by state
        var stateFilter = d3.select("#State-filter");
        var state = stateFilter.property("value").toLowerCase();

        if (state !== "") {
            filterInputs.state = state;
        }

        // Filter by country
        var countryFilter = d3.select("#Country-filter");
        var country = countryFilter.property("value").toLowerCase();

        if (country !== "") {
            filterInputs.country = country;
        }

        // Filter by shape
        var shapeFilter = d3.select("#Shape-filter");
        var shape = shapeFilter.property("value").toLowerCase();
        
        if (shape !== "") {
            filterInputs.shape = shape;
        }
    }

    var filtered = tableData.filter(obj => {
        var criteria = true;
        Object.entries(filterInputs).forEach(([key, value]) => {
            criteria = criteria && (obj[key] === value);
        });
        return criteria;
    });

    console.log(filtered);

    tbody.html("");

    filtered.forEach(appendRowsAndData);
});

var resetFilters = d3.select("#reset-filter-btn");
var moreFilters = d3.select("#more-filter-btn");
var usingMoreFilters = false;

moreFilters.on("click", function() {
    d3.event.preventDefault();

    usingMoreFilters = true;

    // Use for loop to create additional filters
    var filters = d3.select("#filters");
    const filterList = ["City", "State", "Country", "Shape"];

    filterList.forEach(filter => {
        var newLi = filters.append("li").attr("class","filter list-group-item");
        newLi.append("label").attr("for", filter).text(`Enter a ${filter}`);
        newLi.append("input").attr("class", "form-control")
                             .attr("type", "text")
                             .attr("id", `${filter}-filter`);
    });
    moreFilters.style("display", "none");
    resetFilters.style("display", "block");
});

// "reset" button clears filters and displays all data
resetFilters.on("click", function() {
    d3.event.preventDefault();

    var allFilters = d3.selectAll("input")
                       .property("value", "");
    data.forEach(appendRowsAndData);
});