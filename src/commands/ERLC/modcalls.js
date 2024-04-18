const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modcalls')
    .setDescription('View the mod call logs in-game')
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),
    async execute(interaction, client) {
        fetch (`https://api.policeroleplay.community/v1/server/modcalls`, {
            headers: {
                "Server-Key": process.env.serverToken
  },
})
//console.log(res);
.then(result => result.json())
.then(response => {
  loges = "";
  if(response.message) {
    if (response.message == 'You are being rate limited!') {
      retTime = ' Retry in ' + response.retry_after + ' seconds.'
    }
    if (response.message != "Success") {
      return interaction.reply('Error: ' + response.message + retTime)
    }
  }
  if (response.length>10) { 
    looplen = 15;
  } else {
    looplen = response.length;
  }
  if (!response[0]) {
    return interaction.reply ({ content: 'No recent mod calls in-game right now! ', ephemeral: true})
  }
  for (let i = 0; i<looplen; i++) {
    if (response[i].Player != "Remote Server") {
        coloo = response[i].Caller.indexOf(":");
    } else {
        coloo = 13;
    }
    loges = loges + "[" + response[i].Caller.substr(0,coloo)  + "]" + "(https://roblox.com/users/" + response[i].Caller.substr(coloo+1,response[i].Caller.length) + "/profile)" + " assisted by " + response[i].Moderator + "** at <t:" + response[i].Timestamp + ":f>" +"\n"
  }
  if (loges.length >4096) {
    return interaction.reply('A log(s) was too long causing the most recent logs to have too many characters, please try again later.')
  }
  const embed = new EmbedBuilder()
        .setTitle('Server Mod Call-Logs')
        .setDescription(loges)
        .setColor('336d91')
        .setTimestamp()
        //.addFields({ name: 'Players', value: response.CurrentPlayers})
        //.addFields({ name: 'Players', value: response.CurrentPlayers.toString() + ' out of ' + response.MaxPlayers.toString() + ' max players', inline: true })

    interaction.reply({ embeds: [embed], ephemeral: true });
})


        

    }
}
