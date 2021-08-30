const birthDate = document.querySelector("#birth-date");
const checkBtn = document.querySelector("#check");
const outputArea = document.querySelector("#output-area");

checkBtn.addEventListener("click", checkPalindrome);

function checkPalindrome() {
    var birthdayString = birthDate.value.split("-");
    var year = birthdayString[0];
    var month = birthdayString[1];
    var day = birthdayString[2];
    var birthdateObj = {
        day: Number(day),
        month: Number(month),
        year: Number(year)
    }
    var dateAsString = getDateAsString(birthdateObj);
    var dateList = checkPalindromeforAllFormat(dateAsString);

    var flag = false;
    for (var i = 0; i < dateList.length; i++) {
        if (dateList[i]) {
            flag = true;
            break;
        }
    }
    if (!flag) {
       const [nextCount, nextDate] = checkNextPalindromeDate(birthdateObj);
       const [prevCount, prevDate] =  checkPreviousPalindromeDate(birthdateObj);
        if(nextCount > prevCount){
            outputArea.innerText = `The nearest palindrome date from your birthdate is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed your palindrome birthday by ${prevCount} days!`;
        }
        else{
            outputArea.innerText = `The nearest palindrome date from your birthdate is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${nextCount} days!`;    
        }
    }
    else
        outputArea.innerText = "Yay! Your birthday is palindrome."
}

function getDateAsString(birthdateObj) {
    var dateStringFormat = { day: "", month: "", year: "" }
    if (birthdateObj.day < 9) {
        dateStringFormat.day = "0" + birthdateObj.day;
    }
    else {
        dateStringFormat.day = birthdateObj.day.toString();
    }
    if (birthdateObj.month < 9) {
        dateStringFormat.month = "0" + birthdateObj.month;
    }
    else {
        dateStringFormat.month = birthdateObj.month.toString();
    }
    dateStringFormat.year = birthdateObj.year.toString();
    return dateStringFormat;
}
//returns a boolena palindrome array
function checkPalindromeforAllFormat(dateString) {
    var dateFormat = getDateInMulitpleFormat(dateString);
    plaindromeList = [];

    for (var i = 0; i < dateFormat.length; i++) {
        var isPalindrome = isStringPalindrome(dateFormat[i])
        plaindromeList.push(isPalindrome);
    }
    return plaindromeList;   
}

function getDateInMulitpleFormat(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function isStringPalindrome(date) {
    var str1 = date;
    var str2 = reverseString(date);
    return str1 === str2;
}

function reverseString(date) {
    var dateCharArray = date.split('');
    var reversedDateCharArray = dateCharArray.reverse();
    reversedDateString = reversedDateCharArray.join("");
    return reversedDateString;
}

//returns next date 
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonthFormat = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    }
    else {
        if (day > daysInMonthFormat[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        day = 1;
        month = 1;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getPreviousDate(date) {
    day = date.day - 1;
    month = date.month;
    year = date.year;
    var daysInMonthFormat = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day === 0) {
        month--;
        if (month === 0) {
            day = 31;
            month = 12;
            year--;
        }
        else 
            if (month === 2) {
                if (checkLeapYear(year)) {
                        day = 29;
                        month = 2;
                } 
                else {
                    day = 28;
                    month = 2;
                }
            }     
        else
        day = daysInMonthFormat[month -1];
    }
     
    return {
        day: day,
        month: month,
        year: year
    };
}

function checkNextPalindromeDate(date) {
    count = 0;
    var nextDate = getNextDate(date);
    while (true) {
        count++;
        var dateStr = getDateAsString(nextDate);
        var list = checkPalindromeforAllFormat(dateStr);
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                return [count, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function checkPreviousPalindromeDate(date) {
    count = 0;
    var previousDate = getPreviousDate(date);
    while (true) {
        count++;
        dateStr = getDateAsString(previousDate);
        var list = checkPalindromeforAllFormat(dateStr);
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                return [count, previousDate];
                //break;
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

function checkLeapYear(year) {
    var flag = false;
    if (year % 400 === 0)
        flag = true;
    if (year % 4 === 0 && year % 100 !== 0)
        falg = true;
    return flag;
}