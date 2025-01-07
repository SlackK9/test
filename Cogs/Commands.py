import discord
from discord.ext import commands
from discord import app_commands

class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.hybrid_command(
        name="ping",
        description="Check the bot's latency",
    )
    async def ping(self, ctx: commands.Context):
        latency = str(round(self.bot.latency * 1000, 2))

        if int(latency.split(".")[0]) > 150:
            colour = discord.Color.red()
        else:
            colour = discord.Color.green()

        embed = discord.Embed(
            title="Pong!",
            description=f"Bot is online and responding with a latency of {latency}ms",
            color=colour
        )

        await ctx.reply(embed=embed)

async def setup(bot):
    await bot.add_cog(Commands(bot))