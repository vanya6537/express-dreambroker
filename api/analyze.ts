import {NowRequest, NowResponse} from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
    const {text = "hello 2 times  "} = request.body
    const space = ' '

    const trimmedText = text.trim()
    const noSpacesText = text.split(space).join('')
    const wordCount = trimmedText.split(space).filter(value => value !== '').length
    let characterCounter = {}

    trimmedText.split('').forEach(value => {
        if (value.match(/[a-z]/i)) {
            if (characterCounter[value]) {
                characterCounter[value]++
            } else {
                characterCounter[value] = 1
            }
        }
    })
// in alphabetic order
    let englishLetters = []
    for (let i = 0; i < 26; i++) {
        englishLetters.push((i + 10).toString(36))
    }
// push array of big letters in alphabetic order
    englishLetters = englishLetters.concat(englishLetters.map(value => value.toUpperCase()))

    let characterCount = englishLetters.filter(value => value in characterCounter).map(value => {
        let obj = {}
        obj[value] = characterCounter[value]
        return obj
    })

    const textLength = {
        withoutSpaces: noSpacesText.length,
        withSpaces: text.length,
    }
    const data = {
        textLength, wordCount, characterCount,
    }
    response.json(data)
}
