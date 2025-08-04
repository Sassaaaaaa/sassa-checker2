document.getElementById("grantType").addEventListener("change", function () {
  const isSRD = this.value === "srd";
  document.getElementById("employmentField").style.display = isSRD ? "block" : "none";
});

document.getElementById("eligibilityForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const grantType = document.getElementById("grantType").value;
  const married = document.getElementById("married").value;
  const unemployed = document.getElementById("unemployed").value;
  const incomeRaw = document.getElementById("income").value.replace(/[^\d]/g, "");
  const income = parseInt(incomeRaw);

  let reasons = [];

  if (grantType === "oldAge") {
    if (age < 60) {
      reasons.push("❌ You must be at least 60 years old.");
    }
    if (married === "single" && income > 8070) {
      reasons.push("❌ As a single person, your income must not exceed R8,070.");
    }
    if (married === "married" && income > 16140) {
      reasons.push("❌ As a married couple, combined income must not exceed R16,140.");
    }
  }

  if (grantType === "srd") {
    if (age < 18) {
      reasons.push("❌ You must be 18 or older.");
    }
    if (unemployed !== "yes") {
      reasons.push("❌ You must be unemployed to qualify.");
    }
    if (income > 624) {
      reasons.push("❌ Your income must not exceed R624.");
    }
  }

  const resultDiv = document.getElementById("result");

  if (reasons.length === 0) {
    resultDiv.innerHTML = "✅ Based on your input, you may be eligible.";
  } else {
    resultDiv.innerHTML = `<strong>You may not qualify for the grant due to:</strong><ul>${reasons.map(r => `<li>${r}</li>`).join('')}</ul>`;
  }
});

document.getElementById("language").addEventListener("change", function () {
  const lang = this.value;

  const translations = {
    en: {
      grantLabel: "Grant Type:",
      ageLabel: "Age:",
      maritalLabel: "Marital Status:",
      incomeLabel: "Monthly Income:",
      unemployedLabel: "Unemployed?"
    },
    zu: {
      grantLabel: "Uhlobo Lomxhaso:",
      ageLabel: "Iminyaka:",
      maritalLabel: "Isimo Somshado:",
      incomeLabel: "Inzuzo Yanyanga Zonke:",
      unemployedLabel: "Awusebenzi?"
    },
    xh: {
      grantLabel: "Uhlobo Lwenkxaso-mali:",
      ageLabel: "Ubudala:",
      maritalLabel: "Ubume Botshatileyo:",
      incomeLabel: "Ingeniso Yenyanga:",
      unemployedLabel: "Awusebenzi?"
    }
  };

  const t = translations[lang];

  document.getElementById("grantLabel").textContent = t.grantLabel;
  document.getElementById("ageLabel").textContent = t.ageLabel;
  document.getElementById("maritalLabel").textContent = t.maritalLabel;
  document.getElementById("incomeLabel").textContent = t.incomeLabel;
  document.getElementById("unemployedLabel").textContent = t.unemployedLabel;
});
