const { SlashCommandBuilder } = require("@discordjs/builders"); // npm i @discordjs/builders --save
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Obtém a imagem do avatar do usuário mencionado ou do seu próprio avatar.')
        .addUserOption(option => option.setName('membro').setDescription('Selecione um usuário:')),
    execute: async (interaction) => {

        const user = interaction.options.getUser('membro') || interaction.user;

        const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });

        const embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle(`📷 Avatar de Perfil`)
            .addField(`Avatar de:`, `\`${user.username}\``, true)
            .setImage(avatar)
            .setFooter(interaction.client.user.username)
            .setTimestamp();

        const row = new MessageActionRow(
            new MessageButton()
                .setEmoji(`🔗`)
                .setURL(`${avatar}`)
                .setLabel(`Baixar`)
                .setStyle(`URL`)
        )

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};