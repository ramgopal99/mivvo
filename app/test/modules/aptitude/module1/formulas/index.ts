export interface Formula {
  id: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables?: Array<{
    symbol: string;
    description: string;
  }>;
}

export const formulas: Formula[] = [
  {
    id: 'quadratic',
    category: 'algebra',
    name: 'Quadratic Formula',
    formula: 'x = [-b ± √(b² - 4ac)] / 2a',
    description: 'Solutions for ax² + bx + c = 0',
    variables: [
      { symbol: 'a', description: 'coefficient of x²' },
      { symbol: 'b', description: 'coefficient of x' },
      { symbol: 'c', description: 'constant term' }
    ]
  },
  {
    id: 'pythagoras',
    category: 'geometry',
    name: 'Pythagoras Theorem',
    formula: 'a² + b² = c²',
    description: 'Right-angled triangle relationship',
    variables: [
      { symbol: 'a', description: 'length of first leg' },
      { symbol: 'b', description: 'length of second leg' },
      { symbol: 'c', description: 'length of hypotenuse' }
    ]
  },
  {
    id: 'percentage',
    category: 'percentage',
    name: 'Percentage Change',
    formula: 'Change = [(New - Old)/Old] × 100%',
    description: 'Calculate percentage increase/decrease',
    variables: [
      { symbol: 'New', description: 'new value' },
      { symbol: 'Old', description: 'old value' }
    ]
  },
  {
    id: 'compound-interest',
    category: 'interest',
    name: 'Compound Interest',
    formula: 'A = P(1 + r/n)^(nt)',
    description: 'Future value with compound interest',
    variables: [
      { symbol: 'A', description: 'future value' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'r', description: 'annual interest rate' },
      { symbol: 'n', description: 'compounding frequency' },
      { symbol: 't', description: 'time in years' }
    ]
  },
  {
    id: 'mean',
    category: 'statistics',
    name: 'Arithmetic Mean',
    formula: 'Mean = Σx / n',
    description: 'Average of n numbers',
    variables: [
      { symbol: 'Σx', description: 'sum of all values' },
      { symbol: 'n', description: 'number of values' }
    ]
  },
  {
    id: 'simple-interest',
    category: 'interest',
    name: 'Simple Interest',
    formula: 'SI = (P × R × T) / 100',
    description: 'Simple interest calculation',
    variables: [
      { symbol: 'SI', description: 'simple interest' },
      { symbol: 'P', description: 'principal amount' },
      { symbol: 'R', description: 'rate of interest (%)' },
      { symbol: 'T', description: 'time in years' }
    ]
  },
  {
    id: 'area-circle',
    category: 'geometry',
    name: 'Area of Circle',
    formula: 'A = πr²',
    description: 'Area of a circle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'r', description: 'radius' },
      { symbol: 'π', description: 'pi (≈ 3.14159)' }
    ]
  },
  {
    id: 'area-rectangle',
    category: 'geometry',
    name: 'Area of Rectangle',
    formula: 'A = l × w',
    description: 'Area of a rectangle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'l', description: 'length' },
      { symbol: 'w', description: 'width' }
    ]
  },
  {
    id: 'area-triangle',
    category: 'geometry',
    name: 'Area of Triangle',
    formula: 'A = (1/2) × b × h',
    description: 'Area of a triangle',
    variables: [
      { symbol: 'A', description: 'area' },
      { symbol: 'b', description: 'base' },
      { symbol: 'h', description: 'height' }
    ]
  },
  {
    id: 'volume-cylinder',
    category: 'geometry',
    name: 'Volume of Cylinder',
    formula: 'V = πr²h',
    description: 'Volume of a cylinder',
    variables: [
      { symbol: 'V', description: 'volume' },
      { symbol: 'r', description: 'radius' },
      { symbol: 'h', description: 'height' },
      { symbol: 'π', description: 'pi (≈ 3.14159)' }
    ]
  },
  {
    id: 'arithmetic-progression',
    category: 'algebra',
    name: 'Arithmetic Progression',
    formula: 'nth term = a + (n-1)d',
    description: 'nth term of an arithmetic sequence',
    variables: [
      { symbol: 'a', description: 'first term' },
      { symbol: 'n', description: 'term number' },
      { symbol: 'd', description: 'common difference' }
    ]
  },
  {
    id: 'geometric-progression',
    category: 'algebra',
    name: 'Geometric Progression',
    formula: 'nth term = a × r^(n-1)',
    description: 'nth term of a geometric sequence',
    variables: [
      { symbol: 'a', description: 'first term' },
      { symbol: 'r', description: 'common ratio' },
      { symbol: 'n', description: 'term number' }
    ]
  },
  {
    id: 'probability',
    category: 'statistics',
    name: 'Probability',
    formula: 'P(A) = n(A) / n(S)',
    description: 'Probability of event A',
    variables: [
      { symbol: 'P(A)', description: 'probability of event A' },
      { symbol: 'n(A)', description: 'number of favorable outcomes' },
      { symbol: 'n(S)', description: 'total number of possible outcomes' }
    ]
  },
  {
    id: 'standard-deviation',
    category: 'statistics',
    name: 'Standard Deviation',
    formula: 'σ = √[Σ(x - μ)² / N]',
    description: 'Measure of data dispersion',
    variables: [
      { symbol: 'σ', description: 'standard deviation' },
      { symbol: 'x', description: 'individual values' },
      { symbol: 'μ', description: 'mean' },
      { symbol: 'N', description: 'total number of values' }
    ]
  },
  {
    id: 'lcm-hcf',
    category: 'algebra',
    name: 'LCM × HCF',
    formula: 'LCM × HCF = a × b',
    description: 'Relationship between LCM and HCF of two numbers',
    variables: [
      { symbol: 'LCM', description: 'least common multiple' },
      { symbol: 'HCF', description: 'highest common factor' },
      { symbol: 'a, b', description: 'the two numbers' }
    ]
  },
  {
    id: 'even-odd-test',
    category: 'number-classification',
    name: 'Even/Odd Test',
    formula: 'n mod 2 = 0 → Even\nn mod 2 = 1 → Odd',
    description: 'Test for even and odd numbers',
    variables: [
      { symbol: 'n', description: 'any integer' },
      { symbol: 'mod', description: 'modulo operator' }
    ]
  },
  {
    id: 'divisibility-by-2',
    category: 'number-classification',
    name: 'Divisibility by 2',
    formula: 'Last digit ∈ {0, 2, 4, 6, 8}',
    description: 'Rule for divisibility by 2',
    variables: [
      { symbol: '∈', description: 'belongs to' }
    ]
  },
  {
    id: 'divisibility-by-3',
    category: 'number-classification',
    name: 'Divisibility by 3',
    formula: 'Sum of digits ÷ 3 = integer',
    description: 'Rule for divisibility by 3',
    variables: [
      { symbol: 'Sum of digits', description: 'add all digits of the number' }
    ]
  },
  {
    id: 'divisibility-by-4',
    category: 'number-classification',
    name: 'Divisibility by 4',
    formula: 'Last two digits ÷ 4 = integer',
    description: 'Rule for divisibility by 4',
    variables: [
      { symbol: 'Last two digits', description: 'the number formed by last two digits' }
    ]
  },
  {
    id: 'divisibility-by-5',
    category: 'number-classification',
    name: 'Divisibility by 5',
    formula: 'Last digit ∈ {0, 5}',
    description: 'Rule for divisibility by 5',
    variables: [
      { symbol: '∈', description: 'belongs to' }
    ]
  },
  {
    id: 'divisibility-by-9',
    category: 'number-classification',
    name: 'Divisibility by 9',
    formula: 'Sum of digits ÷ 9 = integer',
    description: 'Rule for divisibility by 9',
    variables: [
      { symbol: 'Sum of digits', description: 'add all digits of the number' }
    ]
  },
  {
    id: 'divisibility-by-11',
    category: 'number-classification',
    name: 'Divisibility by 11',
    formula: 'Alternating sum of digits = 0 or ÷ 11',
    description: 'Rule for divisibility by 11',
    variables: [
      { symbol: 'Alternating sum', description: 'digit1 - digit2 + digit3 - digit4 + ...' }
    ]
  },
  {
    id: 'number-of-factors',
    category: 'number-classification',
    name: 'Number of Factors',
    formula: 'If n = p₁^a × p₂^b × ... then factors = (a+1)×(b+1)×...',
    description: 'Formula to count total number of factors',
    variables: [
      { symbol: 'n', description: 'the number' },
      { symbol: 'p₁^a', description: 'prime power factors' }
    ]
  },
  {
    id: 'sum-of-factors',
    category: 'number-classification',
    name: 'Sum of Factors',
    formula: 'Sum = [(p₁^(a+1)-1)/(p₁-1)] × [(p₂^(b+1)-1)/(p₂-1)] × ...',
    description: 'Formula to calculate sum of all factors',
    variables: [
      { symbol: 'p₁^(a+1)-1', description: 'geometric series sum' },
      { symbol: 'p₁-1', description: 'denominator for each prime' }
    ]
  },
  {
    id: 'hcf-lcm-relationship',
    category: 'number-theory',
    name: 'HCF × LCM',
    formula: 'HCF(a,b) × LCM(a,b) = a × b',
    description: 'Fundamental relationship between HCF and LCM',
    variables: [
      { symbol: 'HCF(a,b)', description: 'highest common factor' },
      { symbol: 'LCM(a,b)', description: 'least common multiple' },
      { symbol: 'a × b', description: 'product of the numbers' }
    ]
  },
  {
    id: 'euclidean-algorithm',
    category: 'number-theory',
    name: 'Euclidean Algorithm',
    formula: 'HCF(a,b) = HCF(b, a mod b)',
    description: 'Recursive method to find HCF',
    variables: [
      { symbol: 'a mod b', description: 'remainder when a is divided by b' }
    ]
  },
  {
    id: 'division-algorithm',
    category: 'number-theory',
    name: 'Division Algorithm',
    formula: 'a = b × q + r, where 0 ≤ r < b',
    description: 'Every division results in quotient and remainder',
    variables: [
      { symbol: 'a', description: 'dividend' },
      { symbol: 'b', description: 'divisor (b > 0)' },
      { symbol: 'q', description: 'quotient' },
      { symbol: 'r', description: 'remainder' }
    ]
  },
  {
    id: 'remainder-theorem',
    category: 'number-theory',
    name: 'Remainder Theorem',
    formula: 'When a ÷ b = q + r/b, then a ≡ r (mod b)',
    description: 'Remainder gives the same result modulo b',
    variables: [
      { symbol: 'a ≡ r (mod b)', description: 'a is congruent to r modulo b' }
    ]
  },
  {
    id: 'power-last-digit-cycle-2',
    category: 'number-theory',
    name: 'Power Cycle for 2',
    formula: '2^n last digit: 2,4,8,6 (cycle 4)',
    description: 'Last digit pattern for powers of 2',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-3',
    category: 'number-theory',
    name: 'Power Cycle for 3',
    formula: '3^n last digit: 3,9,7,1 (cycle 4)',
    description: 'Last digit pattern for powers of 3',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-4',
    category: 'number-theory',
    name: 'Power Cycle for 4',
    formula: '4^n last digit: 4,6 (cycle 2)',
    description: 'Last digit pattern for powers of 4',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-5',
    category: 'number-theory',
    name: 'Power Cycle for 5',
    formula: '5^n last digit: 5 (cycle 1)',
    description: 'Last digit pattern for powers of 5',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-6',
    category: 'number-theory',
    name: 'Power Cycle for 6',
    formula: '6^n last digit: 6 (cycle 1)',
    description: 'Last digit pattern for powers of 6',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-7',
    category: 'number-theory',
    name: 'Power Cycle for 7',
    formula: '7^n last digit: 7,9,3,1 (cycle 4)',
    description: 'Last digit pattern for powers of 7',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-8',
    category: 'number-theory',
    name: 'Power Cycle for 8',
    formula: '8^n last digit: 8,4,2,6 (cycle 4)',
    description: 'Last digit pattern for powers of 8',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'power-last-digit-cycle-9',
    category: 'number-theory',
    name: 'Power Cycle for 9',
    formula: '9^n last digit: 9,1 (cycle 2)',
    description: 'Last digit pattern for powers of 9',
    variables: [
      { symbol: 'n', description: 'exponent' }
    ]
  },
  {
    id: 'euler-totient',
    category: 'number-theory',
    name: 'Euler\'s Totient Function',
    formula: 'φ(n) = n × ∏(1 - 1/p) for prime factors p',
    description: 'Count of numbers up to n coprime to n',
    variables: [
      { symbol: 'φ(n)', description: 'totient function' },
      { symbol: '∏', description: 'product over prime factors p' }
    ]
  },
  {
    id: 'eulers-theorem',
    category: 'number-theory',
    name: 'Euler\'s Theorem',
    formula: 'a^φ(n) ≡ 1 (mod n) if gcd(a,n) = 1',
    description: 'For coprime numbers, powers cycle every φ(n)',
    variables: [
      { symbol: 'φ(n)', description: 'Euler\'s totient function' },
      { symbol: 'gcd(a,n) = 1', description: 'a and n are coprime' }
    ]
  },
  {
    id: 'perfect-square-pattern',
    category: 'number-theory',
    name: 'Sum of Odd Numbers',
    formula: 'n² = 1 + 3 + 5 + ... + (2n-1)',
    description: 'Square numbers as sum of first n odd numbers',
    variables: [
      { symbol: 'n²', description: 'nth square number' },
      { symbol: '2n-1', description: 'nth odd number' }
    ]
  },
  {
    id: 'difference-of-squares',
    category: 'algebra',
    name: 'Difference of Squares',
    formula: 'a² - b² = (a - b)(a + b)',
    description: 'Factor difference of two squares',
    variables: [
      { symbol: 'a² - b²', description: 'difference of squares' },
      { symbol: '(a - b)(a + b)', description: 'factored form' }
    ]
  },
  {
    id: 'difference-of-cubes',
    category: 'algebra',
    name: 'Difference of Cubes',
    formula: 'a³ - b³ = (a - b)(a² + ab + b²)',
    description: 'Factor difference of two cubes',
    variables: [
      { symbol: 'a³ - b³', description: 'difference of cubes' },
      { symbol: '(a - b)(a² + ab + b²)', description: 'factored form' }
    ]
  },
  {
    id: 'sum-of-cubes',
    category: 'algebra',
    name: 'Sum of Cubes',
    formula: 'a³ + b³ = (a + b)(a² - ab + b²)',
    description: 'Factor sum of two cubes',
    variables: [
      { symbol: 'a³ + b³', description: 'sum of cubes' },
      { symbol: '(a + b)(a² - ab + b²)', description: 'factored form' }
    ]
  },
  {
    id: 'sum-of-squares-formula',
    category: 'algebra',
    name: 'Sum of First n Squares',
    formula: 'Σk² = n(n+1)(2n+1)/6',
    description: 'Formula for sum of squares from 1 to n',
    variables: [
      { symbol: 'Σk²', description: 'sum of squares' },
      { symbol: 'n', description: 'upper limit' }
    ]
  },
  {
    id: 'sum-of-cubes-formula',
    category: 'algebra',
    name: 'Sum of First n Cubes',
    formula: 'Σk³ = [n(n+1)/2]²',
    description: 'Formula for sum of cubes from 1 to n',
    variables: [
      { symbol: 'Σk³', description: 'sum of cubes' },
      { symbol: 'n', description: 'upper limit' }
    ]
  },
  {
    id: 'surd-multiplication',
    category: 'algebra',
    name: 'Surd Multiplication',
    formula: '√a × √b = √(a × b)',
    description: 'Multiplication rule for square roots',
    variables: [
      { symbol: '√a × √b', description: 'product of square roots' },
      { symbol: '√(a × b)', description: 'square root of product' }
    ]
  },
  {
    id: 'surd-division',
    category: 'algebra',
    name: 'Surd Division',
    formula: '√a ÷ √b = √(a/b)',
    description: 'Division rule for square roots',
    variables: [
      { symbol: '√a ÷ √b', description: 'quotient of square roots' },
      { symbol: '√(a/b)', description: 'square root of quotient' }
    ]
  },
  {
    id: 'rationalization',
    category: 'algebra',
    name: 'Rationalization',
    formula: '1/(√a + √b) × (√a - √b)/(√a - √b) = √a - √b',
    description: 'Rationalize denominator with surds',
    variables: [
      { symbol: '√a ± √b', description: 'conjugate pair' },
      { symbol: '(√a - √b)', description: 'rationalized form' }
    ]
  },
  {
    id: 'recurring-to-fraction',
    category: 'number-theory',
    name: 'Recurring Decimal to Fraction',
    formula: '0.abc̅ = abc/(10^n - 1)',
    description: 'Convert pure recurring decimal to fraction',
    variables: [
      { symbol: 'abc̅', description: 'recurring digits' },
      { symbol: '10^n - 1', description: 'denominator with n nines' }
    ]
  },
  {
    id: 'mixed-recurring-to-fraction',
    category: 'number-theory',
    name: 'Mixed Recurring to Fraction',
    formula: '0.ab̅c̅ = [abc - ab]/(10×(10^n - 1)) + ab/10^m',
    description: 'Convert mixed recurring decimal to fraction',
    variables: [
      { symbol: 'ab̅c̅', description: 'mixed recurring decimal' },
      { symbol: 'm', description: 'non-recurring digits' },
      { symbol: 'n', description: 'recurring digits' }
    ]
  },
  {
    id: 'fraction-to-decimal',
    category: 'number-theory',
    name: 'Fraction to Decimal',
    formula: 'a/b = recurring or terminating decimal',
    description: 'All fractions produce either terminating or recurring decimals',
    variables: [
      { symbol: 'a/b', description: 'fraction in lowest terms' }
    ]
  },
  {
    id: 'digital-root-formula',
    category: 'number-theory',
    name: 'Digital Root',
    formula: 'DR(n) = 1 + (n - 1) mod 9',
    description: 'Formula to calculate digital root of any number',
    variables: [
      { symbol: 'DR(n)', description: 'digital root of n' },
      { symbol: 'n', description: 'any positive integer' }
    ]
  },
  {
    id: 'trailing-zeros-factorial',
    category: 'number-theory',
    name: 'Trailing Zeros in n!',
    formula: 'floor(n/5) + floor(n/25) + floor(n/125) + ...',
    description: 'Number of trailing zeros in factorial n!',
    variables: [
      { symbol: 'n!', description: 'factorial of n' },
      { symbol: 'floor(x)', description: 'greatest integer less than or equal to x' }
    ]
  },
  {
    id: 'highest-power-prime-factorial',
    category: 'number-theory',
    name: 'Highest Power of p in n!',
    formula: 'floor(n/p) + floor(n/p²) + floor(n/p³) + ...',
    description: 'Highest power of prime p that divides n!',
    variables: [
      { symbol: 'p', description: 'prime number' },
      { symbol: 'n!', description: 'factorial of n' }
    ]
  },
  {
    id: 'factorial-definition',
    category: 'combinatorics',
    name: 'Factorial',
    formula: 'n! = n × (n-1) × (n-2) × ... × 1',
    description: 'Definition of factorial function',
    variables: [
      { symbol: 'n!', description: 'n factorial' },
      { symbol: 'n', description: 'non-negative integer' }
    ]
  },
  {
    id: 'permutations-formula',
    category: 'combinatorics',
    name: 'Permutations',
    formula: 'P(n,r) = n! / (n-r)!',
    description: 'Number of ways to arrange r items from n distinct items',
    variables: [
      { symbol: 'P(n,r)', description: 'permutations of n items taken r at a time' },
      { symbol: 'n!', description: 'factorial of n' }
    ]
  },
  {
    id: 'combinations-formula',
    category: 'combinatorics',
    name: 'Combinations',
    formula: 'C(n,r) = n! / (r! × (n-r)!)',
    description: 'Number of ways to choose r items from n distinct items',
    variables: [
      { symbol: 'C(n,r)', description: 'combinations of n items taken r at a time' }
    ]
  },
  {
    id: 'binary-to-decimal',
    category: 'computer-science',
    name: 'Binary to Decimal',
    formula: 'Σ(b_i × 2^i) where b_i are binary digits',
    description: 'Convert binary number to decimal',
    variables: [
      { symbol: 'b_i', description: 'binary digits (0 or 1)' },
      { symbol: 'i', description: 'position from right (starting at 0)' }
    ]
  },
  {
    id: 'decimal-to-binary',
    category: 'computer-science',
    name: 'Decimal to Binary',
    formula: 'Repeated division by 2, record remainders',
    description: 'Convert decimal number to binary',
    variables: [
      { symbol: 'n', description: 'decimal number' }
    ]
  },
  {
    id: 'base-conversion-general',
    category: 'computer-science',
    name: 'General Base Conversion',
    formula: 'To decimal: Σ(d_i × b^i), To base b: repeated division by b',
    description: 'Convert between any number bases',
    variables: [
      { symbol: 'd_i', description: 'digits in source base' },
      { symbol: 'b', description: 'target or source base' }
    ]
  },
  {
    id: 'sum-of-first-n-squares',
    category: 'algebra',
    name: 'Sum of First n Squares',
    formula: 'Σk² = n(n+1)(2n+1)/6',
    description: 'Formula for sum of squares from 1 to n',
    variables: [
      { symbol: 'Σk²', description: 'sum of k squared from 1 to n' },
      { symbol: 'n', description: 'upper limit' }
    ]
  },
  {
    id: 'sum-of-first-n-cubes',
    category: 'algebra',
    name: 'Sum of First n Cubes',
    formula: 'Σk³ = [n(n+1)/2]²',
    description: 'Formula for sum of cubes from 1 to n',
    variables: [
      { symbol: 'Σk³', description: 'sum of k cubed from 1 to n' },
      { symbol: 'n', description: 'upper limit' }
    ]
  },
  {
    id: 'stirlings-approximation',
    category: 'analysis',
    name: 'Stirling\'s Approximation',
    formula: 'n! ≈ √(2πn) × (n/e)^n',
    description: 'Approximation for large factorials',
    variables: [
      { symbol: 'n!', description: 'factorial of n' },
      { symbol: 'π', description: 'pi (≈ 3.14159)' },
      { symbol: 'e', description: 'Euler\'s number (≈ 2.71828)' }
    ]
  }
];

export default formulas;