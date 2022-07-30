const challenges: any = {
  '0': {
    title: 'Multiply',
    description: (
      <span>
        Given variables <code>a</code> and <code>b</code>
        <br></br>
        return <code>a * b</code>
      </span>
    ),
    languages: ['javascript', 'java'],
    startCode: {
      javascript:
        `function multiply(a, b) {
  // your code
}`,
      java:
        `public class Multiply {
  public static int multiply(int a, int b) {
    // your code
  }
}`,
    },
  },
  '1': {
    title: 'Divide',
    description: (
      <span>
        Given variables <code>a</code> and <code>b</code>
        <br></br>
        return <code>a / b</code>
      </span>
    ),
    startCode: {
      javascript:
        `function divide(a, b) {
  // your code
}`,
      java:
        `public class Divide {
  public static double divide(int a, int b) {
    // your code
  }
}`,
    },
  },
};

export { challenges };
