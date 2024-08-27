var legends2 = {
  dis_m3_pyr: [
    [0, 10, 50, 100, 1000, 10000, 25000, 50000, 230000],
    [
      "hsl(207, 88%, 80%)",
      "hsl(207, 89%, 70%)",
      "hsl(207, 89%, 60%)",
      "hsl(207, 89%, 50%)",
      "hsl(207, 89%, 40%)",
      "hsl(207, 89%, 30%)",
      "hsl(207, 89%, 20%)",
      "hsl(207, 89%, 10%)",
      "black",
    ],
    "Natural Discharge (m3)",
  ],
  pac_pc_sse: [
    [0, 1, 10, 50, 99, 100],
    [
      "hsl(0,0%,70%)",
      "hsl(199,98%,61%)",
      "hsl(314,73%,24%)",
      "hsl(5,80%,55%)",
      "hsl(33,74%,50%)",
      "black",
    ],
    "Protected Areas (%)",
  ],
  ari_ix_sav: [
    [0, 1, 50, 100, 150, 200, 227],
    [
      "hsl(19,77%,38%)",
      "hsl(28,65%,54%)",
      "hsl(118,72%,66%)",
      "hsl(108,80%,33%)",
      "hsl(204,72%,41%)",
      "hsl(220,73%,38%)",
      "black",
    ],
    "Global Aridity Index",
  ],
  soc_th_sav: [
    [0, 10, 25, 50, 100, 1041],
    ["#fddd58", "#f7ba3e", "#d68422", "#9e4410", "#6b0500", "black"],
    "Organic Carbon Content in Soil",
  ],
};

var paint = {};
var paint2 = {};

map_center = [-60, -10];
startzoom = 2;
flytozoom = 3;
speed = 0.1;

wrapper_section = "map-wrapper";

var legends = {
  dis_m3_pyr: [
    [0, 10, 50, 100, 1000, 10000, 50000, 230000],
    [
      "hsl(207, 88%, 80%)",
      "hsl(207, 89%, 70%)",
      "hsl(207, 89%, 60%)",
      "hsl(207, 89%, 50%)",
      "hsl(207, 89%, 40%)",
      "hsl(207, 89%, 30%)",
      "hsl(207, 89%, 20%)",
      "hsl(207, 89%, 10%)",
    ],
    "Natural Discharge (m3)",
  ],
  pac_pc_sse: [
    [0, 1, 10, 50, 99, 100],
    [
      "hsl(0,0%,70%)",
      "hsl(199,98%,61%)",
      "hsl(314,73%,24%)",
      "hsl(5,80%,55%)",
      "hsl(33,74%,50%)",
      "yellow",
    ],
    "Protected Areas (%)",
  ],
  ari_ix_sav: [
    [0, 1, 50, 100, 150, 200, 227],
    [
      "hsl(19,77%,38%)",
      "hsl(28,65%,54%)",
      "hsl(118,72%,66%)",
      "hsl(108,80%,33%)",
      "hsl(204,72%,41%)",
      "hsl(220,73%,38%)",
    ],
    "Global Aridity Index",
  ],
  soc_th_sav: [
    [0, 10, 25, 50, 100, 1041],
    ["#fddd58", "#f7ba3e", "#d68422", "#9e4410", "#6b0500", "black"],
    "Organic Carbon Content in Soil",
  ],
};

function update_style_new(map_name, legends) {
  if (!legends[map_name]) {
    console.error(`Legend for ${map_name} not found`);
    return null;
  }

  const legend = legends[map_name];
  const breakpoints = legend[0];
  const colors = legend[1];

  let caseExpression = [
    "case",
    ["==", ["get", map_name], null],
    "rgba(0, 0, 0, 0)", // transparent for null values
  ];

  // Create step expression
  let stepExpression = ["step", ["get", map_name], colors[0]];

  for (let i = 0; i < breakpoints.length - 1; i++) {
    stepExpression.push(breakpoints[i]);
    stepExpression.push(colors[i]);
  }

  // Add step expression to case expression
  caseExpression.push(stepExpression);

  return {
    "fill-color": caseExpression,
    "fill-opacity": 1,
  };
}
