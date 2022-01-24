let round = 0
let userSequence = []
let machineSequence = []

const sound1 = new Audio("sounds/1.mp3")
const sound2 = new Audio("sounds/2.mp3")
const sound3 = new Audio("sounds/3.mp3")
const sound4 = new Audio("sounds/4.mp3")

function updateStatus(status, typeAlert){
    const $statusText = document.querySelector("#status")
        $statusText.innerText = status
        $statusText.className = typeAlert
}

function reset(){
    round = 0
    userSequence = []
    machineSequence = []
}

function highlight($color){
    $color.style.opacity = 1
    if($color.id === "green"){
        sound1.play()
    }
    if($color.id === "red"){
        sound2.play()
    }
    if($color.id === "yellow"){
        sound3.play()
    }
    if($color.id === "blue"){
        sound4.play()
    }
    setTimeout(function(){
        $color.style.opacity = 0.5
    }, 250)
}

function blockUserClick(){
    document.querySelectorAll(".color").forEach(function($colors){
        $colors.onclick = function(){
            document.querySelector("#status").classList.add("trembles")
            setTimeout(function(){
                document.querySelector("#status").classList.remove("trembles")
            }, 175);
        }
    })
}

function unblockUserClick(){
    document.querySelectorAll(".color").forEach(function($colors){
        $colors.onclick = handleUserClicks
    })
}

function showMachineSequence(){
    blockUserClick()
    const $colors = document.querySelectorAll(".color")
    const machineColor = Math.floor(Math.random() * $colors.length)

    machineSequence.push($colors[machineColor])

    const userDelay = (machineSequence.length + 1) * 500

    machineSequence.forEach(function($color, index) {
        const msDelay = (index + 1) * 500;
        setTimeout(function() {
        highlight($color)
    }, msDelay)})

    setTimeout(function(){
        updateStatus("Ahora es tu turno de jugar. Suerte!", "alert alert-success")
        unblockUserClick()
    },userDelay)

    userSequence = []
    round++
    document.querySelector("#rounds").innerText = `Ronda Nº ${round}`
    if(round === 10){
        const $alertCongratulations = document.createElement("div")
        $alertCongratulations.className = "alert alert-warning alert-dismissible fade show"
        $alertCongratulations.setAttribute("role", "alert")
        const $textCongratulations = document.createElement("strong")
        $textCongratulations.innerText = "Felicidades! Has llegado a la ronda N°10!"
        const $buttonClose = document.createElement("button")
        $buttonClose.type = "button"
        $buttonClose.className = "btn-close"
        $buttonClose.setAttribute("data-bs-dismiss", "alert")
        $buttonClose.setAttribute("aria-label", "Close")
        $alertCongratulations.appendChild($textCongratulations)
        $alertCongratulations.appendChild($buttonClose)
        const $containerInterface = document.querySelector("#container-interface")
        $containerInterface.appendChild($alertCongratulations)
        $buttonClose.onclick = function(){
            $containerInterface.removeChild($alertCongratulations)
        }
        setTimeout(function(){
            if($alertCongratulations.parentNode === $containerInterface){
                $containerInterface.removeChild($alertCongratulations)
            }
        }, 5000);
    }

    if(round === 20){
        const $alertCongratulations = document.createElement("div")
        $alertCongratulations.className = "alert alert-warning alert-dismissible fade show"
        $alertCongratulations.setAttribute("role", "alert")
        const $textCongratulations = document.createElement("strong")
        $textCongratulations.innerText = "Felicidades! Has llegado a la ronda N°20, pocos llegan hasta aqui."
        const $buttonClose = document.createElement("button")
        $buttonClose.type = "button"
        $buttonClose.className = "btn-close"
        $buttonClose.setAttribute("data-bs-dismiss", "alert")
        $buttonClose.setAttribute("aria-label", "Close")
        $alertCongratulations.appendChild($textCongratulations)
        $alertCongratulations.appendChild($buttonClose)
        const $containerInterface = document.querySelector("#container-interface")
        $containerInterface.appendChild($alertCongratulations)
        $buttonClose.onclick = function(){
            $containerInterface.removeChild($alertCongratulations)
        }
    }

    if(round === 30){
        const $alertCongratulations = document.createElement("div")
        $alertCongratulations.className = "alert alert-warning alert-dismissible fade show"
        $alertCongratulations.setAttribute("role", "alert")
        const $textCongratulations = document.createElement("strong")
        $textCongratulations.innerText = "Felicidades! Has llegado a la ronda N°30! Nos vemos en la N°50😁"
        const $buttonClose = document.createElement("button")
        $buttonClose.type = "button"
        $buttonClose.className = "btn-close"
        $buttonClose.setAttribute("data-bs-dismiss", "alert")
        $buttonClose.setAttribute("aria-label", "Close")
        $alertCongratulations.appendChild($textCongratulations)
        $alertCongratulations.appendChild($buttonClose)
        const $containerInterface = document.querySelector("#container-interface")
        $containerInterface.appendChild($alertCongratulations)
        $buttonClose.onclick = function(){
            $containerInterface.removeChild($alertCongratulations)
        }
    }

}

function lose(){
    updateStatus(`Has perdido! Toca "Empezar" para jugar devuelta.`, "alert alert-danger")
    document.querySelector("#status").classList.add("trembles")
    setTimeout(function(){
        document.querySelector("#status").classList.remove("trembles")
    }, 175);
    blockUserClick()
    reset()
}

function handleUserClicks(e){
    const $color = e.target
    highlight($color)
    userSequence.push($color)

    const $machineColor = machineSequence[userSequence.length - 1]

    if($color.id !== $machineColor.id){
        lose()
        return
    }

    if(userSequence.length === machineSequence.length){
        setTimeout(function(){
            blockUserClick()
            handleRound()
        }, 1000)
    }
}

function handleRound(){
    updateStatus("Atencion! Es el turno de la maquina.", "alert alert-warning")
    showMachineSequence()
}

function startGame(){
    reset()
    handleRound()
}

document.querySelector("#start-button").onclick = function(){
    startGame()
}
