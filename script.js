function lookupCallSign() {
    const callSign = document.getElementById('callsignInput').value;

    fetch(`https://callook.info/${callSign}/json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayResult(data))
        .catch(error => {
            console.log('Error:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>There was an error while fetching data. Please try again later.</p>`;
        });
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.status === 'INVALID') {
        resultDiv.innerHTML = `<p>No results found for the provided call sign.</p>`;
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Call Sign</th>
                <td>${data.callsign}</td>
            </tr>
            <tr>
                <th>First Name</th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>License Class</th>
                <td>${data.type}</td>
            </tr>
            <tr>
                <th>Trustee</th>
                <td>${data.trustee}</td>
            </tr>
        `;
        resultDiv.appendChild(table);
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}


