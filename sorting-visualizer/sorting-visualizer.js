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

async function mergeSort(callback) {
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
            if (left.length + right.length === tempArr.length) {
                mergedArray[mergedArray.length - 1].style.backgroundColor = "rgb(241, 94, 255)";
            }

        }

        if (i != left.length) {
            for (let k = i; k < left.length; k++) {
                left[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(left[k]);
                if (left.length + right.length === tempArr.length) {
                    mergedArray[mergedArray.length - 1].style.backgroundColor = "rgb(241, 94, 255)";
                }
            }
        }
        if (j != right.length) {
            for (let k = j; k < right.length; k++) {
                right[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                mergedArray.push(right[k]);
                if (left.length + right.length === tempArr.length) {
                    mergedArray[mergedArray.length - 1].style.backgroundColor = "rgb(241, 94, 255)";
                }
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


    await delayedMergeSort(tempArr, 0, tempArr.length - 1);
    tempArr.map(div => div.style.backgroundColor = "rgba(78, 216, 96, 0.8)");
    setTimeout(function() {
        tempArr.map(div => div.style.backgroundColor = "rgb(241, 94, 255)");
    }, 800);

    setTimeout(callback, 801);
    
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

async function quickSort(callback) {
    const divsArr = Array.from(divsCollection);

    function delay(ms) {
        let timeOut = setSpeed();
        return new Promise(resolve => {
            setTimeout(resolve,timeOut * ms);
        });
    }

    async function delayedQuickSort(arr, low, right) {
        if (low >= right) {
            try {
                arr[low].style.backgroundColor = "rgb(241, 94, 255)";
            } catch (error) {
                console.log(error);
            }
            return Promise.resolve();
            // return;
        }
        pivotIndex = await partition(arr, low, right);
        
        // delayedQuickSort(arr, low, pivotIndex - 1);
        // delayedQuickSort(arr, pivotIndex + 1, right);
        return delayedQuickSort(arr, low, pivotIndex - 1)
        .then(() => delayedQuickSort(arr, pivotIndex + 1, right));
    }

    async function partition(arr, low, right) {
        let i = low;
        pivot = arr[low];
        pivot.style.backgroundColor = "rgb(255,255,0)";

        for (let j = right; j > i; j--) {
            arr[i + 1].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            await delay(2);
            if (parseInt(arr[j].innerHTML) < parseInt(pivot.innerHTML)) {
                i++;
                
                let k;
                for (k = i; k < j; k++) {
                    arr[k].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                    arr[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                    await delay (1);
                    if (parseInt(arr[k].innerHTML) > parseInt(pivot.innerHTML)) {

                        // swap code
                        arr[k].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                        arr[j].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                        await delay(2);

                        const style1 = arr[k].style.cssText;
                        const style2 = arr[j].style.cssText;
                        const innerHTML1 = arr[k].innerHTML;
                        const innerHTML2 = arr[j].innerHTML;
                        [arr[k].style.cssText, arr[j].style.cssText] = [style2, style1];
                        [arr[k].innerHTML, arr[j].innerHTML] = [innerHTML2, innerHTML1];
                        await delay(1);
                        
                        arr[k].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                        arr[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                        await delay(1.2);

                        arr[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                        arr[j].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                        await delay(1);
                        break;
                    }
                    arr[k].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                    await delay(1);
                }
                i = k;

            }
            arr[j].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            await delay(1);
        }


        arr[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
        pivot.style.backgroundColor = "rgba(78, 216, 96, 0.8)";
        await delay(1);

        arr[i].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
        pivot.style.backgroundColor = "rgba(219, 57, 57, 0.8)";
        await delay(2);
        // Restore CSS styles and innerHTML of the pivot element
        const pivotStyle = arr[i].style.cssText;
        const pivotInnerHTML = arr[i].innerHTML;
        arr[i].style.cssText = pivot.style.cssText;
        arr[i].innerHTML = pivot.innerHTML;
        pivot.style.cssText = pivotStyle;
        pivot.innerHTML = pivotInnerHTML;

        arr[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
        pivot.style.backgroundColor = "rgba(78, 216, 96, 0.8)";
        await delay(1.2);

        arr[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
        pivot.style.backgroundColor = "rgba(66, 134, 244, 0.8)";
        await delay(1);

        arr[i].style.backgroundColor = "rgb(241, 94, 255)";

        // if (right - low === 2) {
        //     arr[i].style.backgroundColor = "rgb(241, 94, 255)";
        //     pivot.style.backgroundColor = "rgb(241, 94, 255)";
        //     return i;
        // }
        
        return i;
    }

    await delayedQuickSort(divsArr, 0, divsArr.length - 1);
    divsArr.map(div => div.style.backgroundColor = "rgba(78, 216, 96, 0.8)");
    setTimeout(function() {
        divsArr.map(div => div.style.backgroundColor = "rgb(241, 94, 255)");
    }, 800);

    setTimeout(callback, 801);
}

async function heapSort(callback) {
    const heapArr = Array.from(divsCollection);
    let heapSize;

    function delay(ms) {
        let timeOut = setSpeed();
        return new Promise(resolve => {
            setTimeout(resolve,timeOut * ms);
        });
    }
    
    async function maxHeapify(arr, i) {
        let max = i;
        let leftChild = 2 * i + 1;
        let rightChild = 2 * i + 2;
        if (leftChild < heapSize && rightChild < heapSize) {
            arr[max].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[leftChild].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[rightChild].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
        }
        
        if (leftChild < heapSize && parseInt(arr[leftChild].innerHTML) > parseInt(arr[max].innerHTML)) {
            max = leftChild;
        } 
        if (rightChild < heapSize && parseInt(arr[rightChild].innerHTML) > parseInt(arr[max].innerHTML)) {
            max = rightChild;
        }
        await delay(1);
        
        if (max != i) {
            arr[max].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
            arr[i].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
            await delay(1);

            // restore CSS
            const style1 = arr[i].style.cssText;
            const style2 = arr[max].style.cssText;
            const innerHTML1 = arr[i].innerHTML;
            const innerHTML2 = arr[max].innerHTML;
            [arr[i].style.cssText, arr[max].style.cssText] = [style2, style1];
            [arr[i].innerHTML, arr[max].innerHTML] = [innerHTML2, innerHTML1];
            await delay(1);

            arr[max].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            await delay(1);

            arr[max].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            arr[i].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            if (leftChild < heapSize) {
                arr[leftChild].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            }
            if (rightChild < heapSize) {
                arr[rightChild].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            }
            await delay(0.7);

            await maxHeapify(arr, max);
        }
        
        if (leftChild < heapSize && rightChild < heapSize) {
            arr[max].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            arr[leftChild].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            arr[rightChild].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
        }
        await delay(0.2);
    }    

    async function buildMaxHeap(arr) {
        for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
            await maxHeapify(arr, i);
        }
    }

    async function heapSortStart(arr) {
        heapSize = arr.length;
        await buildMaxHeap(arr);
        for (let i = arr.length - 1; i >= 1; i--) {
            arr[0].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            await delay(1);

            arr[0].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
            arr[i].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
            await delay(1);

            const style1 = arr[0].style.cssText;
            const style2 = arr[i].style.cssText;
            const innerHTML1 = arr[0].innerHTML;
            const innerHTML2 = arr[i].innerHTML;
            [arr[0].style.cssText, arr[i].style.cssText] = [style2, style1];
            [arr[0].innerHTML, arr[i].innerHTML] = [innerHTML2, innerHTML1];
            await delay(1);

            arr[0].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            arr[i].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
            await delay(1);
            
            arr[0].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
            arr[i].style.backgroundColor = "rgb(241, 94, 255)";
            heapSize--;
            await delay(1);
            await maxHeapify(arr, 0);
        }
        arr[0].style.backgroundColor = "rgb(241, 94, 255)";
    }
    await heapSortStart(heapArr);
    heapArr.map(div => div.style.backgroundColor = "rgba(78, 216, 96, 0.8)");
    setTimeout(function() {
        heapArr.map(div => div.style.backgroundColor = "rgb(241, 94, 255)");
    }, 800);

    setTimeout(callback, 801);
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
    const divsArr = Array.from(divsCollection);
    let temp1 = 0;
    let temp2 = 0;
    let timeOut = setSpeed();
    console.log(timeOut);
    function delayedBubbleSort(i, j) {
        if (i < divsArr.length - 1) {
            if (j < divsArr.length - i -1) {
                setTimeout(function() {
                    if (j > 0) {
                        divsArr[j - 1].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                    }
                    divsArr[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                    divsArr[j + 1].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                }, timeOut);
                if (parseInt(divsArr[j].innerHTML) > parseInt(divsArr[j + 1].innerHTML)) {
                    setTimeout(function() {
                        divsArr[j].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                        divsArr[j + 1].style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                    }, timeOut * 1.8);
                    setTimeout(function() {
                        temp1 = divsArr[j].innerHTML;
                        divsArr[j].innerHTML = divsArr[j + 1].innerHTML;
                        divsArr[j + 1].innerHTML = temp1;
                        temp2 = divsArr[j].offsetHeight;
                        divsArr[j].style.height = divsArr[j + 1].offsetHeight.toString() + "px";
                        divsArr[j + 1].style.height = temp2.toString() + "px";
                    },timeOut * 2.3);
                    setTimeout(function() {
                        divsArr[j].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                        divsArr[j + 1].style.backgroundColor = "rgba(78, 216, 96, 0.8)";
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
                    divsArr[j - 1].style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                    divsArr[j].style.backgroundColor = "rgb(241, 94, 255)";
                    delayedBubbleSort(i + 1, 0);
                }, timeOut);
            }
        } else {
            divsArr.map(div => div.style.backgroundColor = "rgba(78, 216, 96, 0.8)");
            setTimeout(function() {
                divsArr.map(div => div.style.backgroundColor = "rgb(241, 94, 255)");
            }, 800);
        
            setTimeout(callback, 801);
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