
  const resultBefore = document.getElementById("resultsPlaceholder");
  const resultAfter = document.getElementById("resultsContent");

  const mortgageAmount = document.getElementById("mortgageAmount");
  const mortgageTerm = document.getElementById("mortgageTerm");
  const interestRate = document.getElementById("interestRate");

  const monthlyAmount = document.getElementById("monthlyAmount");
  const totalAmount = document.getElementById("totalAmount");

  const repaymentOption = document.getElementById("repaymentOption");
  const interestOnlyOption = document.getElementById("interestOnlyOption");

  const clearBtn = document.getElementById("clearAll");

  function parseCurrency(value) {
    return parseFloat(value.replace(/,/g, ''));
  }

  function formatCurrency(value) {
    return `£${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  document.getElementById("mortgageForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let error = [];

    let p = parseCurrency(mortgageAmount.value);
    let term = parseFloat(mortgageTerm.value);
    let rate = parseFloat(interestRate.value);

    if (isNaN(p) || p <= 0) {
      error.push("Please enter valid mortgage amount");
    }

    if (isNaN(term) || term <= 0) {
      error.push("Please enter valid mortgage term");
    }

    if (isNaN(rate) || rate <= 0) {
      error.push("Please enter valid interest rate");
    }

    if (error.length > 0) {
      alert(error.join("\n"));
      return;
    }

    const monthlyInterestRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (document.getElementById("repayment").checked) {
      // Repayment mortgage formula
      monthlyPayment = (p * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      totalPayment = monthlyPayment * numberOfPayments;
    } else {
      // Interest-only: just interest each month
      monthlyPayment = p * monthlyInterestRate;
      totalPayment = monthlyPayment * numberOfPayments;
    }

    // Display results
    resultBefore.style.display = 'none';
    resultAfter.style.display = 'block';

    monthlyAmount.textContent = formatCurrency(monthlyPayment);
    totalAmount.textContent = formatCurrency(totalPayment);
  });

  // Handle mortgage type styling
  document.querySelectorAll(".radio-option input").forEach(input => {
    input.addEventListener("change", function () {
      document.querySelectorAll(".radio-option").forEach(option => {
        option.classList.remove("selected");
      });
      this.closest(".radio-option").classList.add("selected");
    });
  });

  // Clear All functionality
  clearBtn.addEventListener("click", function (e) {
    e.preventDefault();
    mortgageAmount.value = "";
    mortgageTerm.value = "";
    interestRate.value = "";
    document.getElementById("repayment").checked = true;
    repaymentOption.classList.add("selected");
    interestOnlyOption.classList.remove("selected");
    resultBefore.style.display = "block";
    resultAfter.style.display = "none";
  });

