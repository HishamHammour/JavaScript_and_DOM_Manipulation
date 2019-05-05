const tableData = data;
const filter = d3.select("#filter-btn");
const clearFilter = d3.select("#clear-btn");
const columnNames = [
    "datetime",
    "city",
    "state",
    "country",
    "shape",
    "durationMinutes",
    "comments"
];
let table = d3.select("table");


const makeTable=((data, columns) => {
    let tbody = table.append("tbody");
    let rows = tbody.selectAll("tr")
       .data(data)
       .enter()
       .append("tr");
    
    let cells = rows.selectAll("td").data(row => {
        return columns.map(column => {
            return {column: column, value: row[column]};
         });
       })
       .enter()
       .append("td")
       .text(d=> { return d.value; });
   return table;
})

// TODO : work on better filter function
filter.on("click",(event => {
    d3.event.preventDefault();
    d3.selectAll("tbody").remove();
    let filteredData = [];
    let dateSelect = d3.select("#datetime").property("value");
    let citySelect = d3.select("#city").property("value");
    let stateSelect = d3.select("#state").property("value");
    let countrySelect = d3.select("#country").property("value");
    let shapeSelect = d3.select("#shape").property("value");

    if (dateSelect) {
        filteredData.push(tableData.filter(sighting => sighting.datetime === dateSelect));
    };
    if (citySelect){
        filteredData.push(tableData.filter(sighting => sighting.city === citySelect.toLowerCase()));
    };
    if (stateSelect){
        filteredData.push(tableData.filter(sighting => sighting.state === stateSelect.toLowerCase()));
    };
    if (countrySelect){
        filteredData.push(tableData.filter(sighting => sighting.country === countrySelect.toLowerCase()));
    };
    if (shapeSelect){
        filteredData.push(tableData.filter(sighting => sighting.shape === shapeSelect.toLowerCase()));
    };
    makeTable(filteredData[0], columnNames);
}));

clearFilter.on("click",(event =>{
    d3.event.preventDefault();
    d3.selectAll("tbody").remove();
    makeTable(tableData, columnNames);
}));

makeTable(tableData, columnNames);