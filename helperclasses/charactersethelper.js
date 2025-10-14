export function makeCharacterSetUnique(characterSet)
{
    return [...new Set([...characterSet])];
}