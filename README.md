# code-exercise

#Text Dollar
#### Difficulty: Hard
#### Time Limit: 45 min

### Description

You are given a positive integer number. This represents the sales made that day in your department store. The payables department however, needs this printed out in English. NOTE: The correct spelling of 40 is Forty. (NOT Fourty)

### Input 
Your program should read lines of text from standard input. Each line contains a positive integer.

Output 
For each set of input print a single line to standard output which is the english textual representation of that integer. The output should be unspaced and in CamelCased. Always assume plural quantities. You can also assume that the numbers are < 1000000000 (1 billion). In case of ambiguities eg. 2200 could be TwoThousandTwoHundredDollars or TwentyTwoHundredDollars, always choose the representation with the larger base i.e. TwoThousandTwoHundredDollars.

#### Test 1
Input
3 
Expected Output
ThreeDollars

#### Test 2
Input
466 
Expected Output
FourHundredSixtySixDollars

#### Test 3
Input
1234 
Expected Output
OneThousandTwoHundredThirtyFourDollars

#### Test 4
Input
10 
Expected Output
TenDollars

#### Test 5
Input
21 
Expected Output
TwentyOneDollars


#Max Range Sum
###Difficulty: Easy
###Time Limit: 30 min
###Description

Bob is developing a new strategy to get rich in the stock market. He wishes to invest his portfolio for 1 or more days, then sell it at the right time to maximize his earnings. Bob has painstakingly tracked how much his portfolio would have gained or lost for each of the last N days. Now he has hired you to figure out what would have been the largest total gain his portfolio could have achieved. 

*Example:* Bob kept track of the last 10 days in the stock market. On each day, the gains/losses are as follows: 7 -3 -10 4 2 8 -2 4 -5 -2. If Bob entered the stock market on day 4 and exited on day 8, his gains would have been 16 (4 + 2 + 8 + -2 + 4).

####Input 
The input consists of integers on a line separated by spaces. The input contains N, the number of days (0 < N < 10000), followed by N integers D (-10000 < D < 10000) indicating the gain or loss on that day.

####Output 
For each test case, print a line containing the maximum possible gain over the period. If no gain is possible, print 0.

####Test 1
Input
10 7 -3 -10 4 2 8 -2 4 -5 -6
Expected Output
16