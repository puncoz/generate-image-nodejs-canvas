const { writeFileSync } = require("fs")
const { createCanvas, loadImage } = require("canvas")
const fillTextWrapper = require("./fillTextWrapper")

const width = 832
const height = 419
const outputFile = "./generated.png"

const canvas = createCanvas(width, height)
const context = canvas.getContext("2d");

const imageBuilder = async () => {
    // draw an container
    context.fillStyle = "#0E2539"
    context.fillRect(0, 0, width, height)

    // Cover photo
    const coverPhoto = await loadImage("./images/cover-photo.png")
    context.drawImage(coverPhoto, 0, 0, width, 135)

    // logo
    const logo = "puncoz.com"
    context.font = "bold 30px Roboto"
    context.fillStyle = "#C2F8FF"
    context.fillText(logo, 322, 46)

    // Profile picture
    const profilePicture = await loadImage("./images/profile-pic.png")
    context.drawImage(profilePicture, 356, 75, 120, 120)

    // blog title
    const blogTitle = "Understanding Node.js: Single-Threaded Server-Side Language"
    context.font = "bold 40px Roboto"
    context.fillStyle = "#E1E1E1"
    fillTextWrapper(context, blogTitle, 27, 250, 47, 778)

    // date
    const calender = await loadImage("./images/ic_calender.png")
    context.drawImage(calender, 27, 371, 25, 25)
    const date = "2020/02/07"
    context.font = "regular 25px Roboto"
    context.fillStyle = "#EEEEEE"
    context.fillText(date, 125, 393)

    // author
    const author = "Puncoz Nepal"
    context.font = "regular 25px Roboto"
    context.fillStyle = "#EEEEEE"
    const authorX = width - context.measureText(author).width + 64
    const authorY = 393
    context.fillText(author, authorX, authorY)

    context.fillStyle = "#9CB4C8"
    context.fillText("by", authorX - 100, authorY)

    // export image to file
    const buffer = canvas.toBuffer("image/png")
    writeFileSync(outputFile, buffer)
}

imageBuilder()
