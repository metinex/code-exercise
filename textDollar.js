const UPTOTWENTY = new Map([[0,''],[1,'One'],[2,'Two'],[3,'Three'],[4,'Four'], [5,'Five'],[6,'Six'],[7,'Seven'],[8,'Eight'],[9,'Nine'],[10,'Ten'],[11,'Eleven'],[12,'Twelve'],[13,'Thirteen'],[14,'Fourteen'],[15,'Fifteen'],[16,'Sixteen'],[17,'Seventeen'],[18,'Eighteen'],[19,'Nineteen']])
const TENTHS = new Map([[0,''],[1,'Ten'],[2,'Twenty'],[3,'Thirty'],[4,'Forty'],[5,'Fifty'], [6,'Sixty'],[7,'Seventy'],[8,'Eighty'],[9,'Ninety']])
const SUFFIXES = new Map([[0, 'Dollars'],[1,'Thousand'],[2,'Million']])
const HUNDRED = "Hundred", ZERO = 'ZeroDollars'

//new Map([...UPTOTWENTY, ...LOWERTWENTY] )

let textDollar = (number) => {

  // check validity of the number
  if(typeof number !== "number" || number >= 1000000000 || number <0) return output("")

  // handle exceptional situation when number is zero
  if(number === 0) return output(ZERO)

  return compose(
    output, // return and output console
    getWording, // get wording for an array grouped by 3 digits
    getAs3DigitArray, // transform array to be grouped by 3 digits
    getAsArray) //turn a number into an array of digits
  (number)
}

compose = function() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}

let getAsArray = number =>  number.toString().split("")

/**
 * returns an array of numbers as grouped in 3 digits
 * @param {array} arr  => [2, 1, 6, 7, 8]
 * returns {array}   => [[0, 2, 1], [6, 7, 8]]
 */

let getAs3DigitArray = (arr)=> {

  let cachedArr = []

  let iterated = arr => {

    let
      result,
      getIndex = arr => arr.length - 3,
      handleZero = number => number < 0 ? 0 : number,
      leftIndex = compose(handleZero, getIndex) (arr)

    let
      lastThreeDigits = (arr, leftIndex) => arr.slice( leftIndex, arr.length),
      handleStrings = arr => arr.map(item => parseInt(item, 10)),
      addLeadingZero = arr => {
        if(arr.length === 2) arr.unshift(0)
        if(arr.length === 1){
          arr.unshift(0)
        }
        return arr
      }

    let extractedArray = compose(handleStrings, addLeadingZero, lastThreeDigits) (arr, leftIndex)

    cachedArr.push( extractedArray )

    switch(leftIndex){
      case 0:

        result = cachedArr
        break;

      default:
        result = iterated(arr.slice(0, leftIndex))
    }
    return result
  }

  return iterated(arr)

}


/**
 * returns arrays of 3 digits as wording
 * @param {array} arr    @example => [[0, 2, 1], [6, 7, 8]]
 * @returns {string}    @example => 'TwentyOneThousandSixHundredSeventyEight'
 */

let getWording = arr => {


  return arr.reduce((accumulator, item, index)=>{

    let str = getWordingFor3(item) + SUFFIXES.get(index)

    return  str + accumulator

  }, "")
}

let output = value => {
  console.log(value)
  return value
}


/**
 * returns an array of 3 digits into string for its wording
 * @param {array} arr   @example => [6, 7, 8]
 * @returns {string}    @example => 'SixHundredSeventyEight'
 */
let getWordingFor3 = arr => {

  let arrayLast2 = arr => arr.slice(-2, arr.length),
    firstDigit = arr => parseInt(arr[0],10),
    wordingFirstDigit = firstDigit => {
      let str = UPTOTWENTY.get(firstDigit)
      return str ? str + HUNDRED : ""
    }

  return compose(wordingFirstDigit, firstDigit)(arr) + compose(getWordingForLast2, arrayLast2)(arr)

}

/**
 * returnd an array of 2 digits into a string for its wording
 * @param {array} arr   @example => [7, 8]
 * @returns {string}    @example => 'SeventyEight'
 */
let getWordingForLast2 = arr => {

  let number = parseInt(arr.join(""), 10), str

  switch(true){

    case number === 0:

      str = ""
      break

    case number < 20:

      str = UPTOTWENTY.get(number)
      break

    default:

      let second = parseInt(arr[1], 10)
      str = TENTHS.get(arr[0]) + UPTOTWENTY.get(second)

  }

  return str
}


expect(textDollar(0)).to.be("ZeroDollars")
expect(textDollar(1)).to.be("OneDollars")
expect(textDollar(19)).to.be("NineteenDollars")
expect(textDollar(71)).to.be("SeventyOneDollars")
expect(textDollar(100)).to.be("OneHundredDollars")
expect(textDollar(101)).to.be("OneHundredOneDollars")
expect(textDollar(110)).to.be("OneHundredTenDollars")
expect(textDollar(3119)).to.be("ThreeThousandOneHundredNineteenDollars")
expect(textDollar(60003119)).to.be("SixtyMillionThreeThousandOneHundredNineteenDollars")
expect(textDollar(999999999)).to.be("NineHundredNinetyNineMillionNineHundredNinetyNineThousandNineHundredNinetyNineDollars")
expect(textDollar(1000000000)).to.be("")

console.log("All tests passed OK...")