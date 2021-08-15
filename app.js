var birthDate = document.querySelector("#birth-date");
var checkButton = document.querySelector("#check-button");
var outputBox = document.querySelector("#output-box");
var errorBox = document.querySelector("#error-box");

checkButton.addEventListener("click", clickHandler)

function clickHandler() {

    var dateOfBirth = birthDate.value;

    errorBox.style.display= "none";
    outputBox.style.display= "none";

    if (dateOfBirth !== "") {
        var listOfDate = dateOfBirth.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkForPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            outputBox.style.display= "block";
            outputBox.innerText = "Woah! your birthday is a Palindrome.🥳🥳";

        } else {
            var [futureCounter, nextDate] = nextPalindromeDate(date);
            var [pastCounter, previousDate] = previousPalindromeDate(date);

            if (pastCounter < futureCounter) {
                outputBox.style.display= "block";
                outputBox.innerText = `The previous Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${pastCounter} days! 😔`;
            } else {
                outputBox.style.display= "block";
                outputBox.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${futureCounter} days! 😔`;
            }
            console.log(futureCounter, pastCounter)
        }

    }else{
        errorBox.style.display= "block";
        errorBox.innerText = "Please fill the date field!";
    }

}


function stringReverser(string) {
    var wordsList = string.split("");
    var reversedWordsList = wordsList.reverse();
    var reversedString = reversedWordsList.join("");
    return reversedString;
}

function checkForPalindrome(string) {
    var orignalString = string;
    var reverse = stringReverser(string);

    return orignalString === reverse;
}



function conversionDateToString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    let dateStr = conversionDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkForPalindromeForAllDateFormats(date) {
    var listOfDateFormats = getAllDateFormats(date);

    var flag = false;

    for (var i = 0; i < listOfDateFormats.length; i++) {
        if (checkForPalindrome(listOfDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYearChecker(year) {

    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        // check for leap year
        if (leapYearChecker(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }

        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(date) {
    var futureCounter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        futureCounter++;
        var isPalindrome = checkForPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [futureCounter, nextDate]
}


function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var daysInMonthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (leapYearChecker(year)) {
        // if true
        if (day === 0) {
            month--;
            day = daysInMonthLeap[month - 1];
        }
        if (month === 0) {
            month = 12;
            year--;
            day = daysInMonthLeap[month - 1]
        }
    } else {
        //if not leap year
        if (day === 0) {
            month--;
            day = daysInMonth[month - 1];
        }
        if (month === 0) {
            month = 12;
            year--;
            day = daysInMonth[month - 1]
        }
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function previousPalindromeDate(date) {

    var previousDate = getPreviousDate(date);
    var pastCounter = 0;

    while (1) {
        pastCounter++;
        var isPalindrome = checkForPalindromeForAllDateFormats(previousDate);

        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [pastCounter, previousDate]
}