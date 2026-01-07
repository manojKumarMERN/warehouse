export const invoiceTemplate = (data: any) => `
  <html>
  <head>
    <style>
      body { font-family: Arial; margin: 20px; }
      .header { display: flex; justify-content: space-between; }
      .company { font-size: 18px; font-weight: bold; }
      .section-title { margin-top: 18px; font-size: 16px; font-weight: bold; border-bottom: 1px solid #ccc; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      table, th, td { border: 1px solid black; font-size: 13px; }
      th, td { padding: 6px; }
      .right { text-align: right; }
      .footer { margin-top: 20px; font-size: 13px; text-align: center; opacity: 0.7; }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <div class="company">${data.company.name}</div>
        ${data.company.address}<br/>
        GST: ${data.company.gstNumber}<br/>
        Phone: ${data.company.phone}
      </div>
      <div>
        <img src="${data.company.logo}" width="120" />
      </div>
    </div>

    <div class="section-title">Invoice Details</div>
    Invoice No: ${data.invoiceNo}<br/>
    Date: ${data.date}

    <div class="section-title">Customer Details</div>
    ${data.customer.name}<br/>
    ${data.customer.phone}<br/>
    ${data.customer.address || ""}
    
    <div class="section-title">Items</div>
    <table>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Gold Wt</th>
        <th>Stone Wt</th>
        <th>Net Wt</th>
        <th>Rate</th>
        <th>Total</th>
      </tr>
      ${data.items
        .map(
            (item: any, i: number) => `
          <tr>
            <td>${i + 1}</td>
            <td>${item.productName}</td>
            <td>${item.goldWeight} g</td>
            <td>${item.stoneWeight} g</td>
            <td>${item.netWeight} g</td>
            <td>${item.rate}</td>
            <td>${item.total}</td>
          </tr>
        `
        )
        .join("")}
    </table>

    <div class="section-title">Summary</div>
    Sub Total: <strong>${data.subTotal}</strong><br/>
    GST (${data.gstPercent}%): <strong>${data.gstAmount}</strong><br/>
    Grand Total: <strong>${data.grandTotal}</strong><br/>
    Amount in Words: <strong>${data.amountInWords}</strong><br/>

    <div class="section-title">Payment Info</div>
    Payment Status: <strong>${data.paymentStatus}</strong><br/>
    Paid: <strong>${data.advancePaid}</strong><br/>
    Due: <strong>${data.dueAmount}</strong><br/>

    <div class="section-title">QR Code (UPI / Invoice URL)</div>
    <img src="${data.qrCode}" width="140" />

    <div style="margin-top: 30px; display: flex; justify-content: space-between;">
      <div>
        <strong>Customer Signature</strong>
      </div>
      <div>
        <strong>Authorized Signature</strong><br/>
        ${data.company.authorizedPerson}
      </div>
    </div>

    <div class="footer">
      Thank you for your business.
    </div>
  </body>
  </html>
`;
