// eslint-disable-next-line no-unused-vars
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    name: 'update',
    description: '[🤖 Developer] Atualiza o cliente.',
    category: '🤖 Developer',
    cooldown: 0,
    usage: [''],
    type: 1,
    options: [
      {
        name: 'client',
        type: 3,
        description: 'Escolha uma opção:',
        required: false,
        choices: [
          {
            name: 'username',
            value: 'username'
          },
          {
            name: 'avatar',
            value: 'avatar'
          }
        ]
      },
    ]
  },
  /**
   * @param {CommandInteraction} interaction 
   */
  execute: async (interaction) => {

    if (interaction.user.id !== process.env.OWNER_ID) {
      return;
    }

    //Código aqui:

    let client = interaction.options.getString('client');

    if (client == 'username') {
      await interaction.reply('Insira o novo nome:');

      let filter = (i) => i.user.id === interaction.user.id;
      let collector = interaction.channel.createMessageCollector({ filter: filter, time: 60000 * 5, max: 1, errors: ['time'] });

      collector.on('collect', (i) => {
        let collected = i.content;
        
        interaction.client.user.setUsername(collected).catch((e) => {
          console.error(e);
          return interaction.reply('Ocorreu um erro, tente novamente mais tarde');
        });
      });
      
      collector.on('end', adlsyn)
    } else if (client == 'avatar') {
      await interaction.reply('Insira um link ou anexo:');

      let filter = (i) => i.user.id === interaction.user.id;
      let collector = interaction.channel.createMessageCollector({ filter: filter, time: 60000 * 5, max: 1, errors: ['time'] });

      collector.on('collect', async (i) => {
        let collected = i.content;

        console.log(collected)

        if (collected == 'cancelar') {
          return interaction.followUp('Cancelado!');
        }

      });
    } else {
      let avatar = interaction.client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 });
      let username = interaction.client.user.username;

      let embed = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setThumbnail(avatar)
        .setDescription(`O meu nome atual é: ${username}`)
        .setFooter({ text: username, iconURL: avatar })
        .setTimestamp();

      let row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setEmoji('🔗')
          .setLabel('Avatar')
          .setURL(avatar)
          .setStyle('LINK')
        );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }
}