# 🧮 Scientific Calculator

A modern, responsive scientific calculator built with **React, TypeScript, Tailwind CSS, and Zustand**. Inspired by the clean experience of the iPhone calculator, it supports everyday arithmetic and advanced scientific calculations in a polished interface.

## ✨ Features

### Basic Calculator
- Addition, subtraction, multiplication, and division
- Percentage calculations
- Decimal and negative-number input
- Expression preview and result evaluation
- Clear and delete input controls

### Scientific Calculator
- Trigonometric functions: `sin`, `cos`, `tan`
- Inverse trigonometric functions
- Hyperbolic functions
- Logarithmic functions: `ln` and `log₁₀`
- Powers, square roots, cube roots, and nth roots
- Factorials and reciprocal calculations
- Constants: π and e
- Random number generation
- Scientific notation using `EE`
- Degree and radian modes
- Secondary scientific functions using the `2ⁿᵈ` control

### Additional Features
- **Expression-first input:** Enter a function before its value, such as `cos(30)`.
- **Automatic parenthesis completion:** Missing closing parentheses can be completed when evaluating an expression.
- **Implicit multiplication:** Supports expressions such as `2(3+4)`.
- **Calculation history:** Review previous calculations.
- **Persistent history:** Calculation history is saved in browser local storage.
- **Memory controls:** Memory clear, add, subtract, and recall.
- **Responsive interface:** Adapts to mobile, tablet, and desktop screens.
- **Theme support:** Light and dark appearances.
- **Keyboard support:** Use supported keyboard shortcuts where implemented.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe application logic |
| Vite | Development server and build tooling |
| Tailwind CSS | Responsive styling |
| Zustand | Calculator state management |
| Vitest | Unit testing |
| Lucide React | Interface icons |

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — use a version compatible with the project dependencies
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/codequeen-11/calculator-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually `http://localhost:5173`.

## 🧪 Testing and Production Build

Run the project's test suite:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

To preview the production build locally, if the project has the standard Vite preview script:

```bash
npm run preview
```

## 📁 Project Structure

The following is a conceptual overview of the main application areas. Adjust the paths to match your current repository.

```text
src/
├── components/
│   └── calculator/
│       ├── BasicKeypad.tsx
│       ├── ScientificKeypad.tsx
│       ├── CalculatorKey.tsx
│       ├── CalculatorDisplay.tsx
│       ├── CalculatorHeader.tsx
│       └── HistoryPanel.tsx
├── lib/
│   └── calculator/
│       ├── evaluator.ts
│       ├── evaluator.test.ts
│       ├── formatter.ts
│       └── scientific.ts
├── stores/
│   └── calculator.store.ts
├── types/
│   └── calculator.ts
└── ...
```

Your actual project may contain additional components, hooks, styles, or configuration files.

## 🧠 How It Works

The calculator separates its main responsibilities into reusable modules:

- **Calculator UI:** Displays the expression, result, calculator modes, and input keys.
- **Zustand store:** Manages expressions, results, angle mode, memory, and calculation history.
- **Expression evaluator:** Tokenizes and parses mathematical expressions while applying operator precedence.
- **Scientific functions:** Implements supported mathematical operations and angle-dependent calculations.
- **Result formatter:** Formats calculated values for display.
- **Local persistence:** Saves calculation history in browser storage so it remains available after a refresh in the same browser.

## 🔢 Example Expressions

| Expression | Result |
|---|---:|
| `2+3×4` | `14` |
| `(2+3)×4` | `20` |
| `2(3+4)` | `14` |
| `2^3` | `8` |
| `cos(60)` | `0.5` in degree mode |
| `sqrt(81)` | `9` |

Results depend on the selected angle mode for trigonometric functions.

## 🔒 Error Handling

The expression evaluator handles invalid input and mathematical errors, including division by zero, invalid expressions, and non-finite results. Incomplete expressions are validated, while the calculator can automatically complete missing closing parentheses when the user evaluates an expression.

## 🗺️ Roadmap

Potential future improvements include:

- More comprehensive keyboard shortcuts
- Enhanced accessibility and screen-reader support
- Additional scientific operations
- Improved expression editing
- More automated tests for edge cases
- Deployment and continuous integration

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and run the tests.
4. Commit your changes.
5. Open a pull request describing the improvement.

## 📄 License

Choose and add a license before distributing the project publicly. If you select the MIT License, include the appropriate `LICENSE` file in the repository.

---

Built with React, TypeScript, and a love for clean, useful software.
