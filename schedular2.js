const cron = require('node-cron')
const fs = require('fs')
const path = require('path')

const invoices = require('./data/invoice.json')

// Job to check the status of invoices and if the status is paid we archive that record in archive.json file

const archiveInvoicesTask = () => {
    console.log("Running a archiveInvoices task at : ", new Date())

    try {
        const paidInvoices = invoices.filter((item) => {
            return item.status ==='paid'
        })

        if(paidInvoices.length > 0) {

            fs.writeFileSync(
                path.join(__dirname, "./", "data", "archive.json"),
                JSON.stringify(paidInvoices),
                "utf-8"
            )

            
            paidInvoices.forEach((item) => {
                invoices.splice(
                    invoices.findIndex((e) => e.status === item.status),
                    1
                );
            });

        };

        console.log("Invoices are : ", invoices)
        fs.writeFileSync(
            path.join(__dirname, "./", "data", "invoice.json"),
            JSON.stringify(invoices),
            "utf-8"
        )

        

        console.log("PaidInvoices are : ", paidInvoices)

    } catch (err) {
        console.log("error : ", err)
    }
}

cron.schedule("*/20 * * * * *", archiveInvoicesTask)

