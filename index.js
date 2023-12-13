let container = document.querySelector(".container");
let btns = document.querySelectorAll(".btn");

// ***************************************** <  adding array element to container > ***********************************************
let i = 0;
let arr = [5, 10, 15, 25, 20, 35, 30, 40, 45, 50, 55, 60, 65, 70];
let shuffleArraay = shuffleArray(arr);
shuffleArraay.forEach((element) => {
	let box = document.createElement("div");
	box.style.height = `${element * 6}px`;
	box.style.width = `2rem`;
	box.style.backgroundColor = `rgb(${Math.floor(
		Math.random() * 255
	)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
	box.setAttribute("id", `element${i}`);
	i++;
	box.innerHTML = element;
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

btns[5].addEventListener("click", () => {
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
		box.innerHTML = element;
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
				let temp2 = arr[j].innerHTML;
				arr[j].style.height = arr[j + 1].style.height;
				arr[j].innerHTML = arr[j + 1].innerHTML;
				arr[j + 1].style.height = temp;
				arr[j + 1].innerHTML = temp2;
				isSorted = false;
			}
			await new Promise((resolve) => setTimeout(resolve, 500));
			arr[j].classList.remove("swap-animation");
			arr[j + 1].classList.remove("swap-animation");
		}
		if (isSorted) {
			break;
		}
	}
}

btns[0].addEventListener("click", () => {
	bubbleSort();
});

// ***************************************** < Selection sort > ***********************************************
async function selectionSort() {
	let arr = document.querySelectorAll(".container div");
	for (let i = 0; i < arr.length - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < arr.length; j++) {
			arr[j].classList.add("swap-animation");
			if (
				parseInt(arr[j].style.height) < parseInt(arr[minIndex].style.height)
			) {
				minIndex = j;
			}
			await new Promise((resolve) => setTimeout(resolve, 500));
			arr[j].classList.remove("swap-animation");
		}
		if (minIndex !== i) {
			let temp = arr[i].style.height;
			let temp2 = arr[i].innerHTML;
			arr[i].style.height = arr[minIndex].style.height;
			arr[i].innerHTML = arr[minIndex].innerHTML;
			arr[minIndex].style.height = temp;
			arr[minIndex].innerHTML = temp2;
		}
	}
}

btns[1].addEventListener("click", () => {
	selectionSort();
});

// ***************************************** < Merge sort > ***********************************************
async function mergeSort() {
	let arr = document.querySelectorAll(".container div");
	let sortedArray = await mergeSortHelper(arr);
	for (let i = 0; i < arr.length; i++) {
		arr[i].classList.add("swap-animation");
		arr[i].style.height = sortedArray[i].style.height;
		arr[i].innerHTML = sortedArray[i].innerHTML;
		await new Promise((resolve) => setTimeout(resolve, 500));
		arr[i].classList.remove("swap-animation");
	}
}

async function mergeSortHelper(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	const mid = Math.floor(arr.length / 2);
	const left = await mergeSortHelper(arr.slice(0, mid));
	const right = await mergeSortHelper(arr.slice(mid));
	return merge(left, right);
}

function merge(left, right) {
	let merged = [];
	let leftIndex = 0;
	let rightIndex = 0;
	while (leftIndex < left.length && rightIndex < right.length) {
		if (
			parseInt(left[leftIndex].style.height) <
			parseInt(right[rightIndex].style.height)
		) {
			merged.push(left[leftIndex]);
			leftIndex++;
		} else {
			merged.push(right[rightIndex]);
			rightIndex++;
		}
	}
	return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

btns[2].addEventListener("click", () => {
	mergeSort();
});
// ***************************************** < Quick sort > ***********************************************
async function quickSort() {
	let arr = document.querySelectorAll(".container div");
	await quickSortHelper(arr, 0, arr.length - 1);
	for (let i = 0; i < arr.length; i++) {
		arr[i].classList.add("swap-animation");
		await new Promise((resolve) => setTimeout(resolve, 500));
		arr[i].classList.remove("swap-animation");
	}
}

async function quickSortHelper(arr, low, high) {
	if (low < high) {
		let pivotIndex = await partition(arr, low, high);
		await quickSortHelper(arr, low, pivotIndex - 1);
		await quickSortHelper(arr, pivotIndex + 1, high);
	}
}

async function partition(arr, low, high) {
	let pivot = parseInt(arr[high].style.height);
	let i = low - 1;
	for (let j = low; j < high; j++) {
		arr[j].classList.add("swap-animation");
		if (parseInt(arr[j].style.height) <= pivot) {
			i++;
			await swap(arr, i, j);
		}
		await new Promise((resolve) => setTimeout(resolve, 500));
		arr[j].classList.remove("swap-animation");
	}
	await swap(arr, i + 1, high);
	return i + 1;
}

async function swap(arr, i, j) {
	let temp = arr[i].style.height;
	let temp2 = arr[i].innerHTML;
	arr[i].style.height = arr[j].style.height;
	arr[i].innerHTML = arr[j].innerHTML;
	arr[j].style.height = temp;
	arr[j].innerHTML = temp2;
}

btns[3].addEventListener("click", () => {
	quickSort();
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
		let temp2 = arr[0].innerHTML;
		arr[0].style.height = arr[i].style.height;
		arr[0].innerHTML = arr[i].innerHTML;
		arr[i].style.height = temp;
		arr[i].innerHTML = temp2;

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
		let temp2 = arr[i].innerHTML;
		arr[i].innerHTML = arr[largest].innerHTML;
		arr[largest].innerHTML = temp2;
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

btns[4].addEventListener("click", () => {
	heapSort();
});
