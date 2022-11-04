const { Webhook, MessageBuilder } = require('discord-webhook-node');
const productionHook = new Webhook("production_hook_url");
const testHook = new Webhook("Test_hook_url");
const testURL = 'test_picture_url';
const productionURL = 'production_picture_url';

function colorBuilder(type) {
    switch (type) {
        case "ALERT":
            return '#eed140';
        case "NORMAL":
            return '#171815';
        case "DANGER":
            return "#fc0000";
    }
}

function nameBuilder(type) {
    switch (type) {
        case "ALERT":
            return "Alert BOT";
        case "NORMAL":
            return "Happer-API";
        case "DANGER":
            return "Problem BOT";
    }
}

module.exports.webhookDiscordSender = async (type, text, error) => {
    if (process.env.ENVIRONMENT === "Production" || process.env.ENVIRONMENT === "Test") {

        let env = process.env.ENVIRONMENT === undefined ? "Development" : process.env.ENVIRONMENT;
        try {
            const msg = createMessage(type, text, env, error)
            const discordResponse = sendWebhookMessage(msg, env);
            console.log('Message response', discordResponse);
        } catch (e) {
            console.error('There was a error with the request', e);
        }
    }
    else
        console.error('Warning : Webhook disabled, because is not Production or Test');
};

function sendWebhookMessage(msg, env) {
    if (env === "Production")
        return productionHook.send(msg);
    else if (env === "Test")
        return testHook.send(msg);
}

function createMessage(type, text, env, error) {
    return new MessageBuilder()
        .setTitle(type)
        .setAuthor(nameBuilder(type), env === "Production" ? productionURL: testURL)//, 'https://www.google.com')
        //.setURL('https://www.google.com')
        .addField('Error', error? error: "none", true)
        //.addField('Second field', 'this is not inline')
        .setColor(colorBuilder(type))
        //.setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription(text)
        //.setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        //.setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();
}
