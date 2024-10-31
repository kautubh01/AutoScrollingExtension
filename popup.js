// Coded by Raman Choudhary

let isRunning = false
let scrollSpeed = 1;
let TASK = null;

document.addEventListener('DOMContentLoaded', function() {
  renderSpeed(scrollSpeed)
  const $startButton = document.getElementById("startBtn")
  const $speedRange = document.getElementById("speedRange")
  $speedRange.addEventListener("input", (event) => {
    scrollSpeed = event.target.value
    renderSpeed(scrollSpeed)
  })

  $startButton.addEventListener("click", () => {
    if(isRunning) {
      $startButton.innerHTML = "START"
      stopScrolling()
    } else {
      $startButton.innerHTML = "STOP"
      keepScrolling()
    }
  })
})

const renderSpeed = (speed) => {
  const $speedText =  document.getElementById("speedText")
  $speedText.innerHTML = `${speed}px`
}

const keepScrolling = () => {
  TASK = setInterval(() => {
    chrome.tabs.getSelected(null, (tab) => {
      chrome.tabs.executeScript(tab.id, {
        code: generateCode()
      });
    })
  }, 10)
}

const stopScrolling = () => {
  clearInterval(TASK)
}

const generateCode = () => (
  `
  window.scrollTo({
    top: window.scrollY + ${scrollSpeed},
    behavior: 'smooth'
  });
  `
)
