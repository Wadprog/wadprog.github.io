class App {
  init() {
    this.arr = []
    this.barContainer = document.querySelector('.bars-container')
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
    this.arrayRange.addEventListener('mouseup', this._tooManyBars)
    this.btnMergeSort.addEventListener('click', this._onOrderByMerge)
    this.btnGenerateArray.addEventListener('click', this._onGenerateNewArray)
  }
  generateRandomArray(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100))
  }

  displayBars() {
    this.barContainer.innerHTML = ''
    this.bars.forEach((bar) => {
      this.barContainer.appendChild(bar)
    })
  }

  makeBars() {
    const length = this.arrayRange.value
    if (!length) throw new Error('Range is empty')
    this.bars = Array.from({ length }, (_, index) => {
      const bar = document.createElement('div')
      bar.classList.add('bar')
      const value = Math.floor(Math.random() * 100)
      bar.style.height = `${value}px`
      bar.dataset.originalPosition = index
      return bar
    })
  }

  generateBars(arr) {
    this.barContainer.innerHTML = ''
    arr.forEach((item) => {
      const bar = document.createElement('div')
      bar.classList.add('bar')
      bar.style.height = `${item}px`
      this.barContainer.appendChild(bar)
    })
  }

  _getElementValue = (element, value = 'height') => {
    let val = 0
    if (value === 'height') val = element.style[value].slice(0, -2)
    if (value.startsWith('data')) val = element.dataset[value.slice(4)]

    return Number(val)
  }
  _mergeSort = async (arr) => {
    this.displayBars()
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = await this._mergeSort(arr.slice(0, mid))
    const right = await this._mergeSort(arr.slice(mid))

    return new Promise((resolve) => {
      const comp = this._merge(left, right)

      setTimeout(() => {
        this.bars = comp

        resolve(comp)
      }, 100)
    })
  }
  _onOrderByMerge = async () => {
    try {
      this.bars = await this._mergeSort(this.bars)
      // console.log(this.bars)
      this.displayBars()
    } catch (error) {
      // console.log(error)
    }
    // this.generateBars(this.arr)
  }
  _onRangeChange = (e) => {
    this.makeBars()
    this.displayBars()
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
      if (
        this._getElementValue(arr1[pointer1]) <=
        this._getElementValue(arr2[pointer2])
      ) {
        const element = arr1[pointer1]
        element.classList.add('selected')
        setTimeout(() => {
          element.classList.remove('selected')
        }, this._getElementValue(element, 'dataoriginalPosition'))
        sortedArray.push(element)
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

  _tooManyBars = (e) => {
    document.querySelectorAll('.inactive').forEach((element) => {
      element.classList.remove('inactive')
    })
  }
}

const initializeApp = () => {
  const app = new App()
  app.init()
}
window.addEventListener('load', initializeApp)
