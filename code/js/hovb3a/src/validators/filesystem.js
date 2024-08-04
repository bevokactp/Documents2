
export function isValidFilename(filename) {
    /*
    Regular expression to match valid filenames across common platforms
    This regex allows letters (a-zA-Z), digits (0-9), and certain special characters commonly allowed
    Adjust as per specific requirements (e.g., different rules for different platforms)
   
    isValidFilename("example.txt");  // true
    isValidFilename("document123.pdf");  // true
    isValidFilename("file/with/slashes.txt");  // false (due to '/')
    isValidFilename("file:with:colon.txt");  // false (due to ':')
    isValidFilename("file?with?question.txt");  // false (due to '?')
    */

    var regex = /^[^<>:"/\\|?*\x00-\x1F]+$/;
    return regex.test(filename);
}



