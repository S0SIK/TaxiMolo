const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require("./konfiguracja.json");
const cron = require("node-cron");
const Token = fs.readFileSync('Token.txt')
const channeltaxi = "919137735791480852"

const Lok = (num, expectedLen) => {
    const inputLen = Math.ceil(Math.log(num + 1) / Math.LN10);
    // num.toString().substring(0, expectedLen).length

    let output = num.toString().substring(0, expectedLen);

    for (let i = 0; i < expectedLen - inputLen; i++) {
        output += "\ ";
    }

    return output;
}


const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("193.41.226.51:30130");

let playerTaxi = []
let playerMechanik = []
let playerInni = []
let playerAdmin = []

cron.schedule('*/10 * * * * *', () => {
    server.getPlayersOnline().then((res) => {
        const res1 = res
        player1 = []
        console.log(`Graczy na serwerze: ${res1}`)
        server.getPlayers().then((data) => {
            //console.log(data)
            let updatedTaxiData = [];
            let updatedMechanikData = [];
            let updatedAdminData = [];
            let updatedInniData = [];
            let index = 1;
            for (let player of data) {
                updatedTaxiData[player.name] = {
                    "id": player.id,
                    "ping": player.ping
                };
                //console.log(player.id, player.name, player.identifiers)
            }
            for (let player of data) {
                updatedMechanikData[player.name] = {
                    "id": player.id,
                    "ping": player.ping
                };
                //console.log(player.id, player.name, player.identifiers)
            }
            for (let player of data) {
                updatedAdminData[player.name] = {
                    "id": player.id,
                    "ping": player.ping
                };
                //console.log(player.id, player.name, player.identifiers)
            }
            for (let player of data) {
                updatedInniData[player.name] = {
                    "id": player.id,
                    "ping": player.ping
                };
                //console.log(player.id, player.name, player.identifiers)
            }

            for (const [player, value] of Object.entries(updatedTaxiData)) {
                try { // Próbujemy pobrać nasze stare dane z dysku
                    //console.log(player)
                    pracownicyTaxiData = JSON.parse(fs.readFileSync(`pracownicy/taxi.json`, 'utf-8'));
                } catch (e) {
                    console.log("Plik nie istnieje");
                }
                for (const [ranga, nick] of Object.entries(pracownicyTaxiData)) {

                    if (player == nick) {

                        //playertaxi[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${Lok(value.ping, 3)} ping | ${ranga}\n`
                        playerTaxi[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${ranga}`

                    }
                }
            }
            for (const [player, value] of Object.entries(updatedMechanikData)) {
                try { // Próbujemy pobrać nasze stare dane z dysku
                    //console.log(player)
                    pracownicyMechanikData = JSON.parse(fs.readFileSync(`pracownicy/mechanik.json`, 'utf-8'));
                } catch (e) {
                    console.log("Plik nie istnieje");
                }
                for (const [ranga, nick] of Object.entries(pracownicyMechanikData)) {

                    if (player == nick) {

                        //playertaxi[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${Lok(value.ping, 3)} ping | ${ranga}\n`
                        playerMechanik[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${ranga}`

                    }
                }
            }
            for (const [player, value] of Object.entries(updatedInniData)) {
                try { // Próbujemy pobrać nasze stare dane z dysku
                    //console.log(player)
                    pracownicyInniData = JSON.parse(fs.readFileSync(`pracownicy/inni.json`, 'utf-8'));
                } catch (e) {
                    console.log("Plik nie istnieje");
                }
                for (const [ranga, nick] of Object.entries(pracownicyInniData)) {

                    if (player == nick) {

                        //playertaxi[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${Lok(value.ping, 3)} ping | ${ranga}\n`
                        playerInni[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${ranga}`

                    }
                }
            }
            for (const [player, value] of Object.entries(updatedAdminData)) {
                try { // Próbujemy pobrać nasze stare dane z dysku
                    //console.log(player)
                    pracownicyAdminData = JSON.parse(fs.readFileSync(`pracownicy/adm.json`, 'utf-8'));
                } catch (e) {
                    console.log("Plik nie istnieje");
                }
                for (const [ranga, nick] of Object.entries(pracownicyAdminData)) {

                    if (player == nick) {

                        playerAdmin[index] = `${Lok(index++, 2)}. | ID: ${Lok(value.id, 3)} | ${ranga}`

                    }
                }
            }

            console.log(`Taxi:`)
            console.log(playerTaxi)
            console.log(`Mechanik:`)
            console.log(playerMechanik)
            console.log(`Inni:`)
            console.log(playerInni)
            console.log(`Administracja:`)
            console.log(playerAdmin)

            // const channelid = client.channels.cache.find(channel => channel.id === channeltaxi);
            // const botEmbed = new Discord.MessageEmbed()

            //   .setColor('#FF00FF')
            //   .setTitle(`Na serwerze jest ${res1} graczy.`)
            //   .setAuthor('Taxi tracking', 'https://cdn.discordapp.com/attachments/448105193536749578/920842520987045918/Logo.png')
            //   .setDescription(` \`\`\`${player1.join('')} \`\`\` \n Zarząd taxi: https://s0sik.github.io/TaxiMolo/`)

            //   .addFields()
            //   .setImage()
            //   .setTimestamp()
            //   .setFooter('Bot by S0SIK', 'https://media.discordapp.net/attachments/465060659424657408/829094179325083700/Avatar.png?width=670&height=670');
            // channelid.send(botEmbed);
        })
    })
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "id") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        server.getPlayers().then((data) => {

            for (let player of data) {

                if (player.id == sayMessage) {

                    const uwagaEmbed = new Discord.MessageEmbed()
                        .setColor('#ff0f0f')
                        .setTitle(':warning: __**Nazwa gracza**__ :warning:')
                        .setDescription(`${player.name} \n \`\`\`${player.identifiers} \`\`\` `);
                    message.channel.send(uwagaEmbed)
                }
            }
        })
    }

})



client.login('O' + Token);