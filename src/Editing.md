1. Maps are 20x20 arrays in the 'mapData.js' file.
    Each map is stored in an ARRAY of OBJECTS. To make a new map, add an OBJECT ({}) to the end of the array.
    A MAP OBJECT should have a NAME property and a LAYOUT property.
    The NAME is simply the label for the map
    The LAYOUT will tell the game how to print the map to the screen.
        Using the numbers 0-200 will allow the player to walk through that tile. The different numbers are used to link to a background image of the same number.
        Using the numbers 201-400 will block a player's movement. They also link to a background image.
        Using the numbers 400-600 will trigger a shop or building interface. This is covered in more detail below. When a player interacts with a block of this number the map will store the player's position and then render a screen of the shop with the same ID as the number on the map.

2. 