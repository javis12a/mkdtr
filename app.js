// Xử lý form điểm danh
document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    
    if (studentName) {
        appendDataToSheet(studentName);
    } else {
        document.getElementById('status').textContent = 'Vui lòng nhập tên học sinh!';
    }
});

// Hàm gửi dữ liệu tới Google Sheets
function appendDataToSheet(studentName) {
    const spreadsheetId = '140cp-uhl4fkaimTQqpzJ5gUDPtiBcxjjlMvH_NwdWxE';  // Thay YOUR_SPREADSHEET_ID bằng ID của Google Sheets
    const range = 'Sheet1!A:B';  // Vùng dữ liệu cần ghi
    const apiKey = 'AIzaSyDUsohSb0W-rxTFNAjdjQxhAUwridEylDE';  // Thay YOUR_API_KEY bằng API Key của bạn

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const data = {
        "values": [[studentName, new Date().toLocaleString()]]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.updates) {
            document.getElementById('status').textContent = 'Điểm danh thành công!';
            document.getElementById('status').style.color = 'green';
        } else {
            document.getElementById('status').textContent = 'Có lỗi xảy ra!';
            document.getElementById('status').style.color = 'red';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('status').textContent = 'Có lỗi xảy ra!';
        document.getElementById('status').style.color = 'red';
    });
}
