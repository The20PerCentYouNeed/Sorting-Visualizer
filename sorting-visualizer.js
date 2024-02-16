window.onload = generateNewArray;
let elementMain = document.getElementsByTagName("main");
elementMain = elementMain[0];
let changeMainGap = elementMain.style.gap;
let rangeInput = document.getElementById("changeSizeSpeed");
let newArray = document.getElementById("newArray");
let divsCollection = document.getElementsByClassName("array-element");
let mergeSortButton = document.getElementById("mergeSort");
let quickSortButton = document.getElementById("quickSort");
let heapSortButton = document.getElementById("heapSort");
let bubbleSortButton = document.getElementById("bubbleSort");
let sort = document.getElementById("sort");
let labelText = document.querySelector('label[for="changeSizeSpeed"]');
let selectedSort = null;

const callback = () => {
    sort.addEventListener('click', startSorting);
    newArray.addEventListener('click', generateNewArray);
    rangeInput.addEventListener("input", generateNewArray);
    sort.removeAttribute('style');
    newArray.removeAttribute('style');
    rangeInput.removeAttribute('style');
    labelText.removeAttribute('style');
    rangeInput.disabled = false;
    sort.style.visibility = "visible";
}

function disableButtons() {
    sort.removeEventListener('click', startSorting);
    newArray.removeEventListener('click', generateNewArray);
    rangeInput.removeEventListener("input", generateNewArray);
    rangeInput.disabled = true;
    sort.style.color = "#d61d1d";
    sort.style.cursor = "default";
    rangeInput.style.backgroundColor = "#d61d1d";
    rangeInput.style.border =  "1px solid white";
    rangeInput.style.cursor = "default";
    newArray.style.color = "#d61d1d";
    newArray.style.cursor = "default";
    labelText.style.color = "#d61d1d";
    void sort.offsetHeight;
}

function startSorting() {
    if (selectedSort) {
        disableButtons();
        console.log("Refreshed");
        selectedSort(callback);
    } else {
        console.log("Please select a sorting method!");
    }
}

function randomNumber(){
    return Math.floor(Math.random() * 197 + 4);
}

function generateNewArray() {
    let selectedValue = rangeInput.value;
    let stringOfDivs = "";
    let barHeight = 0;
    selectedValue = Number(selectedValue) + 4;
    let idCount = 0;

    for (let i = 0; i < selectedValue; i++) {
        barHeight = randomNumber();
        stringOfDivs += `<div class='array-element' id='${idCount++}' style='height: ${barHeight * 3.5 + 11}px;'>${barHeight}</div>`;
    }

    elementMain.innerHTML = stringOfDivs;
    setStyles(selectedValue);
};

function setStyles(value) {
    let fontSize = 0;
    let gap;
    let arrayOfDivs = [];

    if (value < 10) {
        fontSize = 22;
        gap = '12px';
    } else if (value < 20) {
        fontSize = 16;
        gap = '10px';
    } else if (value < 30) {
        fontSize = 12;
        gap = '6px';
    } else if (value < 40) {
        gap = '6px';
    } else if (value < 60) {
        gap = '5px';
    } else if (value < 80){
        gap = '4px';
    } else if(value < 100) {
        gap = '3px';
    } else {
        gap = '2px';
    }

    elementMain.style.gap = gap;
    arrayOfDivs = Array.from(divsCollection);
    arrayOfDivs.forEach((element) => {
        element.style.fontSize = fontSize + "px";
      });
}

function mergeSort(callback) {
    const tempArr = Array.from(divsCollection);

    function delay(ms) {
        let timeOut = setSpeed();
        return new Promise(resolve => {
            setTimeout(resolve,timeOut * ms);
        });
    }
    async function merge(left, right) {
        const mergedArray = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            left[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            right[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            await delay(2);

            if (parseInt(left[i].innerHTML) < parseInt(right[j].innerHTML)) {
                left[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(left[i++]);
                await delay(1);
                
            } else {
                left[i].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                right[j].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                await delay(1);
                right[j].remove();
                left[i].parentNode.insertBefore(right[j], left[i]);
                await delay(0.5);
                left[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                right[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                await delay(1);
                left[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                right[j].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(right[j++]);
                await delay(1);
            }

        }

        if (i != left.length) {
            for (let k = i; k < left.length; k++) {
                left[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(left[k]);
            }
        }
        if (j != right.length) {
            for (let k = j; k < right.length; k++) {
                right[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(right[k]);
            }
        }
        return mergedArray;
        
    }
    function delayedMergeSort(arr, low, high) {
        if (high - low <= 0) {
            return Promise.resolve([arr[high]]);
        }
    
        let middle = Math.floor((low + high) / 2);
    
        return delayedMergeSort(arr, low, middle)
        .then(left => delayedMergeSort(arr, middle + 1, high)
            .then(right => merge(left, right)));
    }


    const testArr = delayedMergeSort(tempArr, 0, tempArr.length - 1);
    
    callback();
}
    // GREEN
    // left[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
    // right[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";

    // RED
    // left[i].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
    // right[j].style.backgroundColor = "rgba(219, 57, 57, 0.8)";

    // BLUE
    // left[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
    // right[j].style.backgroundColor = "rgba(66, 134, 244, 0.8)";

    // function delayedMergeSort(arr, low, high) {

    //     if (high - low <= 0) {
    //         return [arr[high]];
    //     }

    //     let middle = Math.floor((low + high) / 2);

    //     let left = delayedMergeSort(arr, low, middle);
    //     let right = delayedMergeSort(arr, middle + 1, high);
        
    //     return merge(left, right);
        
    // }

function quickSort(callback) {
    const divsArr = Array.from(divsCollection);

    function delay(ms) {
        let timeOut = setSpeed();
        return new Promise(resolve => {
            setTimeout(resolve,timeOut * ms);
        });
    }

    function delayedQuickSort(arr, low, right) {
        if (low >= right) {
            return;
        }
        pivotIndex = partition(arr, low, right);
        
        delayedQuickSort(arr, low, pivotIndex - 1);
        delayedQuickSort(arr, pivotIndex + 1, right);
    }

    function partition(arr, low, right) {
        let i = low - 1;
        pivot = arr[right];
        let divStyles;

        for (let j = low; j < right; j++) {
            if (parseInt(arr[j].innerHTML) < parseInt(pivot.innerHTML)) {
                i++;
                divStyles = arr[i].style.cssText;
                arr[i].style.cssText = arr[j].style.cssText;
                arr[j].style.cssText = divStyles;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                
            }
        }
        divStyles = arr[i + 1].style.cssText;
        arr[i + 1].style.cssText = arr[right].style.cssText;
        arr[right].style.cssText = divStyles;
        [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
        return i + 1;
    }

    
    delayedQuickSort(divsArr, 0, divsArr.length - 1);
    divsArr.forEach(el => console.log(el));
    // elementMain.innerHTML = divsArr.map(el => el.outerHTML).join("");
    console.log(divsArr[0].style.cssText);
    callback();
}

function heapSort(callback) {
    console.log("Heap Sort has started!");
    setTimeout(function() {
        console.log("......");
    }, 2000);
    setTimeout(function() {
        console.log("Heap Sort Finished");
    }, 3000);
    setTimeout(function () {
        callback();
    }, 4000);
}

function setSpeed() {
    let rangeValue = rangeInput.value;
    let speed = 0;

    if (rangeValue < 15) {
        speed = 400;
    } else if (rangeValue < 30) {
        speed = 40;
    } else if (rangeValue < 45) {
        speed = 30;
    } else if (rangeValue < 60) {
        speed = 20;
    } else if (rangeValue < 75) {
        speed = 10;
    } else if (rangeValue < 90) {
        speed = 5;
    } else if (rangeValue < 105) {
        speed = 4;
    } else if (rangeValue < 120) {
        speed = 3;
    } else if (rangeValue < 135) {
        speed = 2;
    } else {
        speed = 1;
    }

    return speed;
}

function bubbleSort(callback) {
    let temp1 = 0;
    let temp2 = 0;
    let timeOut = setSpeed();
    console.log(timeOut);
    function delayedBubbleSort(i, j) {
        if (i < divsCollection.length - 1) {
            if (j < divsCollection.length - i -1) {
                setTimeout(function() {
                    if (j > 0) {
                        divsCollection[j - 1].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                    }
                    divsCollection[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                    divsCollection[j + 1].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                }, timeOut);
                if (parseInt(divsCollection[j].innerHTML) > parseInt(divsCollection[j + 1].innerHTML)) {
                    setTimeout(function() {
                        divsCollection[j].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                        divsCollection[j + 1].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                    }, timeOut * 1.8);
                    setTimeout(function() {
                        temp1 = divsCollection[j].innerHTML;
                        divsCollection[j].innerHTML = divsCollection[j + 1].innerHTML;
                        divsCollection[j + 1].innerHTML = temp1;
                        temp2 = divsCollection[j].offsetHeight;
                        divsCollection[j].style.height = divsCollection[j + 1].offsetHeight.toString() + "px";
                        divsCollection[j + 1].style.height = temp2.toString() + "px";
                    },timeOut * 2.3);
                    setTimeout(function() {
                        divsCollection[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                        divsCollection[j + 1].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                    }, timeOut * 3);
                    setTimeout(function() {
                        delayedBubbleSort(i, j + 1);
                    }, timeOut * 3.5);
                } else {
                    setTimeout(function() {
                        delayedBubbleSort(i, j + 1);
                    }, timeOut * 1.5);
                }

            } else {
                setTimeout(function() {
                    divsCollection[j - 1].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                    divsCollection[j].style.backgroundColor = "rgb(241, 94, 255)";
                    delayedBubbleSort(i + 1, 0);
                }, timeOut);
            }
        } else {
            callback()
        }
    }

    delayedBubbleSort(0, 0);
}

mergeSortButton.addEventListener("click", function() {
    mergeSortButton.style.color = "#f25eff";
    quickSortButton.removeAttribute('style');
    heapSortButton.removeAttribute('style');
    bubbleSortButton.removeAttribute('style');
    sort.style.visibility = "visible";
    selectedSort = mergeSort;
});
quickSortButton.addEventListener("click", function() {
    quickSortButton.style.color = "#f25eff";
    mergeSortButton.removeAttribute('style');
    heapSortButton.removeAttribute('style');
    bubbleSortButton.removeAttribute('style');
    sort.style.visibility = "visible";
    selectedSort = quickSort;
});
heapSortButton.addEventListener("click", function() {
    heapSortButton.style.color = "#f25eff";
    bubbleSortButton.removeAttribute('style');
    quickSortButton.removeAttribute('style');
    mergeSortButton.removeAttribute('style');
    sort.style.visibility = "visible";
    selectedSort = heapSort;
});
bubbleSortButton.addEventListener("click", function() {
    bubbleSortButton.style.color = "#f25eff";
    quickSortButton.removeAttribute('style');
    mergeSortButton.removeAttribute('style');
    heapSortButton.removeAttribute('style');
    sort.style.visibility = "visible";
    selectedSort = bubbleSort;
});

sort.addEventListener('click', startSorting);
newArray.addEventListener("click", generateNewArray);
rangeInput.addEventListener("input", generateNewArray);

