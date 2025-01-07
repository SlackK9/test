import discord
from discord.ext import commands
import jishaku
from pkgutil import iter_modules
import decouple

intents = discord.Intents.all()

class Bot(commands.Bot):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    async def close(self):
        await super().close()
    
    async def is_owner(self, user: discord.User):
        if user.id == 707064490826530888 or user.id == 1075189440890286213:
            return True
        else:
            return False
        
    async def on_ready(self):
        print(f"Logged in as {self.user} ({self.user.id})")
        print("------")
        
    async def setup_hook(self):
        for module in iter_modules(['Cogs']):
            if module.ispkg:
                continue
            try:
                await self.load_extension(f'Cogs.{module.name}')
            except Exception as e:
                print(f'Failed to load extension {module.name}: {e}')

        await self.load_extension("jishaku")

bot = Bot(command_prefix=commands.when_mentioned_or("$"), intents=intents)

try:
    token = decouple.config('TOKEN')
except decouple.UndefinedValueError:
    token = None
    print("No token found in .env file")

bot.run(token=token)
        

