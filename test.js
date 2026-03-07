fetch('http://localhost:3000/api/generate-story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scenario: 'A brave squirrel', style: 'Warli' })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(console.error);
