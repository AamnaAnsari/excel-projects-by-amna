document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
       
        const tbody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; 
        
        jsonData.forEach((row, index) => {
            const newRow = tbody.insertRow();
            row.forEach((cell) => {
                const newCell = newRow.insertCell();
                newCell.textContent = cell;
            });
        });
    };

    reader.readAsArrayBuffer(file);
}
