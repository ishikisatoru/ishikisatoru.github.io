const VueSlider = window['vue-slider-component'];

let volume = 60;

const perc = [
    "perc-000",
    "perc-001",
    "perc-002",
    "perc-003",
    "perc-004",
    "perc-005",
    "perc-006",
    "perc-007",
    "perc-008",
    "perc-009"
];

const keyOrder = ["d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b", "c", "cs"];

const keyName = {
    "a": {label: "ラ", style: "btn-light"},
    "as": {label: "ラ#", style: "btn-dark"},
    "b": {label: "シ", style: "btn-light"},
    "c": {label: "ド", style: "btn-light"},
    "cs": {label: "ド#", style: "btn-dark"},
    "d": {label: "レ", style: "btn-light"},
    "ds": {label: "レ#", style: "btn-dark"},
    "e": {label: "ミ", style: "btn-light"},
    "f": {label: "ファ", style: "btn-light"},
    "fs": {label: "ファ#", style: "btn-dark"},
    "g": {label: "ソ", style: "btn-light"},
    "gs": {label: "ソ#", style: "btn-dark"}
};

const shouts = [
    {name: "a-000", key: "a"},
    {name: "a-001", key: "a"},
    {name: "a-002", key: "a"},
    {name: "as-000", key: "as"},
    {name: "as-001", key: "as"},
    {name: "as-002", key: "as"},
    {name: "as-003", key: "as"},
    {name: "as-004", key: "as"},
    {name: "as-005", key: "as"},
    {name: "as-006", key: "as"},
    {name: "as-007", key: "as"},
    {name: "as-008", key: "as"},
    {name: "as-009", key: "as"},
    {name: "b-000", key: "b"},
    {name: "b-001", key: "b"},
    {name: "b-002", key: "b"},
    {name: "b-003", key: "b"},
    {name: "b-004", key: "b"},
    {name: "b-005", key: "b"},
    {name: "c-000", key: "c"},
    {name: "c-001", key: "c"},
    {name: "c-002", key: "c"},
    {name: "cs-000", key: "cs"},
    {name: "d-000", key: "d"},
    {name: "ds-000", key: "ds"},
    {name: "ds-001", key: "ds"},
    {name: "e-000", key: "e"},
    {name: "e-001", key: "e"},
    {name: "f-000", key: "f"},
    {name: "fs-000", key: "fs"},
    {name: "fs-001", key: "fs"},
    {name: "g-000", key: "g"},
    {name: "g-001", key: "g"},
    {name: "g-002", key: "g"},
    {name: "gs-000", key: "gs"},
    {name: "gs-001", key: "gs"},
    {name: "etc-000", key: "etc"},
    {name: "etc-001", key: "etc"},
    {name: "etc-002", key: "etc"},
    {name: "etc-003", key: "etc"},
    {name: "etc-004", key: "etc"},
    {name: "etc-005", key: "etc"},
    {name: "etc-006", key: "etc"},
    {name: "etc-007", key: "etc"}
];

const keyLabels = function () {
    return keyOrder.map(v => keyName[v].label);
}();

const shoutList = function () {

    const map = {};

    shouts.forEach(function (shout) {


        if (!Array.isArray(map[shout.key])) {
            map[shout.key] = [];
        }

        map[shout.key].push(shout);

    });

    const rows = [];

    while (true) {

        let isNotEmpty = false;

        const cells = [];

        keyOrder.forEach(function (key) {

            if (map[key].length) {

                let shout = map[key].pop();

                cells.push({
                    name: shout.name,
                    style: keyName[key].style
                });

                isNotEmpty = isNotEmpty | true;

            } else {
                cells.push({
                    style: "invisible"
                })
            }


        });

        if (!isNotEmpty) {
            break;
        }

        rows.push(cells);

    }

    return {rows: rows, etcSounds: map["etc"]};


}();

const playSound = function (id) {

    const audio = document.getElementById(id);

    audio.volume = volume / 100.0;

    audio.play();

}


const loadShoutApp = new Vue({
    el: "#load-shout",
    data: {sounds: shouts}
});

const playShoutApp = new Vue({
    el: "#play-shout",
    data: {rows: shoutList.rows, etcSounds: shoutList.etcSounds, keyLabels: keyLabels},
    methods: {
        playSound: function (event) {

            const audioId = event.target.getAttribute('audio-id');

            playSound(audioId);

        }
    }
});


const loadPercussionApp = new Vue({

    el: "#load-percussion",
    data: {sounds: perc}

});

const playPercussionApp = new Vue({

    el: "#play-percussion",
    data: {sounds: perc},
    methods: {
        playSound: function (event) {

            const audioId = event.target.getAttribute('audio-id');

            playSound(audioId);

        }
    }
});

const app = new Vue({
    el: '#app',
    components: {
        'vueSlider': VueSlider,
    },
    data: {
        volume: volume
    },
    methods: {
        onChange: function () {
            volume = this.volume;
        }
    }
});