# Google Sheets Waitlist Setup Guide

## Bước 1: Tạo Google Sheet

1. Vào https://sheets.google.com và tạo spreadsheet mới
2. Đặt tên: "PresentationCoach Waitlist"
3. Tạo header row:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, click **Extensions** > **Apps Script**
2. Xóa code mặc định, paste code này vào:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append new row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (icon đĩa mềm) và đặt tên project: "Waitlist Webhook"

## Bước 3: Deploy Web App

1. Click **Deploy** > **New deployment**
2. Click icon ⚙️ bên cạnh "Select type"
3. Chọn **Web app**
4. Cấu hình:
   - **Description**: "Waitlist webhook"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** và chọn Google account của bạn
7. Click **Advanced** > **Go to [project name] (unsafe)** > **Allow**
8. Copy **Web app URL** (dạng: https://script.google.com/macros/s/.../exec)

## Bước 4: Thêm URL vào Environment Variables

Thêm vào file `.env.local`:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Bước 5: Test

1. Restart Next.js dev server
2. Vào http://localhost:3000/waitlist
3. Nhập email và submit
4. Check Google Sheet xem data có vào không

## Tips

- Bạn có thể thêm cột khác vào sheet (ví dụ: Company, Role, etc.)
- Script sẽ tự động thêm timestamp
- Có thể setup email notification trong Apps Script khi có người mới join
- Free tier của Google Sheets hỗ trợ đến 5 triệu cells

## Optional: Email Notification

Thêm vào Apps Script để nhận email khi có người join:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || ''
    ]);
    
    // Send email notification
    MailApp.sendEmail({
      to: "your@email.com",
      subject: "New Waitlist Signup: " + data.name,
      body: "Name: " + data.name + "\nEmail: " + data.email
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
