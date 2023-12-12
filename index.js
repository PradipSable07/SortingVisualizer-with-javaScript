let arr = [5, 10, 15, 25, 20, 35, 30, 40, 45, 50, 55, 60, 65, 70];

let container = document.querySelector(".container");
let btns = document.querySelectorAll(".btn");

// ***************************************** <  adding array element to container > ***********************************************
let i = 0;
arr.forEach((element) => {
	let box = document.createElement("div");
	box.style.height = `${element * 6}px`;
	box.style.width = `2rem`;
	box.style.backgroundColor = `rgb(${Math.floor(
		Math.random() * 255
	)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
	box.setAttribute("id", `element${i}`);
	i++;
	container.appendChild(box);
});
// ***************************************** <  Generate random array element to container > ***********************************************
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

btns[6].addEventListener("click", () => {
	arr = shuffleArray(arr);
	let i = 0;
	container.innerHTML = "";
	arr.forEach((element) => {
		let box = document.createElement("div");
		box.style.height = `${element * 6}px`;
		box.style.width = `2rem`;
		box.style.backgroundColor = `rgb(${Math.floor(
			Math.random() * 255
		)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
			Math.random() * 255
		)})`;
		box.setAttribute("id", `element${i}`);
		i++;
		container.appendChild(box);
	});
});

// ***************************************** < Bubble sort > ***********************************************

async function bubbleSort() {
	let arr = document.querySelectorAll(".container div");
	let isSorted = false;
	for (let i = 0; i < arr.length && !isSorted; i++) {
		isSorted = true;
		for (let j = 0; j < arr.length - i - 1; j++) {
			arr[j].classList.add("swap-animation");
			arr[j + 1].classList.add("swap-animation");

			if (parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)) {
				let temp = arr[j].style.height;
				arr[j].style.height = arr[j + 1].style.height;
				arr[j + 1].style.height = temp;
				isSorted = false;
			}
			await new Promise((resolve) => setTimeout(resolve, 500));
			arr[j].classList.remove("swap-animation");
			arr[j + 1].classList.remove("swap-animation");
		}
	}
}

btns[0].addEventListener("click", () => {
	bubbleSort();
});

// ***************************************** < Heap sort > ***********************************************
async function heapSort() {
	let arr = document.querySelectorAll(".container div");
	let n = arr.length;

	// Build max heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		await heapify(arr, n, i);
	}

	// Extract elements from the heap one by one
	for (let i = n - 1; i > 0; i--) {
		// Move current root to end
		let temp = arr[0].style.height;
		arr[0].style.height = arr[i].style.height;
		arr[i].style.height = temp;

		// Add animation class to visualize the swapping
		arr[0].classList.add("swap-animation");
		arr[i].classList.add("swap-animation");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Remove animation class
		arr[0].classList.remove("swap-animation");
		arr[i].classList.remove("swap-animation");

		await heapify(arr, i, 0);
	}
}

async function heapify(arr, n, i) {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	if (
		left < n &&
		parseInt(arr[left].style.height) > parseInt(arr[largest].style.height)
	) {
		largest = left;
	}

	if (
		right < n &&
		parseInt(arr[right].style.height) > parseInt(arr[largest].style.height)
	) {
		largest = right;
	}

	if (largest !== i) {
		let temp = arr[i].style.height;
		arr[i].style.height = arr[largest].style.height;
		arr[largest].style.height = temp;

		// Add animation class to visualize the swapping
		arr[i].classList.add("swap-animation");
		arr[largest].classList.add("swap-animation");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Remove animation class
		arr[i].classList.remove("swap-animation");
		arr[largest].classList.remove("swap-animation");

		await heapify(arr, n, largest);
	}
}

btns[5].addEventListener("click", () => {
	heapSort();
});
