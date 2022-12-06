function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
    // return str.split('').reverse().join('');

}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToString(date){
    var dateStr = { day:'', month: '', year:''};
    if(date.day<10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;

    for(var i=0; i<listOfPalindromes.length;i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year%400 === 0){
        return true;
    }
    if(year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;  //increment the day
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    if(month === 2){            
        //check for february
        if(isLeapYear(year)){
            //check for leap year
            if(day > 29){
                day = 1;
                month++; // increment the month
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++; // increment the month
            }
        }   
    }
    // check for other months 
    else{
        //check if days exceeds max days in month
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++; //  increment the month
        }
    }
    // increment the year if month is greayer than 12
    if(month > 12){
        month = 1;
        year++; //  increment the year
    }

    return{
        day: day,
        month: month,
        year: year
    }
}

function getNextDatePalindrome(date){
    var cntr = 0;      // counter to count next days to become palindrome
    var nextDate = getNextDate(date);

    for(;;){
        cntr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(date);
    }
    return [cntr, nextDate];
}

// function getNextPalindromeDate(date){
//     var counter = 0;
//     var nextDate = getNextDate(date);

//     while(1){
//         counter++;
//         var isPalindromeDate = checkPalindromeForAllDateFormats(nextDate);
//         if(isPalindromeDate){
//             break;
//         }
//         nextDate = getNextDate(date);
//     }
//     return [counter, nextDate];
// }

var date = {
    day: 31,
    month: 12,
    year: 2020
};

console.log(getNextDatePalindrome(date));

//done till 1:39 of video