
/**
 * Represents a class which performs various calculations.
 */
export class Calculator {

    /**
     * Multiplies a by b, then returns the result.
     * @param a The first number to be multiplied by the second.
     * @param b The second number to multiply the first by.
     */
    public static Multiply( a: number, b: number ): number {
        return a * b;
    }

    /**
     * Divides a by b, then returns the result.
     * @param a The first number to be divided by the second.
     * @param b The second number to divide the first by.
     */
    public static Divide( a: number, b: number ): number {
        return a / b;
    }

    /**
     * Adds a and b, then returns the result.
     * @param a The first number to be added to the second.
     * @param b The second number to add to the first.
     */
    public static Add( a: number, b: number ): number {
        return a + b;
    }

    /**
     * Adds b from a, then returns the result.
     * @param a The first number to be subtracted from.
     * @param b The second number to subtract from the first.
     */
    public static Subtract( a: number, b: number ): number {
        return a - b;
    }

    /**
     * Returns the remainder of a divided by b.
     * @param a The first number to be divided.
     * @param b The second number to divide by.
     */
    public static Modulus( a: number, b: number ): number {
        return a % b;
    }
}