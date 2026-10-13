/**
 * EXACT REFERENCE BMI CALCULATOR ENGINE
 * Pixel-perfect functionality matching reference design (Calculator.net standard)
 */

(function () {
  'use strict';

  // State
  let currentTab = 'us'; // 'us', 'metric', 'other'

  // DOM Elements
  function getElements() {
    return {
      // Tabs
      tabUs: document.getElementById('refTabUs'),
      tabMetric: document.getElementById('refTabMetric'),
      tabOther: document.getElementById('refTabOther'),
      
      // Panels
      panelUs: document.getElementById('refPanelUs'),
      panelMetric: document.getElementById('refPanelMetric'),
      panelOther: document.getElementById('refPanelOther'),

      // Common inputs
      inAge: document.getElementById('refInAge'),
      genderMale: document.getElementById('refGenderMale'),
      genderFemale: document.getElementById('refGenderFemale'),

      // US Inputs
      inHeightFt: document.getElementById('refHeightFt'),
      inHeightIn: document.getElementById('refHeightIn'),
      inWeightLbs: document.getElementById('refWeightLbs'),

      // Metric Inputs
      inHeightCm: document.getElementById('refHeightCm'),
      inWeightKg: document.getElementById('refWeightKg'),

      // Other Inputs
      inOtherHeight: document.getElementById('refOtherHeight'),
      selOtherHeightUnit: document.getElementById('refOtherHeightUnit'),
      inOtherWeight: document.getElementById('refOtherWeight'),
      selOtherWeightUnit: document.getElementById('refOtherWeightUnit'),
      inOtherWeightSt: document.getElementById('refOtherWeightSt'),
      inOtherWeightLbs2: document.getElementById('refOtherWeightLbs2'),
      otherStonesRow: document.getElementById('refOtherStonesRow'),
      otherSimpleWeightRow: document.getElementById('refOtherSimpleWeightRow'),

      // Buttons
      btnCalculate: document.getElementById('refBtnCalculate'),
      btnClear: document.getElementById('refBtnClear'),
      btnSave: document.getElementById('refBtnSave'),
      btnPrint: document.getElementById('refBtnPrint'),

      // Results
      resScore: document.getElementById('refResScore'),
      resCategory: document.getElementById('refResCategory'),
      gaugeNeedle: document.getElementById('refGaugeNeedle'),
      gaugeCenterText: document.getElementById('refGaugeCenterText'),
      detHealthyRange: document.getElementById('refDetHealthyRange'),
      detHealthyWeight: document.getElementById('refDetHealthyWeight'),
      detPonderalIndex: document.getElementById('refDetPonderalIndex'),
      toast: document.getElementById('refToast')
    };
  }

  // Calculate needle rotation angle based on BMI value
  function calculateNeedleAngle(bmi) {
    if (bmi <= 15) return 0;
    if (bmi < 16) return (bmi - 15) * 18;
    if (bmi < 17) return 18 + (bmi - 16) * 6;
    if (bmi < 18.5) return 24 + ((bmi - 17) / 1.5) * 9;
    if (bmi < 25) return 33 + ((bmi - 18.5) / 6.5) * 39; // At BMI 23 => 33 + 27 = 60°
    if (bmi < 30) return 72 + ((bmi - 25) / 5) * 30;
    if (bmi < 35) return 102 + ((bmi - 30) / 5) * 30;
    if (bmi < 40) return 132 + ((bmi - 35) / 5) * 30;
    return 162 + Math.min(18, ((bmi - 40) / 10) * 18);
  }

  let currentNeedleAngle = 60;
  let animFrameId = null;

  function animateNeedleTo(targetAngle) {
    const needle = document.getElementById('refGaugeNeedle');
    if (!needle) return;

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
    }

    const startAngle = currentNeedleAngle;
    const startTime = performance.now();
    const duration = 500;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + (targetAngle - startAngle) * ease;
      needle.setAttribute('transform', `rotate(${angle} 140 140)`);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        currentNeedleAngle = targetAngle;
        needle.setAttribute('transform', `rotate(${targetAngle} 140 140)`);
      }
    }

    animFrameId = requestAnimationFrame(step);
  }

  // Get category info (name, color)
  function getCategoryInfo(bmi) {
    if (bmi < 16) {
      return { name: 'Severe Thinness', color: '#bc2020' };
    } else if (bmi < 17) {
      return { name: 'Moderate Thinness', color: '#d38888' };
    } else if (bmi < 18.5) {
      return { name: 'Mild Thinness', color: '#c89600' };
    } else if (bmi < 25) {
      return { name: 'Normal', color: '#008137' };
    } else if (bmi < 30) {
      return { name: 'Overweight', color: '#c89600' };
    } else if (bmi < 35) {
      return { name: 'Obese Class I', color: '#d38888' };
    } else if (bmi < 40) {
      return { name: 'Obese Class II', color: '#bc2020' };
    } else {
      return { name: 'Obese Class III', color: '#8a0101' };
    }
  }

  // Perform Calculation
  function calculate() {
    const el = getElements();
    let heightMeters = 0;
    let weightKg = 0;

    if (currentTab === 'us') {
      const ft = parseFloat(el.inHeightFt.value) || 0;
      const inch = parseFloat(el.inHeightIn.value) || 0;
      const lbs = parseFloat(el.inWeightLbs.value) || 0;

      const totalInches = ft * 12 + inch;
      if (totalInches <= 0 || lbs <= 0) return;

      heightMeters = totalInches * 0.0254;
      weightKg = lbs * 0.45359237;

    } else if (currentTab === 'metric') {
      const cm = parseFloat(el.inHeightCm.value) || 0;
      const kg = parseFloat(el.inWeightKg.value) || 0;

      if (cm <= 0 || kg <= 0) return;

      heightMeters = cm / 100;
      weightKg = kg;

    } else if (currentTab === 'other') {
      const hVal = parseFloat(el.inOtherHeight.value) || 0;
      const hUnit = el.selOtherHeightUnit ? el.selOtherHeightUnit.value : 'm';

      if (hUnit === 'm') {
        heightMeters = hVal;
      } else if (hUnit === 'cm') {
        heightMeters = hVal / 100;
      } else if (hUnit === 'in') {
        heightMeters = hVal * 0.0254;
      }

      const wUnit = el.selOtherWeightUnit ? el.selOtherWeightUnit.value : 'kg';
      if (wUnit === 'st') {
        const stones = parseFloat(el.inOtherWeightSt.value) || 0;
        const lbs2 = parseFloat(el.inOtherWeightLbs2.value) || 0;
        const totalLbs = stones * 14 + lbs2;
        weightKg = totalLbs * 0.45359237;
      } else if (wUnit === 'kg') {
        weightKg = parseFloat(el.inOtherWeight.value) || 0;
      } else if (wUnit === 'lbs') {
        weightKg = (parseFloat(el.inOtherWeight.value) || 0) * 0.45359237;
      }
    }

    if (heightMeters <= 0 || weightKg <= 0) return;

    // BMI Formula
    const rawBmi = weightKg / (heightMeters * heightMeters);
    const roundedBmi = Math.round(rawBmi * 10) / 10;
    const displayBmi = (roundedBmi % 1 === 0) ? roundedBmi.toFixed(0) : roundedBmi.toFixed(1);

    // Update headline score
    if (el.resScore) {
      el.resScore.textContent = displayBmi;
    }

    // Category
    const cat = getCategoryInfo(rawBmi);
    if (el.resCategory) {
      el.resCategory.textContent = cat.name;
      el.resCategory.style.color = cat.color;
    }

    // Center text in gauge
    if (el.gaugeCenterText) {
      el.gaugeCenterText.textContent = 'BMI = ' + displayBmi;
    }

    // Rotate needle with smooth animation
    const targetAngle = calculateNeedleAngle(rawBmi);
    animateNeedleTo(targetAngle);

    // Healthy weight range (BMI 18.5 - 25.0)
    const minKg = 18.5 * heightMeters * heightMeters;
    const maxKg = 25.0 * heightMeters * heightMeters;

    if (el.detHealthyRange) {
      el.detHealthyRange.textContent = '18.5 - 25 kg/m²';
    }

    if (el.detHealthyWeight) {
      if (currentTab === 'us') {
        const minLbs = (minKg * 2.20462).toFixed(1);
        const maxLbs = (maxKg * 2.20462).toFixed(1);
        el.detHealthyWeight.textContent = `${minLbs} lbs - ${maxLbs} lbs`;
      } else {
        el.detHealthyWeight.textContent = `${minKg.toFixed(1)} kg - ${maxKg.toFixed(1)} kg`;
      }
    }

    // Ponderal Index (kg/m^3)
    const ponderalIndex = (weightKg / (heightMeters * heightMeters * heightMeters)).toFixed(1);
    if (el.detPonderalIndex) {
      el.detPonderalIndex.textContent = `${ponderalIndex} kg/m³`;
    }

    // Sync other tabs with updated values
    syncOtherTabs(heightMeters, weightKg);
  }

  // Sync inputs across tabs so user doesn't lose state
  function syncOtherTabs(heightMeters, weightKg) {
    const el = getElements();
    if (!heightMeters || !weightKg) return;

    // To Metric
    const cm = Math.round(heightMeters * 100);
    const kg = Math.round(weightKg * 10) / 10;
    if (el.inHeightCm && currentTab !== 'metric') el.inHeightCm.value = cm;
    if (el.inWeightKg && currentTab !== 'metric') el.inWeightKg.value = kg;

    // To US
    const totalInches = heightMeters / 0.0254;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches % 12);
    const lbs = Math.round(weightKg * 2.20462 * 10) / 10;
    if (el.inHeightFt && currentTab !== 'us') el.inHeightFt.value = ft;
    if (el.inHeightIn && currentTab !== 'us') el.inHeightIn.value = inch;
    if (el.inWeightLbs && currentTab !== 'us') el.inWeightLbs.value = lbs;

    // To Other
    if (el.inOtherHeight && currentTab !== 'other') {
      if (el.selOtherHeightUnit && el.selOtherHeightUnit.value === 'm') {
        el.inOtherHeight.value = (Math.round(heightMeters * 100) / 100).toFixed(2);
      }
    }
  }

  // Switch Tabs
  function switchTab(target) {
    currentTab = target;
    const el = getElements();

    // Reset tab active classes
    if (el.tabUs) el.tabUs.classList.remove('active');
    if (el.tabMetric) el.tabMetric.classList.remove('active');
    if (el.tabOther) el.tabOther.classList.remove('active');

    // Hide panels
    if (el.panelUs) el.panelUs.style.display = 'none';
    if (el.panelMetric) el.panelMetric.style.display = 'none';
    if (el.panelOther) el.panelOther.style.display = 'none';

    // Show target
    if (target === 'us') {
      if (el.tabUs) el.tabUs.classList.add('active');
      if (el.panelUs) el.panelUs.style.display = 'block';
    } else if (target === 'metric') {
      if (el.tabMetric) el.tabMetric.classList.add('active');
      if (el.panelMetric) el.panelMetric.style.display = 'block';
    } else if (target === 'other') {
      if (el.tabOther) el.tabOther.classList.add('active');
      if (el.panelOther) el.panelOther.style.display = 'block';
    }

    calculate();
  }

  // Clear Form
  function clearForm() {
    const el = getElements();
    if (el.inAge) el.inAge.value = '25';
    if (el.genderMale) el.genderMale.checked = true;

    // Reset US
    if (el.inHeightFt) el.inHeightFt.value = '5';
    if (el.inHeightIn) el.inHeightIn.value = '10';
    if (el.inWeightLbs) el.inWeightLbs.value = '160';

    // Reset Metric
    if (el.inHeightCm) el.inHeightCm.value = '178';
    if (el.inWeightKg) el.inWeightKg.value = '72.6';

    // Reset Other
    if (el.inOtherHeight) el.inOtherHeight.value = '1.78';
    if (el.inOtherWeight) el.inOtherWeight.value = '72.6';
    if (el.inOtherWeightSt) el.inOtherWeightSt.value = '11';
    if (el.inOtherWeightLbs2) el.inOtherWeightLbs2.value = '6';

    calculate();
    showToast('Reset to default values: 25 yrs, 5\'10", 160 lbs (BMI = 23)');
  }

  // Toast Notification
  function showToast(message) {
    const el = getElements();
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.style.display = 'block';
    setTimeout(function () {
      el.toast.style.display = 'none';
    }, 2800);
  }

  // Save Result
  function saveResult() {
    const el = getElements();
    const score = el.resScore ? el.resScore.textContent : '23';
    const cat = el.resCategory ? el.resCategory.textContent : 'Normal';
    const age = el.inAge ? el.inAge.value : '25';
    const gender = el.genderMale && el.genderMale.checked ? 'Male' : 'Female';

    const saveObj = {
      bmi: score,
      category: cat,
      age: age,
      gender: gender,
      timestamp: new Date().toLocaleString()
    };

    try {
      localStorage.setItem('habitfix_bmi_saved', JSON.stringify(saveObj));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    showToast(`Saved calculation! BMI = ${score} kg/m² (${cat})`);
  }

  // Initialize
  function init() {
    const el = getElements();
    if (!el.btnCalculate) return;

    // Tab events
    if (el.tabUs) el.tabUs.addEventListener('click', function (e) { e.preventDefault(); switchTab('us'); });
    if (el.tabMetric) el.tabMetric.addEventListener('click', function (e) { e.preventDefault(); switchTab('metric'); });
    if (el.tabOther) el.tabOther.addEventListener('click', function (e) { e.preventDefault(); switchTab('other'); });

    // Calculate & Clear
    el.btnCalculate.addEventListener('click', function (e) {
      e.preventDefault();
      calculate();
    });

    if (el.btnClear) {
      el.btnClear.addEventListener('click', function (e) {
        e.preventDefault();
        clearForm();
      });
    }

    // Save & Print
    if (el.btnSave) {
      el.btnSave.addEventListener('click', function (e) {
        e.preventDefault();
        saveResult();
      });
    }

    if (el.btnPrint) {
      el.btnPrint.addEventListener('click', function (e) {
        e.preventDefault();
        window.print();
      });
    }

    // Other unit dropdown change
    if (el.selOtherWeightUnit) {
      el.selOtherWeightUnit.addEventListener('change', function () {
        if (this.value === 'st') {
          if (el.otherStonesRow) el.otherStonesRow.style.display = 'flex';
          if (el.otherSimpleWeightRow) el.otherSimpleWeightRow.style.display = 'none';
        } else {
          if (el.otherStonesRow) el.otherStonesRow.style.display = 'none';
          if (el.otherSimpleWeightRow) el.otherSimpleWeightRow.style.display = 'flex';
          const tag = document.getElementById('refOtherWeightTag');
          if (tag) tag.textContent = this.value;
        }
      });
    }

    // Input Enter key triggers calculate
    const inputs = document.querySelectorAll('.calc-ref-outer input[type="text"]');
    inputs.forEach(function (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          calculate();
        }
      });
    });

    // Run initial calculate for reference state (BMI = 23 Normal)
    calculate();
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for external trigger
  window.refBmiCalculate = calculate;
})();
