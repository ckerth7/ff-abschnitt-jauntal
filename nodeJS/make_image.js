
const fs = require("fs");
const sharp = require('sharp');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Contains all width dimensions used for image creation
const output_sizes = [
    220,
    320,
    640
];

readline.question('Enter path to image folder [e.g. C://Users/abc/Desktop/3]:', path => {

    console.log("Image folder: " + path);

    try {

        console.log("Checking images ...");
        let image_files = fs.readdirSync(path);

        var invalidType = false;
        for (var i = 0; i < image_files.length; i++) {
            var image = image_files[i];
            if (!image.endsWith(".jpg") && !image.endsWith(".jpeg")) {
                invalidType = true;
                break;
            }
        }

        if (invalidType) {
            console.log("Folder must contain files of type *.jpg or *.jpeg only. Please remove any other file.");
        }
        else {
            console.log("Checking images successful.");

            console.log("Resizing images ...");
            for (var i = 0; i < image_files.length; i++) {
                var image = image_files[i];
                var inputFile = path + '/' + image;
                for (var j = 0; j < output_sizes.length; j++) {
                    var s = output_sizes[j];
                    var outputFile = path + '/' + (i + 1) + '-' + s + 'w.jpg';
                    sharp(inputFile).resize({ width: s }).toFile(outputFile);
                }
            }
            console.log("Resizing images successful.");

        }

    }
    catch (err) {
        console.log("Error occurred.");
        console.log(err);
    }
    finally {
        readline.close();
    }

});
