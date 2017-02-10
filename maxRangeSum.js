const maxRangeSum = input => {

  let output = value => {
    console.log(value)
    return value
  }

  // data validation check by returning 0 for invalid data

  let data = input.split(" "), days = parseInt(data[0], 10)
  days = isNaN(days) ? 0 : days

  if( !days || days !== data.slice(1).length) return output(0)

  // convert value to integer while returning 0 if it is invalid number
  let parseValue = value => {
    value = parseInt(value, 0)
    value = isNaN(value) ? 0 : value
    return value
  }

  // calculates the maksimum possible gain for an array
  let iterateArray = (arr) => {

    let maxGain = gain = 0

    for(let i = 0; i < arr.length; i++){

      // calculate the accumulated gain for this array of data
      gain += parseValue(arr[i])

      // store the new calculated gain to be returned if it is higher than existing gain
      if(gain > maxGain) maxGain = gain
    }

    return maxGain

  }

  let maxGain = 0

  // iterate over each day
  data.slice(1).forEach((item, index, arr) => {

    // get the maximum gain for each array starting from a certain index. This creates shifting from the beginning
    let gain = iterateArray(arr.slice(index))

    if(gain > maxGain) maxGain = gain

  })

  return output(maxGain)

}

// gain for multiple days
expect(maxRangeSum("10 7 -3 -10 4 2 8 -2 4 -5 -6")).to.be(16);

// gain for multiple days
expect(maxRangeSum("6 -4 -7 -1 8 -2 -2")).to.be(8);

// one single positive gain
expect(maxRangeSum("5 -4 6 -2 8 -2")).to.be(12);

// all negative
expect(maxRangeSum("4 -1 -3 -6 -4")).to.be(0);

// the number at the beginning does not match the number of days
expect(maxRangeSum("9 7 -3 -10 4 2 8 -2 4 -5 -6")).to.be(0);

// not valid data
expect(maxRangeSum("")).to.be(0);

// not valid data
expect(maxRangeSum("test")).to.be(0);

console.log("All tests passed OK...")

