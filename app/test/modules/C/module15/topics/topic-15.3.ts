import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_3: SubLesson = {
  id: '15.3',
  title: 'Mathematical Functions (<math.h>)',
  status: 'demo',
  content: `# Mathematical Functions (<math.h>)

## Basic Arithmetic Functions

### Power and Root Functions
\`\`\`c
#include <math.h>
#include <stdio.h>

int main() {
    double x = 2.0;
    double y = 3.0;

    // Power functions
    double pow_result = pow(x, y);      // 2^3 = 8
    double sqrt_result = sqrt(16.0);    // Square root: 4
    double cbrt_result = cbrt(27.0);    // Cube root: 3

    // Exponential functions
    double exp_result = exp(1.0);       // e^1 ≈ 2.718
    double exp2_result = exp2(3.0);     // 2^3 = 8
    double expm1_result = expm1(0.0);   // e^x - 1, more accurate for small x

    // Logarithmic functions
    double log_result = log(10.0);      // Natural log: ln(10)
    double log10_result = log10(100.0); // Log base 10: 2
    double log2_result = log2(8.0);     // Log base 2: 3
    double log1p_result = log1p(0.0);   // ln(1+x), more accurate for small x

    printf("pow(2,3) = %.1f\\n", pow_result);
    printf("sqrt(16) = %.1f\\n", sqrt_result);
    printf("log(10) = %.6f\\n", log_result);
    printf("log10(100) = %.1f\\n", log10_result);

    return 0;
}
\`\`\`

### Trigonometric Functions
\`\`\`c
#include <math.h>

int main() {
    double angle_rad = M_PI / 4;  // 45 degrees in radians
    double angle_deg = 60.0;

    // Convert degrees to radians
    double rad = angle_deg * M_PI / 180.0;

    // Basic trigonometric functions
    double sin_val = sin(rad);
    double cos_val = cos(rad);
    double tan_val = tan(rad);

    // Inverse trigonometric functions
    double asin_val = asin(0.5);        // Returns radians
    double acos_val = acos(0.5);
    double atan_val = atan(1.0);        // atan(1) = π/4
    double atan2_val = atan2(1.0, 1.0); // atan2(y,x) handles all quadrants

    // Hyperbolic functions
    double sinh_val = sinh(1.0);
    double cosh_val = cosh(1.0);
    double tanh_val = tanh(1.0);

    printf("sin(60°) = %.6f\\n", sin_val);
    printf("cos(60°) = %.6f\\n", cos_val);
    printf("atan2(1,1) = %.6f radians\\n", atan2_val);

    return 0;
}
\`\`\`

## Floating-Point Classification and Rounding

### Classification Functions
\`\`\`c
#include <math.h>

void classify_double(double x) {
    printf("Value: %f\\n", x);

    if (isfinite(x)) {
        printf("  Is finite\\n");
    } else {
        printf("  Is infinite\\n");
    }

    if (isinf(x)) {
        printf("  Is infinite\\n");
        if (x > 0) {
            printf("  Positive infinity\\n");
        } else {
            printf("  Negative infinity\\n");
        }
    }

    if (isnan(x)) {
        printf("  Is NaN\\n");
    }

    if (isnormal(x)) {
        printf("  Is normal\\n");
    } else {
        printf("  Is subnormal or zero\\n");
    }

    printf("  Sign bit: %s\\n", signbit(x) ? "set" : "clear");
}

int main() {
    classify_double(1.0);      // Normal finite
    classify_double(0.0);      // Zero
    classify_double(INFINITY); // Positive infinity
    classify_double(-INFINITY);// Negative infinity
    classify_double(NAN);      // NaN
    classify_double(1e-320);   // Subnormal (if supported)

    return 0;
}
\`\`\`

### Rounding Functions
\`\`\`c
#include <math.h>

int main() {
    double values[] = {2.3, 2.5, 2.7, -2.3, -2.5, -2.7};
    int num_values = sizeof(values) / sizeof(values[0]);

    for (int i = 0; i < num_values; i++) {
        double x = values[i];
        printf("Value: %f\\n", x);
        printf("  floor: %f\\n", floor(x));    // Round down
        printf("  ceil:  %f\\n", ceil(x));     // Round up
        printf("  round: %f\\n", round(x));    // Round to nearest
        printf("  trunc: %f\\n", trunc(x));    // Truncate toward zero
        printf("  rint:  %f\\n", rint(x));     // Round to nearest (configurable)
        printf("\\n");
    }

    // Special rounding functions
    printf("nextafter(1.0, 2.0) = %.20f\\n", nextafter(1.0, 2.0)); // Next representable value
    printf("nexttoward(1.0, 2.0) = %.20f\\n", nexttoward(1.0, 2.0L));

    return 0;
}
\`\`\`

## Special Mathematical Functions

### Error and Gamma Functions
\`\`\`c
#include <math.h>

int main() {
    double x = 1.5;

    // Error functions
    double erf_val = erf(x);        // Error function
    double erfc_val = erfc(x);      // Complementary error function

    // Gamma function
    double gamma_val = tgamma(x);   // Gamma function Γ(x)
    double lgamma_val = lgamma(x);  // Log of absolute value of gamma

    // Beta function
    double beta_val = beta(2.0, 3.0);  // Beta function B(m,n)

    printf("erf(%.1f) = %.6f\\n", x, erf_val);
    printf("tgamma(%.1f) = %.6f\\n", x, gamma_val);
    printf("beta(2,3) = %.6f\\n", beta_val);

    return 0;
}
\`\`\`

### Bessel Functions
\`\`\`c
#include <math.h>

int main() {
    double x = 2.5;
    int n = 1;

    // Bessel functions of the first kind
    double j0_val = j0(x);     // J₀(x)
    double j1_val = j1(x);     // J₁(x)
    double jn_val = jn(n, x);  // Jₙ(x)

    // Bessel functions of the second kind
    double y0_val = y0(x);     // Y₀(x)
    double y1_val = y1(x);     // Y₁(x)
    double yn_val = yn(n, x);  // Yₙ(x)

    printf("J₀(%.1f) = %.6f\\n", x, j0_val);
    printf("J₁(%.1f) = %.6f\\n", x, j1_val);
    printf("Y₀(%.1f) = %.6f\\n", x, y0_val);

    return 0;
}
\`\`\`

## Complex Number Support (C99)

### Complex Arithmetic
\`\`\`c
#include <complex.h>

int main() {
    double complex z1 = 3.0 + 4.0 * I;  // 3 + 4i
    double complex z2 = 1.0 - 2.0 * I;  // 1 - 2i

    // Complex arithmetic
    double complex sum = z1 + z2;
    double complex diff = z1 - z2;
    double complex prod = z1 * z2;
    double complex quot = z1 / z2;

    // Access real and imaginary parts
    double real1 = creal(z1);
    double imag1 = cimag(z1);

    // Magnitude and phase
    double mag = cabs(z1);
    double arg = carg(z1);

    // Complex exponential and logarithmic functions
    double complex exp_z = cexp(z1);
    double complex log_z = clog(z1);
    double complex sqrt_z = csqrt(z1);

    // Trigonometric functions
    double complex sin_z = csin(z1);
    double complex cos_z = ccos(z1);

    printf("z1 = %.1f %+.1fi\\n", creal(z1), cimag(z1));
    printf("z2 = %.1f %+.1fi\\n", creal(z2), cimag(z2));
    printf("z1 + z2 = %.1f %+.1fi\\n", creal(sum), cimag(sum));
    printf("z1 * z2 = %.1f %+.1fi\\n", creal(prod), cimag(prod));
    printf("|z1| = %.6f\\n", mag);

    return 0;
}
\`\`\`

## Mathematical Constants

### Standard Constants
\`\`\`c
#include <math.h>

int main() {
    // Basic constants
    printf("π = %.15f\\n", M_PI);
    printf("e = %.15f\\n", M_E);
    printf("√2 = %.15f\\n", M_SQRT2);
    printf("√½ = %.15f\\n", M_SQRT1_2);

    // Logarithmic constants
    printf("ln(2) = %.15f\\n", M_LN2);
    printf("ln(10) = %.15f\\n", M_LN10);
    printf("log₁₀(e) = %.15f\\n", M_LOG10E);
    printf("log₂(e) = %.15f\\n", M_LOG2E);

    // Trigonometric constants
    printf("π/2 = %.15f\\n", M_PI_2);
    printf("π/4 = %.15f\\n", M_PI_4);
    printf("2π = %.15f\\n", M_2_PI);
    printf("1/π = %.15f\\n", M_1_PI);

    // Other constants
    printf("2/√π = %.15f\\n", M_2_SQRTPI);
    printf("√(2/π) = %.15f\\n", M_SQRT2);
    printf("√(1/π) = %.15f\\n", M_SQRT1_2);

    return 0;
}
\`\`\`

## Error Handling in Math Functions

### errno and Math Errors
\`\`\`c
#include <math.h>
#include <errno.h>
#include <fenv.h>

int main() {
    // Clear errno
    errno = 0;

    // Domain error example
    double result1 = sqrt(-1.0);
    if (errno == EDOM) {
        printf("Domain error in sqrt(-1)\\n");
    }

    // Range error example
    errno = 0;
    double result2 = exp(1000.0);  // May cause overflow
    if (errno == ERANGE) {
        printf("Range error in exp(1000)\\n");
    }

    // Check for NaN/Infinity
    if (isnan(result1)) {
        printf("sqrt(-1) returned NaN\\n");
    }

    if (isinf(result2)) {
        printf("exp(1000) returned infinity\\n");
    }

    // Floating-point exceptions (if supported)
    #pragma STDC FENV_ACCESS ON
    feclearexcept(FE_ALL_EXCEPT);

    double overflow_test = exp(1000.0);
    if (fetestexcept(FE_OVERFLOW)) {
        printf("Floating-point overflow occurred\\n");
    }

    return 0;
}
\`\`\`

## Performance Considerations

### Fast Math Options
\`\`\`bash
# GCC fast math options
gcc -ffast-math program.c -o program  # May reduce precision
gcc -fno-math-errno program.c -o program  # Don't set errno
gcc -funsafe-math-optimizations program.c -o program  # Aggressive optimizations
\`\`\`

### Precision Control
\`\`\`c
#include <fenv.h>

int main() {
    // Set rounding mode
    fesetround(FE_TONEAREST);   // Round to nearest
    fesetround(FE_TOWARDZERO);  // Truncate
    fesetround(FE_UPWARD);      // Round toward +∞
    fesetround(FE_DOWNWARD);    // Round toward -∞

    // Get current rounding mode
    int current_mode = fegetround();

    // Set precision (if supported)
    #ifdef __x86_64__
    fenv_t env;
    fegetenv(&env);
    // Modify precision bits in x87 control word
    #endif

    return 0;
}
\`\`\`

The <math.h> header provides comprehensive mathematical functions covering arithmetic, trigonometry, logarithms, and special functions. Understanding error handling and floating-point behavior is crucial for robust mathematical computations in C.`
};

