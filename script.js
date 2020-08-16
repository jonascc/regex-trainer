function testString() {
    const stringToTestAgainst = document.getElementById('input_string').value;
    const patternString = document.getElementById('input_pattern').value;
    const stringHighlighted = document.getElementById('text_highlighted');
    stringHighlighted.innerHTML = stringToTestAgainst;
    try {
        validatePattern(patternString);
        hideErrMessage(patternString);
        // TODO create regex pattern from string 
        const pattern = createRegExPattern(patternString);

        // was a match found?
        let matchFoundElement = document.getElementById('match_found');
        const matchFound = pattern.test(stringToTestAgainst);
        matchFoundElement.innerHTML = matchFound;

        // extract the matches found
        const matchesExtracted = stringToTestAgainst.match(pattern);
        let listOfMatchesElement = document.getElementById('list_of_matches');
        listOfMatchesElement.innerHTML = JSON.stringify(matchesExtracted);

        const textHighlighted = document.getElementById('text_highlighted');
        textHighlighted.innerHTML = textHighlighted.innerHTML.replace(pattern, '<span class="highlighting">$&</span>')
    } catch (error) {
        showErrMessage(error);
    }
}

const validatePattern = (patternString) => {
    // verify if pattern has the format: /pattern/modifiers. Ex.: /\d+/gi
    const validPattern = /^\/.*\/$|^\/.*\/((g?i?m?)|(i?g?m?)|(m?g?i?)|(g?m?i?)|(i?m?g?)|(m?i?g?))$/;
    const isValidPattern = validPattern.test(patternString)
    if (!isValidPattern) {
        throw 'Invalid pattern.';
    }
}

function showErrMessage(errMsg) {
    toggleErrElement(errMsg);
}

function hideErrMessage() {
    toggleErrElement();
}

function toggleErrElement(errMsg) {
    const errorMsgElement = document.getElementById('error_msg');
    errorMsgElement.innerHTML = errMsg || '';
    errorMsgElement.style.display = errMsg ? 'block' : 'none';
}

function createRegExPattern(patternString) {
    const patternRegEx = /\/.*\//;
    const pattern = patternString.match(patternRegEx);

    const patternModifier = /[igm]*$/;
    const modifier = patternString.match(patternModifier);
    return new RegExp(pattern[0].replace(/\//g, ''), modifier[0]);
}