d3.select("#title").text(`Line Chart, D3 v.${d3.version}`);

const margin = { top: 30, right: 30, bottom: 30, left: 30 };
const width = 640;
const height = 400;

d3.csv("../data/AAPL.csv", (d) => {
  return {
    date: new Date(d.Date),
    close: +d.Close,
  };
}).then((data) => {
  const dateExtent = d3.extent(data.map((x) => x.date));
  const closeExtent = d3.extent(data.map((x) => x.close));

  const x = d3
    .scaleUtc()
    .domain(dateExtent)
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain(closeExtent)
    .range([height - margin.bottom, margin.top]);

  const svg = d3
    .select("#area")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Declare the line generator.
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Add y-axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

  // Append a path for the line.
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(data));
});
