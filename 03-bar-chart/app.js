d3.select("#title").text(`D3 version ${d3.version}`);

const margin = { top: 30, right: 30, bottom: 30, left: 50 };
const width = 600;
const height = 400;
let sort = "asc";

d3.json("http://127.0.0.1:5000/movies/agg/genre").then((data) => {
  d3.select("#btn_sort").on("click", () => {
    sort = sort === "asc" ? "desc" : "asc";

    data =
      sort === "asc"
        ? data.sort((a, b) => d3.ascending(+a.gross_usd, +b.gross_usd))
        : data.sort((a, b) => d3.descending(+a.gross_usd, +b.gross_usd));

    console.log(data);

    d3.select("svg").remove();
    grossUsdDomain = d3.extent(data.map((i) => +i["gross_usd"]));
    console.log(grossUsdDomain);
    // create svg
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((i) => i.genre))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain(grossUsdDomain)
      .range([height - margin.bottom, margin.top]);

    // draw X axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // draw Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // draw bar chart
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.genre))
      .attr("y", (d) => y(d.gross_usd))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.gross_usd) - margin.bottom)
      .attr("fill", "steelblue");
  });
});
