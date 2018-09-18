1. Maps are 20x20 arrays in the 'mapData.js' file.
    Each map is stored in an ARRAY of OBJECTS. To make a new map, add an OBJECT ({}) to the end of the array.
    A MAP OBJECT should have a NAME property and a LAYOUT property.
    The NAME is simply the label for the map
    The LAYOUT will tell the game how to print the map to the screen.
        Using the numbers 0-200 will allow the player to walk through that tile. The different numbers are used to link to a background image of the same number.
        Using the numbers 201-400 will block a player's movement. They also link to a background image.
        Using the numbers 400-600 will trigger a shop or building interface. This is covered in more detail below. When a player interacts with a block of this number the map will store the player's position and then render a screen of the shop with the same ID as the number on the map.

2. Adding Inventory/Shop Items and Giving them effects.
    1. To add items to a shop's inventory, go into the APP.js file and inside the RENDERSTOREINTERFACE function, there will be a CONST variable called STORECOLLECTION. This stores and handles all shops and items that correlate with them.
        1. To create a new shop you must add an object at the end of the STORECOLLECTION array that contains the following properties.
            1. ID: MUST be a number greater than 400 and must be unique to that store
            2. isStore: A boolean - true or false - that tells the game if it should check for an inventory
            3. NAME : Name of the store. Will be printed when in the store
            4. OPTIONS : Each option object allows for a certain action to be performed.
                1. Name : STRING The name of the action (Sleep, Work Out, Study, etc.)
                2. effect: CALLBACK FUNCTION - What happens when the event is clicked.
            5. INVENTORY : ARRAY OF OBJECTS - If your object is a store, you must have this. This will print whatever items to the player and allows them to buy and use them.
        2. To create an item - you need to add objects to the Inventory array. Each item must have the following properties.
            1. NAME : STRING - Name of your item.
            2. DESCRIPTION: STRING - A brief description of your item and what it does.
            3. PRICE: NUMBER - The value of your item.
            4. EFFECT : CALLBACK FUNCTION - Functions to run when you use this item in your inventory.
                1. IF YOUR ITEM IS A CONSUMABLE OR SINGLE USE YOU MUST INCLUDE: handleConsumable(this);
                BEFORE YOU PLACE IN YOUR CODE. This will manage removing the item from the inventory once it used.
