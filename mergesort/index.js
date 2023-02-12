class App {
  init() {
    this.arr = []
    this.barContainer = document.querySelector('.bars')
    this.arrayRange = document.querySelector('.array-range')
    this.btnMergeSort = document.querySelector('.btn-merge-sort')
    this.pDataRangeValue = document.querySelector('.p-data-range-value')
    this.btnGenerateArray = document.querySelector('.btn-generate-array')
    this.allBtns = document.querySelectorAll('button')
    this.resetAll()
    this.configureAll()
  }
  resetAll() {
    this.arrayRange.value = 0
    this.barContainer.innerHTML = ''
    this.pDataRangeValue.innerHTML = ''
    this._disableAllBtns(true)
  }
  configureAll() {
    this.arrayRange.addEventListener('input', this._onRangeChange)
    this.btnMergeSort.addEventListener('click', this._onOrderByMerge)
    this.btnGenerateArray.addEventListener('click', this._onGenerateNewArray)
  }
  generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100))
  }

  generateBars(arr) {
    this.barContainer.innerHTML = ''
    arr.forEach((item) => {
      const bar = document.createElement('div')
      bar.classList.add('bg-danger')
      bar.classList.add('flex-grow-1')
      bar.classList.add('border')
      bar.classList.add('border-warning')
      bar.style.height = `${item}px`
      bar.style.width = `3px`
      // bar.dataset.index = i
      this.barContainer.appendChild(bar)
    })
  }

  _mergeSort = (arr) => {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = this._mergeSort(arr.slice(0, mid))
    const right = this._mergeSort(arr.slice(mid))
    return this._merge(left, right)
  }
  _onOrderByMerge = () => {
    this.arr = this._mergeSort(this.arr)
    this.generateBars(this.arr)
  }
  _onRangeChange = (e) => {
    if (e.target.value <= 0) this._disableAllBtns(true)
    else this._disableAllBtns(false)
    this.pDataRangeValue.innerText = `${this.arrayRange.value} Bars`
  }
  _onGenerateNewArray = () => {
    const arrayLength = this.arrayRange.value
    this.arr = this.generateRandomArray(arrayLength)
    this.generateBars(this.arr)
  }

  _merge = (arr1, arr2) => {
    // generateBars([...arr1, ...arr2])
    const sortedArray = []
    let pointer1 = 0
    let pointer2 = 0
    while (pointer1 < arr1.length && pointer2 < arr2.length) {
      // compare arr1[pointer1] and arr2[pointer2]
      if (arr1[pointer1] <= arr2[pointer2]) {
        // onTouch(pointer1)
        sortedArray.push(arr1[pointer1])
        pointer1++
      } else {
        sortedArray.push(arr2[pointer2])
        pointer2++
      }
    }

    // the rest of the elements
    while (pointer1 < arr1.length) {
      sortedArray.push(arr1[pointer1])
      pointer1++
    }
    while (pointer2 < arr2.length) {
      sortedArray.push(arr2[pointer2])
      pointer2++
    }

    return sortedArray
  }
  _disableAllBtns = (state) => {
    this.allBtns.forEach((btn) => (btn.disabled = state))
  }
}

const initializeApp = () => {
  const app = new App()
  app.init()
}
window.addEventListener('load', initializeApp)
