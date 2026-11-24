document.addEventListener("DOMContentLoaded", function () {
  const currencyUsdBtn = document.getElementById("currencyUsdBtn");
  const currencyPhpBtn = document.getElementById("currencyPhpBtn");
  const currSymElements = document.querySelectorAll(".curr-sym");

  const chooseHourlyBtn = document.getElementById("chooseHourlyBtn");
  const chooseDailyBtn = document.getElementById("chooseDailyBtn");
  const hourlyFieldsContainer = document.getElementById("hourlyFieldsContainer");
  const dailyFieldsContainer = document.getElementById("dailyFieldsContainer");

  const inputAge = document.getElementById("inputAge");

  const inputJobSelect = document.getElementById("inputJobSelect");
  const inputJobCustom = document.getElementById("inputJobCustom");
  const toggleJobModeBtn = document.getElementById("toggleJobModeBtn");
  const jobSelectWrapper = document.getElementById("jobSelectWrapper");
  const jobInputWrapper = document.getElementById("jobInputWrapper");

  const hourlyRateInput = document.getElementById("hourlyRateInput");
  const dailyRateInput = document.getElementById("dailyRateInput");

  const toggleMonthlyDaysBtn = document.getElementById("toggleMonthlyDaysBtn");
  const monthlyDaysPopup = document.getElementById("monthlyDaysPopup");
  const closeMonthlyPopupBtn = document.getElementById("closeMonthlyPopupBtn");
  const inputDaysPerMonth = document.getElementById("inputDaysPerMonth");
  const presetBtns = document.querySelectorAll(".btn-preset");
  const previewMonthlyTotal = document.getElementById("previewMonthlyTotal");

  const overviewTitle = document.getElementById("overviewTitle");
  const liveNetHero = document.getElementById("liveNetHero");
  const liveNetPeriod = document.getElementById("liveNetPeriod");

  const activeRateLabel = document.getElementById("activeRateLabel");
  const activePayAmount = document.getElementById("activePayAmount");
  const activePayUnit = document.getElementById("activePayUnit");
  const badgeMonthlyOptional = document.getElementById("badgeMonthlyOptional");
  const badgeDaysCount = document.getElementById("badgeDaysCount");
  const badgeMonthlyPay = document.getElementById("badgeMonthlyPay");

  const toggleBreakdownBtn = document.getElementById("toggleBreakdownBtn");
  const toggleBreakdownText = document.getElementById("toggleBreakdownText");
  const breakdownSheet = document.getElementById("breakdownSheet");

  const rowHourly = document.getElementById("rowHourly");
  const rowDaily = document.getElementById("rowDaily");
  const rowWeekly = document.getElementById("rowWeekly");
  const rowMonthly = document.getElementById("rowMonthly");

  const labelMonthly = document.getElementById("labelMonthly");
  const tableHourlyPay = document.getElementById("tableHourlyPay");
  const tableDailyPay = document.getElementById("tableDailyPay");
  const tableWeeklyPay = document.getElementById("tableWeeklyPay");
  const tableMonthlyPay = document.getElementById("tableMonthlyPay");

  const benchmarkAmount = document.getElementById("benchmarkAmount");
  const benchmarkUnit = document.getElementById("benchmarkUnit");
  const benchmarkComparisonText = document.getElementById("benchmarkComparisonText");
  const createOverviewBtn = document.getElementById("createOverviewBtn");

  const toggleCornerGuideBtn = document.getElementById("toggleCornerGuideBtn");
  const cornerGuideSheet = document.getElementById("cornerGuideSheet");
  const closeCornerGuideBtn = document.getElementById("closeCornerGuideBtn");

  let currentMode = "hourly";
  let currentCurrency = "USD";
  let isCustomJobMode = false;
  let isBreakdownOpen = false;
  let isMonthlyPopupOpen = false;
  let isGuideOpen = false;
  const USD_TO_PHP_RATE = 58.00;

  const JOB_BENCHMARKS_HOURLY = {
    "web developer": 30.87,
    "ui/ux designer": 32.60,
    "software engineer": 39.23,
    "project manager": 35.77,
    "financial analyst": 33.75,
    "virtual assistant": 18.46,
    "graphic designer": 23.65,
    "customer support": 17.31,
    "accountant": 29.42,
    "system architect": 45.58
  };

  toggleBreakdownBtn.addEventListener("click", function () {
    isBreakdownOpen = !isBreakdownOpen;
    if (isBreakdownOpen) {
      breakdownSheet.classList.add("open");
      breakdownSheet.setAttribute("aria-hidden", "false");
      toggleBreakdownBtn.classList.add("active");
      toggleBreakdownBtn.setAttribute("aria-expanded", "true");
      toggleBreakdownText.textContent = "Hide Pay Breakdown";
    } else {
      breakdownSheet.classList.remove("open");
      breakdownSheet.setAttribute("aria-hidden", "true");
      toggleBreakdownBtn.classList.remove("active");
      toggleBreakdownBtn.setAttribute("aria-expanded", "false");
      toggleBreakdownText.textContent = "View Full Pay Breakdown";
    }
  });

  function setMonthlyPopup(open) {
    isMonthlyPopupOpen = open;
    if (isMonthlyPopupOpen) {
      monthlyDaysPopup.classList.add("open");
      monthlyDaysPopup.setAttribute("aria-hidden", "false");
      toggleMonthlyDaysBtn.classList.add("active");
      toggleMonthlyDaysBtn.setAttribute("aria-expanded", "true");
    } else {
      monthlyDaysPopup.classList.remove("open");
      monthlyDaysPopup.setAttribute("aria-hidden", "true");
      toggleMonthlyDaysBtn.classList.remove("active");
      toggleMonthlyDaysBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (toggleMonthlyDaysBtn) {
    toggleMonthlyDaysBtn.addEventListener("click", function () {
      setMonthlyPopup(!isMonthlyPopupOpen);
    });
  }

  if (closeMonthlyPopupBtn) {
    closeMonthlyPopupBtn.addEventListener("click", function () {
      setMonthlyPopup(false);
    });
  }

  function setCornerGuide(open) {
    isGuideOpen = open;
    if (isGuideOpen) {
      cornerGuideSheet.classList.add("open");
      cornerGuideSheet.setAttribute("aria-hidden", "false");
      toggleCornerGuideBtn.classList.add("active");
      toggleCornerGuideBtn.setAttribute("aria-expanded", "true");
    } else {
      cornerGuideSheet.classList.remove("open");
      cornerGuideSheet.setAttribute("aria-hidden", "true");
      toggleCornerGuideBtn.classList.remove("active");
      toggleCornerGuideBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (toggleCornerGuideBtn) {
    toggleCornerGuideBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setCornerGuide(!isGuideOpen);
    });
  }

  if (closeCornerGuideBtn) {
    closeCornerGuideBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setCornerGuide(false);
    });
  }

  document.addEventListener("click", function (e) {
    if (isGuideOpen && cornerGuideSheet && !cornerGuideSheet.contains(e.target) && !toggleCornerGuideBtn.contains(e.target)) {
      setCornerGuide(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isGuideOpen) {
      setCornerGuide(false);
    }
  });

  presetBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const days = this.getAttribute("data-days");
      if (inputDaysPerMonth) {
        inputDaysPerMonth.value = days;
      }
      presetBtns.forEach(function (b) { b.classList.remove("active"); });
      this.classList.add("active");
      calculatePaycheck();
    });
  });

  if (inputDaysPerMonth) {
    inputDaysPerMonth.addEventListener("input", function () {
      const val = this.value;
      presetBtns.forEach(function (b) {
        if (b.getAttribute("data-days") === val) {
          b.classList.add("active");
        } else {
          b.classList.remove("active");
        }
      });
      calculatePaycheck();
    });
  }

  function setJobMode(custom) {
    isCustomJobMode = custom;
    if (custom) {
      jobSelectWrapper.style.display = "none";
      jobInputWrapper.style.display = "block";
      toggleJobModeBtn.textContent = "Select from list";
      if (!inputJobCustom.value) {
        inputJobCustom.value = inputJobSelect.value !== "__custom__" ? inputJobSelect.value : "";
      }
      inputJobCustom.focus();
    } else {
      jobSelectWrapper.style.display = "block";
      jobInputWrapper.style.display = "none";
      toggleJobModeBtn.textContent = "Type custom job";
      if (inputJobSelect.value === "__custom__") {
        inputJobSelect.value = "Web developer";
      }
    }
    calculatePaycheck();
  }

  toggleJobModeBtn.addEventListener("click", function () {
    setJobMode(!isCustomJobMode);
  });

  inputJobSelect.addEventListener("change", function () {
    if (this.value === "__custom__") {
      setJobMode(true);
    } else {
      calculatePaycheck();
    }
  });

  inputJobCustom.addEventListener("input", calculatePaycheck);

  function getCurrentJobRole() {
    if (isCustomJobMode) {
      return inputJobCustom.value.trim() || "Web developer";
    }
    return inputJobSelect.value !== "__custom__" ? inputJobSelect.value : "Web developer";
  }

  function setPayMode(mode) {
    currentMode = mode;

    if (mode === "hourly") {
      chooseHourlyBtn.classList.add("active");
      chooseHourlyBtn.setAttribute("aria-selected", "true");
      chooseDailyBtn.classList.remove("active");
      chooseDailyBtn.setAttribute("aria-selected", "false");

      hourlyFieldsContainer.classList.add("active");
      dailyFieldsContainer.classList.remove("active");

      activeRateLabel.textContent = "Active Rate:";
      activePayUnit.textContent = "/ hr";
      liveNetPeriod.textContent = "/ hr";
      benchmarkUnit.textContent = "/ hr";

      rowHourly.classList.add("highlight-row");
      rowDaily.classList.remove("highlight-row");

      if (badgeMonthlyOptional) {
        badgeMonthlyOptional.style.display = "none";
      }
      setMonthlyPopup(false);

      const dailyVal = parseFloat(dailyRateInput.value);
      if (dailyVal > 0 && (!hourlyRateInput.value || parseFloat(hourlyRateInput.value) <= 0)) {
        hourlyRateInput.value = (dailyVal / 8).toFixed(2);
      }
    } else {
      chooseDailyBtn.classList.add("active");
      chooseDailyBtn.setAttribute("aria-selected", "true");
      chooseHourlyBtn.classList.remove("active");
      chooseHourlyBtn.setAttribute("aria-selected", "false");

      dailyFieldsContainer.classList.add("active");
      hourlyFieldsContainer.classList.remove("active");

      activeRateLabel.textContent = "Active Rate:";
      activePayUnit.textContent = "/ day";
      liveNetPeriod.textContent = "/ day";
      benchmarkUnit.textContent = "/ day";

      rowDaily.classList.add("highlight-row");
      rowHourly.classList.remove("highlight-row");

      if (badgeMonthlyOptional) {
        badgeMonthlyOptional.style.display = "flex";
      }

      const hourlyVal = parseFloat(hourlyRateInput.value);
      if (hourlyVal > 0 && (!dailyRateInput.value || parseFloat(dailyRateInput.value) <= 0)) {
        dailyRateInput.value = (hourlyVal * 8).toFixed(2);
      }
    }

    calculatePaycheck();
  }

  chooseHourlyBtn.addEventListener("click", () => setPayMode("hourly"));
  chooseDailyBtn.addEventListener("click", () => setPayMode("daily"));

  function setCurrency(currency) {
    if (currentCurrency === currency) return;

    const prevCurrency = currentCurrency;
    currentCurrency = currency;

    if (currentCurrency === "PHP") {
      currencyPhpBtn.classList.add("active");
      currencyPhpBtn.setAttribute("aria-checked", "true");
      currencyUsdBtn.classList.remove("active");
      currencyUsdBtn.setAttribute("aria-checked", "false");

      currSymElements.forEach((el) => { el.textContent = "₱"; });

      if (prevCurrency === "USD") {
        hourlyRateInput.value = (parseFloat(hourlyRateInput.value || 33) * USD_TO_PHP_RATE).toFixed(2);
        dailyRateInput.value = (parseFloat(dailyRateInput.value || 264) * USD_TO_PHP_RATE).toFixed(2);
      }
    } else {
      currencyUsdBtn.classList.add("active");
      currencyUsdBtn.setAttribute("aria-checked", "true");
      currencyPhpBtn.classList.remove("active");
      currencyPhpBtn.setAttribute("aria-checked", "false");

      currSymElements.forEach((el) => { el.textContent = "$"; });

      if (prevCurrency === "PHP") {
        hourlyRateInput.value = (parseFloat(hourlyRateInput.value || 1914) / USD_TO_PHP_RATE).toFixed(2);
        dailyRateInput.value = (parseFloat(dailyRateInput.value || 15312) / USD_TO_PHP_RATE).toFixed(2);
      }
    }

    calculatePaycheck();
  }

  currencyUsdBtn.addEventListener("click", () => setCurrency("USD"));
  currencyPhpBtn.addEventListener("click", () => setCurrency("PHP"));

  function formatMoney(amount) {
    const sym = currentCurrency === "PHP" ? "₱" : "$";
    const num = (amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${sym}${num}`;
  }

  function calculatePaycheck() {
    const jobRole = getCurrentJobRole();

    let hRate = 0;
    let dRate = 0;
    let daysPerMonth = 22;

    if (inputDaysPerMonth) {
      const parsedDays = parseFloat(inputDaysPerMonth.value);
      if (!isNaN(parsedDays) && parsedDays > 0) {
        daysPerMonth = parsedDays;
      }
    }

    if (currentMode === "hourly") {
      hRate = Math.max(0, parseFloat(hourlyRateInput.value) || 0);
      dRate = hRate * 8;
    } else {
      dRate = Math.max(0, parseFloat(dailyRateInput.value) || 0);
      hRate = dRate / 8;
    }

    const wGross = hRate * 40;
    const mGross = currentMode === "daily" ? (dRate * daysPerMonth) : (wGross * (52 / 12));

    if (currentMode === "hourly") {
      activePayAmount.textContent = formatMoney(hRate);
      liveNetHero.textContent = formatMoney(hRate);
      if (labelMonthly) {
        labelMonthly.textContent = "Monthly";
      }
    } else {
      activePayAmount.textContent = formatMoney(dRate);
      liveNetHero.textContent = formatMoney(dRate);
      if (previewMonthlyTotal) {
        previewMonthlyTotal.textContent = formatMoney(mGross);
      }
      if (badgeDaysCount) {
        badgeDaysCount.textContent = daysPerMonth;
      }
      if (badgeMonthlyPay) {
        badgeMonthlyPay.textContent = formatMoney(mGross);
      }
      if (labelMonthly) {
        labelMonthly.textContent = `Monthly (${daysPerMonth}d)`;
      }
    }

    tableHourlyPay.textContent = formatMoney(hRate);
    tableDailyPay.textContent = formatMoney(dRate);
    tableWeeklyPay.textContent = formatMoney(wGross);
    tableMonthlyPay.textContent = formatMoney(mGross);

    const normalizedRole = jobRole.toLowerCase();
    const baseHourlyBenchmark = JOB_BENCHMARKS_HOURLY[normalizedRole] || 30.87;
    const benchmarkRateUsd = currentMode === "hourly" ? baseHourlyBenchmark : (baseHourlyBenchmark * 8);
    const benchmarkTarget = currentCurrency === "PHP" ? (benchmarkRateUsd * USD_TO_PHP_RATE) : benchmarkRateUsd;

    if (currentCurrency === "PHP") {
      benchmarkAmount.textContent = `₱${Math.round(benchmarkTarget).toLocaleString("en-US")}`;
    } else {
      benchmarkAmount.textContent = `$${benchmarkTarget.toFixed(2)}`;
    }

    const compareBase = currentMode === "hourly" ? hRate : dRate;
    const deltaPercent = benchmarkTarget > 0 ? (((compareBase - benchmarkTarget) / benchmarkTarget) * 100) : 0;
    const displayJob = jobRole || "your profession";
    if (deltaPercent >= 0) {
      benchmarkComparisonText.textContent = `Earning ${deltaPercent.toFixed(1)}% above average for ${displayJob}`;
    } else {
      benchmarkComparisonText.textContent = `Earning ${Math.abs(deltaPercent).toFixed(1)}% below average for ${displayJob}`;
    }
  }

  const inputsToListen = [
    inputAge,
    hourlyRateInput, dailyRateInput
  ];

  inputsToListen.forEach((elem) => {
    if (elem) {
      elem.addEventListener("input", calculatePaycheck);
      elem.addEventListener("change", calculatePaycheck);
    }
  });

  if (createOverviewBtn) {
    createOverviewBtn.addEventListener("click", function () {
      calculatePaycheck();
      this.textContent = "Overview Updated ✓";
      setTimeout(() => {
        this.textContent = "Create salary overview";
      }, 1000);
    });
  }

  setPayMode("hourly");
});