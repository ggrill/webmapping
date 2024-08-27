var map_center = [-60, -10];
var startzoom = 2;
var flytozoom = 3;
var speed = 0.1;
var wrapper_section = 'map-wrapper';

console.log(startzoom, flytozoom);

var legends = {
    'dis_m3_pyr': [
        [0, 10, 50, 100, 1000, 10000, 25000, 50000, 230000],
        ["hsl(207, 88%, 80%)", "hsl(207, 89%, 70%)", "hsl(207, 89%, 60%)", "hsl(207, 89%, 50%)", "hsl(207, 89%, 40%)", "hsl(207, 89%, 30%)", "hsl(207, 89%, 20%)", "hsl(207, 89%, 10%)", "black"],
        "Natural Discharge (m3)"
    ],
    'pac_pc_sse': [
        [0, 1, 10, 50, 99, 100],
        ["hsl(0,0%,70%)", "hsl(199,98%,61%)", "hsl(314,73%,24%)", "hsl(5,80%,55%)", "hsl(33,74%,50%)", "black"],
        "Protected Areas (%)"
    ],
    'ari_ix_sav': [
        [0, 1, 50, 100, 150, 200, 227],
        ["hsl(19,77%,38%)", "hsl(28,65%,54%)", "hsl(118,72%,66%)", "hsl(108,80%,33%)", "hsl(204,72%,41%)", "hsl(220,73%,38%)", "black"],
        "Global Aridity Index"
    ],
    'soc_th_sav': [
        [0, 10, 25, 50, 100, 1041],
        ["#fddd58", "#f7ba3e", "#d68422", "#9e4410", "#6b0500", "black"],
        "Organic Carbon Content in Soil"
    ]
};

function generateCaseLogic(map_name, legends, default_color = "hsl(157, 89%, 40%)") {
    let caseLogic = ['case'];

    for (const [key, [breakpoints, colors]] of Object.entries(legends)) {
        caseLogic.push(["==", map_name, key]);

        let stepLogic = ["step", ["get", key]];
        for (let i = 0; i < breakpoints.length; i++) {
            stepLogic.push(breakpoints[i], colors[i]);
        }

        caseLogic.push(stepLogic);
    }

    caseLogic.push(default_color);

    return caseLogic;
}

function update_style(map_name, legends) {
    return {
        "fill-color": generateCaseLogic(map_name, legends),
        "fill-opacity": 1,
        "fill-outline-color": "white"
    };
}