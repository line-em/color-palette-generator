// DOM Variables
const colorNames = document.getElementsByClassName("color-name");
const colorHexes = document.getElementsByClassName("color-hex");
const colorWrapper = document.getElementById("wrapper");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");
const color5 = document.getElementById("color5");
const getRandomColorScheme = document.getElementById("generate-random");
const notification = document.getElementById("notification");

// API variables
const colorModes = [
	"monochrome",
	"monochrome-dark",
	"monochrome-light",
	"complement",
	"analogic-complement",
	"analogic",
	"triad",
	"quad"
];
const randomColorMode = colorModes[Math.floor(Math.random() * colorModes.length)];

const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const randomHex = () => {
	let hex = "";
	for (let i = 0; i < 6; i++) {
		const index = Math.floor(Math.random() * hexValues.length);
		hex += hexValues[index];
	}
	return hex;
	// hex = Math.floor(Math.random() * 16777215).toString(16);
	// return hex;
};

//Other Variables
let root = document.documentElement;

// Event Listener: Generate Random Color Scheme / Trigger API
getRandomColorScheme.addEventListener("click", () => {
	colorWrapper.style.display = "grid";
	fetch(
		// `https://www.thecolorapi.com/scheme?hex=${randomHex()}&mode=${randomColorMode}&count=5&format=json`,
		`https://api.color.pizza/v1/?values=${randomHex()},${randomHex()},${randomHex()},${randomHex()},${randomHex()}&noduplicates=true`,
		{
			method: "GET",
			headers: {}
		}
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			colorizeContainers(data.colors);
			colorNamesLoop(data.colors);
			colorHexLoop(data.colors);
			copyHexListeners(data.colors);
			changeColor(data.colors);
		})
		.catch((err) => {
			console.error(err);
		});
});

// Functions
function colorizeContainers(colors) {
	color1.style.backgroundColor = colors[0].hex;
	color2.style.backgroundColor = colors[1].hex;
	color3.style.backgroundColor = colors[2].hex;
	color4.style.backgroundColor = colors[3].hex;
	color5.style.backgroundColor = colors[4].hex;
}

function colorNamesLoop(colors) {
	for (let i = 0; i < colorNames.length; i++) {
		colorNames[i].textContent = colors[i].name;
		colorNames[i].addEventListener("click", () => copyHex(colors[i].hex));
	}
}

function colorHexLoop(colors) {
	for (let i = 0; i < colorHexes.length; i++) {
		colorHexes[i].textContent = colors[i].hex;
		colorHexes[i].addEventListener("click", () => copyHex(colors[i].hex));
	}
}

function changeColor(colors) {
	root.style.setProperty("--jshover", colors[0].hex);
	root.style.setProperty(
		"--gradient",
		`linear-gradient(to bottom, ${colors[0].hex}, ${colors[1].hex})`
		// `radial-gradient(circle, ${colors[0].hex} 0%, ${colors[1].hex} 50%, ${colors[4].hex} 100%)`
	);
}

function copyHexListeners(colors) {
	color1.addEventListener("click", () => copyHex(colors[0].hex));
	color2.addEventListener("click", () => copyHex(colors[1].hex));
	color3.addEventListener("click", () => copyHex(colors[2].hex));
	color4.addEventListener("click", () => copyHex(colors[3].hex));
	color5.addEventListener("click", () => copyHex(colors[4].hex));
}

const copyHex = (hex) => {
	navigator.clipboard.writeText(hex);
	notification.style.display = "block";
	notification.textContent = "Copied to clipboard! 🎉";
	setTimeout(() => {
		notification.style.display = "none";
	}, 1500);
};
