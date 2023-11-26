import os
collection = input("> Enter collection name: ").capitalize()
readAll = f'_{collection.lower()}.ejs'
read = f'read{collection}.ejs'
create = f'create{collection}.ejs'
update = f'update{collection}.ejs'
updateImage = f'update{collection}Photo.ejs'

os.system(f'echo > {readAll}')
os.system(f'echo > {read}')
os.system(f'echo > {create}')
os.system(f'echo > {update}')
os.system(f'echo > {updateImage}')