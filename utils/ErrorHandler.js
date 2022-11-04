const WHD = require("./discordWebhookSender");
const moment = require("moment");

//Triggered when application will crash
exports.InitializeErrorHandler = () => {
    process.on('uncaughtException', async function (exception) {
        console.error(exception)
        await WHD.webhookSender("DANGER", "Application just crash", JSON.stringify(exception));
        process.exitCode = 1
    });

    process.on('unhandledRejection', async function (reason, promise)  {
        console.error(reason)
        await WHD.webhookSender("DANGER", "Application Encountered an error", reason.stack)
        process.exitCode = 1
    })
}

//Error handler for catch in controllers and services
exports.ErrorHandlerDetails = async (type, file, error) => {
    try {
        let error_date = moment().format('DD/MM/YYYY HH:mm:ss');
        await WHD.webhookSender("ALERT", `Something happened in file \n ${file}\n at: ${error_date}`, error.toString())
        console.error(`(${typeColor(type)})${error_date}=>${file}: ${error.toString()}`)
    }
    catch (e) {
        console.error(e)
    }
}

function typeColor(type){
    switch (type) {
        case "ALERT":
            return "\x1b[33m"+ type+ "\x1b[0m"
        case "DANGER":
            return "\x1b[31m"+ type +"\x1b[0m"
        default:
            return type
    }
}