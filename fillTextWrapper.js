module.exports = (ctx, text, x, y, lineHeight, maxWidth, textAlign = "center") => {
    ctx.textAlign = textAlign

    const words = text.split(" ")
    const lines = []
    let sliceFrom = 0

    for (let i = 0; i < words.length; i++) {
        const chunk = words.slice(sliceFrom, i).join(" ")
        const last = i === words.length - 1
        const bigger = ctx.measureText(chunk).width > maxWidth

        if (bigger) {
            lines.push(words.slice(sliceFrom, i).join(' '))
            sliceFrom = i
        }

        if (last) {
            lines.push(words.slice(sliceFrom, words.length).join(' '))
            sliceFrom = i
        }
    }

    let offsetY = 0
    let offsetX = 0

    if (textAlign === "center") {
        offsetX = maxWidth / 2
    }

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + offsetX, y + offsetY)
        offsetY = offsetY + lineHeight
    }
}
