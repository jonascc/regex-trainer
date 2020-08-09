function testString() {
    const stringToTestAgainst = document.getElementById('input_string').value;
    // TODO check validity of pattern provided
    const patternString = document.getElementById('input_pattern').value;
    // TODO create regex pattern from string 
    const pattern = new RegExp(patternString, 'g');

    let matchFoundElement = document.getElementById('match_found');
    const matchFound = pattern.test(stringToTestAgainst);
    matchFoundElement.innerHTML = matchFound;

    const matchesExtracted = stringToTestAgainst.match(pattern);
    let listOfMatchesElement = document.getElementById('list_of_matches');
    listOfMatchesElement.innerHTML = JSON.stringify(matchesExtracted);

}