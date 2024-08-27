
var legends2 = {
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

var paint = {};
var paint2 = {};

map_center = [-60, -10]
startzoom = 2
flytozoom = 3
speed = 0.1

wrapper_section = 'map-wrapper'

var legends = {
    'dis_m3_pyr': [[0, 10, 50, 100, 1000, 10000, 25000, 50000],
        ["hsl(207, 88%, 80%)",
            "hsl(207, 89%, 70%)",
            "hsl(207, 89%, 60%)",
            "hsl(207, 89%, 50%)",
            "hsl(207, 89%, 40%)",
            "hsl(207, 89%, 30%)",
            "hsl(207, 89%, 20%)",
            "hsl(207, 89%, 10%)",],
        "Natural Discharge (m3)"],
    'pac_pc_sse': [[0, 1, 10, 50, 99, 100],
        ["hsl(0,0%,70%)",
            "hsl(199,98%,61%)",
            "hsl(314,73%,24%)",
            "hsl(5,80%,55%)",
            "hsl(33,74%,50%)",
            "hsl(50,100%,52%)"
        ],
        "Protected Areas (%)"],
    'ari_ix_sav': [[0, 1, 50, 100, 150, 200],
        [
            "hsl(19,77%,38%)",
            "hsl(28,65%,54%)",
            "hsl(118,72%,66%)",
            "hsl(108,80%,33%)",
            "hsl(204,72%,41%)",
            "hsl(220,73%,38%)"
        ],
        "Global Aridity Index"]

};

function update_style(map_name, legends) {

    paint = {
        "fill-color": [
            'case',
            ["==", map_name, 'dis_m3_pyr'],
            [
                "step",
                ["get", "dis_m3_pyr"],
                // start with color
                legends.dis_m3_pyr[1][0],
                // first breakpoint value = 0
                legends.dis_m3_pyr[0][0],
                legends.dis_m3_pyr[1][0],
                legends.dis_m3_pyr[0][1],
                legends.dis_m3_pyr[1][1],
                legends.dis_m3_pyr[0][2],
                legends.dis_m3_pyr[1][2],
                legends.dis_m3_pyr[0][3],
                legends.dis_m3_pyr[1][3],
                legends.dis_m3_pyr[0][4],
                legends.dis_m3_pyr[1][4],
                legends.dis_m3_pyr[0][5],
                legends.dis_m3_pyr[1][5],
                legends.dis_m3_pyr[0][6],
                legends.dis_m3_pyr[1][6],
                legends.dis_m3_pyr[0][7],
                legends.dis_m3_pyr[1][7]

            ],
            ["==", map_name, "pac_pc_sse"],
            [
                "step",
                ["get", "pac_pc_sse"],
                // start with color
                legends.pac_pc_sse[1][0],
                // first breakpoint value = 0
                legends.pac_pc_sse[0][0],
                legends.pac_pc_sse[1][0],
                legends.pac_pc_sse[0][1],
                legends.pac_pc_sse[1][1],
                legends.pac_pc_sse[0][2],
                legends.pac_pc_sse[1][2],
                legends.pac_pc_sse[0][3],
                legends.pac_pc_sse[1][3],
                legends.pac_pc_sse[0][4],
                legends.pac_pc_sse[1][4],
                legends.pac_pc_sse[0][5],
                legends.pac_pc_sse[1][5]

            ],
            ["==", map_name, "ari_ix_sav"],
            [
                "step",
                ["get", "ari_ix_sav"],
                // start with color
                legends.ari_ix_sav[1][0],
                // first breakpoint value = 0
                legends.ari_ix_sav[0][0],
                legends.ari_ix_sav[1][0],
                legends.ari_ix_sav[0][1],
                legends.ari_ix_sav[1][1],
                legends.ari_ix_sav[0][2],
                legends.ari_ix_sav[1][2],
                legends.ari_ix_sav[0][3],
                legends.ari_ix_sav[1][3],
                legends.ari_ix_sav[0][4],
                legends.ari_ix_sav[1][4],
                legends.ari_ix_sav[0][5],
                legends.ari_ix_sav[1][5],

            ],
            // default value must be present
            "hsl(157, 89%, 40%)",
        ],
        "fill-opacity": 1,
        "fill-outline-color": "white"
    };
    paint2 = {
        "fill-color": [
            'case',
            ["==", map_name, 'dis_m3_pyr'],
            [
                "step",
                ["get", "dis_m3_pyr"],
                // start with color
                legends.dis_m3_pyr[1][0],
                // first breakpoint value = 0
                legends.dis_m3_pyr[0][0],
                legends.dis_m3_pyr[1][0],
                legends.dis_m3_pyr[0][1],
                legends.dis_m3_pyr[1][1],
                legends.dis_m3_pyr[0][2],
                legends.dis_m3_pyr[1][2],
                legends.dis_m3_pyr[0][3],
                legends.dis_m3_pyr[1][3],
                legends.dis_m3_pyr[0][4],
                legends.dis_m3_pyr[1][4],
                legends.dis_m3_pyr[0][5],
                legends.dis_m3_pyr[1][5],
                legends.dis_m3_pyr[0][6],
                legends.dis_m3_pyr[1][6],
                legends.dis_m3_pyr[0][7],
                legends.dis_m3_pyr[1][7]

            ],
            ["==", map_name, "pac_pc_sse"],
            [
                "step",
                ["get", "pac_pc_sse"],
                // start with color
                legends.pac_pc_sse[1][0],
                // first breakpoint value = 0
                legends.pac_pc_sse[0][0],
                legends.pac_pc_sse[1][0],
                legends.pac_pc_sse[0][1],
                legends.pac_pc_sse[1][1],
                legends.pac_pc_sse[0][2],
                legends.pac_pc_sse[1][2],
                legends.pac_pc_sse[0][3],
                legends.pac_pc_sse[1][3],
                legends.pac_pc_sse[0][4],
                legends.pac_pc_sse[1][4],
                legends.pac_pc_sse[0][5],
                legends.pac_pc_sse[1][5]

            ],
            ["==", map_name, "ari_ix_sav"],
            [
                "step",
                ["get", "ari_ix_sav"],
                // start with color
                legends.ari_ix_sav[1][0],
                // first breakpoint value = 0
                legends.ari_ix_sav[0][0],
                legends.ari_ix_sav[1][0],
                legends.ari_ix_sav[0][1],
                legends.ari_ix_sav[1][1],
                legends.ari_ix_sav[0][2],
                legends.ari_ix_sav[1][2],
                legends.ari_ix_sav[0][3],
                legends.ari_ix_sav[1][3],
                legends.ari_ix_sav[0][4],
                legends.ari_ix_sav[1][4],
                legends.ari_ix_sav[0][5],
                legends.ari_ix_sav[1][5],

            ],
            // default value must be present
            "hsl(157, 89%, 40%)",
        ],
        "fill-opacity": 1,
        "fill-outline-color": "white"
    };

    return paint, paint2;
}

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

console.log(update_style('soc_th_sav', legends));