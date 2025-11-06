# Simple-JS-transcryption-tools
- Change Rail Fence Helper to Fence Helper by removing the transcoding logic
- Change Keystream helper to key helper to integrate sorting the letters in a keyword (applies to Columnar and Redefence cipher)
- Fix all functions that use "createMapForCharacterSets" due to the new addition

<br>

- Polyalphabetic substitution ciphers
    - (Optional) Increment the keystream index, even if the current character isn't transcoded.
- Progressive shift cipher
    - (Optional) Increment the keystream index, even if the current character isn't transcoded.
    - (Optional) Use the Beaufort cipher formula to transcode the characters.
- Chaocipher
    - (Optional) Allow the user to customize at what index characters should be taken and spliced into the nadir.
    - (Optional) Allow the user to customize the zenith/nadir position.
- Columnar transposition cipher
    - (Optional) Organize grids by keyword desc.
    - (Optional) Use keyword for the rows instead of the columns.
