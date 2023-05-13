function calculate() {
    var registeredVoters = parseInt(document.getElementById("registeredVoters").innerText.replace(/\./g, ''));
    var invalidRate = document.getElementById("invalidRate").value / 100;
    var participationRate = document.getElementById("participationRate").value / 100;

    var voted = Math.round(registeredVoters * participationRate);
    var invalidVotes = Math.round(voted * invalidRate);
    var validVotes = voted - invalidVotes;

    document.getElementById("voted").innerText = numberWithCommas(voted);
    document.getElementById("invalidVotes").innerText = numberWithCommas(invalidVotes);
    document.getElementById("validVotes").innerText = numberWithCommas(validVotes);
    calculateCandidateVotes();
}

function calculateCandidateVotes() {
    var validVotes = parseInt(document.getElementById("validVotes").innerText.replace(/\./g, ''));
    var candidateRates = document.getElementsByClassName("candidateRate");
    var candidateVotes = document.getElementsByClassName("candidateVotes");

    var totalRate = 0;
    var totalVotes = 0;
    for (var i = 0; i < candidateRates.length; i++) {
        totalRate += parseFloat(candidateRates[i].value);
        var rate = candidateRates[i].value / 100;
        var votes = Math.round(validVotes * rate);
        candidateVotes[i].innerText = numberWithCommas(votes);
        totalVotes += votes;
    }

    if (totalRate > 100) {
        alert("Toplam oran %100'ü aşamaz!");
        return;
    }

    document.getElementById("totalRate").innerText = totalRate.toFixed(2) + "%";
    document.getElementById("totalVotes").innerText = numberWithCommas(totalVotes);
    drawChart();
}

function drawChart() {
    var candidateRate = document.getElementsByClassName("candidateRate");
    var voteData = [];
    for (var i = 0; i < candidateRate.length; i++) {
        voteData.push(parseFloat(candidateRate[i].value));
    }

    var ctx = document.getElementById('voteChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Recep Tayyip Erdoğan', 'Kemal Kılıçdaroğlu', 'Sinan Oğan', 'Muharrem İnce'],
            datasets: [{
                label: 'Oy Oranı',
                data: voteData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

window.onload = function () {
    var registeredVoters = document.getElementById("registeredVoters");
    registeredVoters.innerText = numberWithCommas(registeredVoters.innerText);
}

calculate()