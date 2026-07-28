"use strict";

/*
 * GAZA / PULSE dashboard interaction layer.
 * All values below are illustrative UI/UX prototype data.
 * Replace this object with validated API responses for production use.
 */

const THEMES = {
  social: {
    key: "social",
    name: "Social Cohesion",
    short: "Social",
    icon: "◎",
    color: "#9b7cff",
    rgb: "155,124,255",
    description:
      "Cohesion, trust, protection and meaningful community participation.",
    score: 72.4,
    sample: 1248,
    priority: 82,
    confidence: 91,
    strength: 78,
    response: 86,
    trend: [64, 66, 65, 68, 69, 71, 72.4],
    radar: [74, 61, 68, 77, 71],
    correlation: 0.72,
    deltaLabels: ["+12%", "+2.4", "+6", "+9%", "+3%", "+4%"],
    coverage: [98, 95, 80, 73, 57],
    regionCounts: [354, 286, 241, 219, 148],
    issues: [
      ["Inter-community cohesion", 82, "+9%"],
      ["Safety and protection", 74, "+6%"],
      ["Trust in local actors", 61, "−3%"],
      ["Women and youth participation", 57, "+12%"],
      ["Access to feedback channels", 52, "+4%"],
    ],
    insights: [
      [
        "positive",
        "Cohesion improved in Middle Area",
        "+8 points after facilitated dialogue sessions.",
      ],
      [
        "critical",
        "Youth are underrepresented in Rafah",
        "The current evidence gap is 34 responses.",
      ],
      [
        "watch",
        "Trust is lower among people aged 45+",
        "11 points below the filtered average.",
      ],
    ],
    action:
      "Expand dialogue sessions in Rafah and North Gaza, with a targeted youth and women sample in the next collection wave.",
    sentiment: { positive: 48, neutral: 31, negative: 21, net: "+8.4" },
    risks: [
      ["R1", 4, 4, "Enumerator access"],
      ["R2", 5, 3, "Participant privacy"],
      ["R3", 3, 4, "Rafah sample gap"],
      ["R4", 2, 3, "Expectation harm"],
    ],
    profile: {
      gender: [52, 47, 1],
      ages: [31, 34, 20, 15],
      inclusion: ["12.6%", "37%", "41%", "68%"],
    },
    medianResponse: "3.2 days",
    fieldQuality: [91, 96, 78, 94],
    questions: [
      ["Which issue most affects your daily life?", "Emerging signal"],
      ["How much do you trust local actors?", "Trust index"],
      ["Did you receive clear feedback instructions?", "Coverage / access"],
    ],
  },
  economic: {
    key: "economic",
    name: "Economic Resilience",
    short: "Economic",
    icon: "↗",
    color: "#2dd4bf",
    rgb: "45,212,191",
    description:
      "Livelihoods, purchasing power, employment and assistance equity.",
    score: 64.8,
    sample: 1103,
    priority: 88,
    confidence: 87,
    strength: 83,
    response: 81,
    trend: [70, 69, 68, 67, 66, 65, 64.8],
    radar: [59, 58, 71, 62, 55],
    correlation: 0.66,
    deltaLabels: ["+8%", "−1.2", "+9", "+17%", "+2%", "+1%"],
    coverage: [92, 88, 78, 69, 52],
    regionCounts: [313, 253, 213, 194, 130],
    issues: [
      ["Rising cost of essentials", 88, "+17%"],
      ["Loss of income sources", 81, "+8%"],
      ["Fairness of aid distribution", 76, "+11%"],
      ["Temporary work opportunities", 63, "+4%"],
      ["Household debt pressure", 58, "+13%"],
    ],
    insights: [
      [
        "critical",
        "Economic pressure is rising in Khan Younis",
        "Priority increased 14% during this cycle.",
      ],
      [
        "positive",
        "Cash support correlates with higher trust",
        "+6 points among verified recipients.",
      ],
      [
        "watch",
        "Disability representation remains low",
        "The sample is 4.2% below its inclusion target.",
      ],
    ],
    action:
      "Prioritise price monitoring and cash-for-work in Khan Younis, linked to a weekly feedback closure target.",
    sentiment: { positive: 31, neutral: 33, negative: 36, net: "−5.0" },
    risks: [
      ["R1", 5, 4, "Price volatility"],
      ["R2", 4, 4, "Aid exclusion"],
      ["R3", 4, 3, "Market access"],
      ["R4", 3, 3, "Household debt exposure"],
    ],
    profile: {
      gender: [49, 50, 1],
      ages: [29, 38, 21, 12],
      inclusion: ["11.2%", "42%", "39%", "65%"],
    },
    medianResponse: "4.1 days",
    fieldQuality: [89, 93, 73, 91],
    questions: [
      ["What is your household’s primary income source?", "Economic signal"],
      ["How has purchasing power changed in 30 days?", "Pressure index"],
      ["Did your household receive assistance?", "Assistance coverage"],
    ],
  },
  political: {
    key: "political",
    name: "Civic & Political",
    short: "Political",
    icon: "◇",
    color: "#f6b84a",
    rgb: "246,184,74",
    description:
      "Trust, representation, participation and access to decision-making.",
    score: 58.6,
    sample: 982,
    priority: 71,
    confidence: 83,
    strength: 69,
    response: 76,
    trend: [55, 57, 56, 59, 60, 59, 58.6],
    radar: [54, 49, 66, 58, 53],
    correlation: 0.58,
    deltaLabels: ["+5%", "−0.4", "+3", "+10%", "+1%", "−2%"],
    coverage: [86, 82, 71, 64, 48],
    regionCounts: [279, 225, 190, 173, 115],
    issues: [
      ["Access to reliable information", 71, "+10%"],
      ["Community representation", 68, "+5%"],
      ["Trust in complaint mechanisms", 59, "−7%"],
      ["Youth role in decisions", 54, "+2%"],
      ["Women in local committees", 48, "+1%"],
    ],
    insights: [
      [
        "critical",
        "Complaint-channel trust is declining",
        "The decline is clearest in North Gaza.",
      ],
      [
        "positive",
        "Local information is more trusted",
        "13-point advantage over general channels.",
      ],
      [
        "watch",
        "Women’s representation is uneven",
        "Lowest among respondents aged 25–44.",
      ],
    ],
    action:
      "Simplify complaint pathways and publish a weekly received-versus-closed case summary by governorate.",
    sentiment: { positive: 28, neutral: 38, negative: 34, net: "−4.6" },
    risks: [
      ["R1", 5, 4, "Retaliation concern"],
      ["R2", 5, 3, "Participant anonymity"],
      ["R3", 4, 3, "Representation bias"],
      ["R4", 3, 3, "Misinformation"],
    ],
    profile: {
      gender: [46, 53, 1],
      ages: [35, 31, 19, 15],
      inclusion: ["10.4%", "35%", "44%", "67%"],
    },
    medianResponse: "4.6 days",
    fieldQuality: [86, 91, 69, 89],
    questions: [
      ["Which information source do you trust most?", "Information trust"],
      ["How represented do you feel in decisions?", "Representation index"],
      ["Did you use a complaint mechanism?", "Mechanism access"],
    ],
  },
  environmental: {
    key: "environmental",
    name: "Environmental Safety",
    short: "Environmental",
    icon: "⌁",
    color: "#4ade80",
    rgb: "74,222,128",
    description: "Water, waste, shelter and environmental health risks.",
    score: 76.2,
    sample: 1187,
    priority: 91,
    confidence: 90,
    strength: 89,
    response: 84,
    trend: [68, 70, 71, 72, 74, 75, 76.2],
    radar: [68, 64, 82, 75, 67],
    correlation: 0.79,
    deltaLabels: ["+11%", "+3.2", "+12", "+22%", "+4%", "+5%"],
    coverage: [95, 91, 84, 76, 59],
    regionCounts: [337, 272, 229, 209, 140],
    issues: [
      ["Access to safe water", 91, "+22%"],
      ["Waste accumulation", 84, "+15%"],
      ["Shelter safety", 79, "+8%"],
      ["Water-related disease", 66, "+12%"],
      ["Sanitation access", 61, "+9%"],
    ],
    insights: [
      [
        "critical",
        "Water is the fastest-rising signal",
        "+22% compared with the previous cycle.",
      ],
      [
        "positive",
        "Waste collection improved in Gaza",
        "Community reports decreased by 9%.",
      ],
      [
        "watch",
        "Rafah coverage is below comparison level",
        "47 additional verified responses are needed.",
      ],
    ],
    action:
      "Open a focused collection wave in Rafah and refer critical water signals to response teams within 24 hours.",
    sentiment: { positive: 39, neutral: 34, negative: 27, net: "+3.1" },
    risks: [
      ["R1", 5, 5, "Water contamination"],
      ["R2", 4, 4, "Disease exposure"],
      ["R3", 4, 3, "Enumerator access"],
      ["R4", 3, 4, "Rafah coverage gap"],
    ],
    profile: {
      gender: [54, 45, 1],
      ages: [30, 35, 22, 13],
      inclusion: ["13.1%", "40%", "42%", "70%"],
    },
    medianResponse: "2.8 days",
    fieldQuality: [92, 95, 77, 93],
    questions: [
      ["What is the most urgent environmental risk nearby?", "Risk signal"],
      ["How safe is your household water?", "Water safety index"],
      ["Is waste collected regularly?", "Service coverage"],
    ],
  },
};

const REGION_FILTERS = {
  "All governorates": { factor: 1, delta: 0, index: -1 },
  Gaza: { factor: 0.284, delta: 3, index: 0 },
  "Middle Area": { factor: 0.229, delta: 4, index: 1 },
  "Khan Younis": { factor: 0.193, delta: -1, index: 2 },
  "North Gaza": { factor: 0.176, delta: -4, index: 3 },
  Rafah: { factor: 0.119, delta: -7, index: 4 },
};

const state = {
  theme: "social",
  region: "All governorates",
  gender: "All genders",
  age: "All ages",
};

const dashboard = document.querySelector(".dashboard");
const analytics = document.querySelector(".analytics-shell");
const themeCards = [...document.querySelectorAll(".theme-card[data-theme]")];
const filterSelects = [...document.querySelectorAll(".filters select")];

const clamp = (value, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));

const formatNumber = (value) =>
  Math.round(value).toLocaleString("en-US");

const getFilteredMetrics = (theme) => {
  const region = REGION_FILTERS[state.region] || REGION_FILTERS["All governorates"];
  const genderFactor =
    state.gender === "Women" ? 0.52 : state.gender === "Men" ? 0.45 : 1;
  const ageFactor =
    state.age === "18–24"
      ? 0.31
      : state.age === "25–44"
        ? 0.46
        : state.age === "45+"
          ? 0.23
          : 1;

  const sample = Math.max(
    1,
    Math.round(theme.sample * region.factor * genderFactor * ageFactor),
  );
  const score = clamp(
    theme.score +
      region.delta +
      (state.gender === "Women" ? 1.2 : 0) +
      (state.age === "45+" ? -3.4 : 0),
  );
  const velocity = clamp(
    50 + (theme.trend.at(-1) - theme.trend[0]) * 4,
  );
  const readiness =
    theme.priority * 0.3 +
    74 * 0.2 +
    theme.confidence * 0.25 +
    velocity * 0.15 +
    68 * 0.1;

  return { region, sample, score, velocity, readiness };
};

const setSparkline = (polyline, values) => {
  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const range = Math.max(1, max - min);
  const points = values
    .map(
      (value, index) =>
        `${index * 24},${32 - ((value - min) / range) * 27}`,
    )
    .join(" ");
  polyline.setAttribute("points", points);
};

const animateUpdate = () => {
  analytics.classList.remove("theme-updated");
  void analytics.offsetWidth;
  analytics.classList.add("theme-updated");
};

const updateHeader = (theme, metrics) => {
  dashboard.style.setProperty("--accent", theme.color);
  dashboard.style.setProperty("--accent-rgb", theme.rgb);

  themeCards.forEach((card) => {
    const active = card.dataset.theme === theme.key;
    card.classList.toggle("active", active);
    card.setAttribute("aria-current", active ? "true" : "false");
  });

  const selectedTheme = document.querySelector(".selected-theme");
  selectedTheme.querySelector(":scope > span").textContent = theme.icon;
  selectedTheme.querySelector("h2").textContent = theme.name;
  selectedTheme.querySelector("p").textContent = theme.description;

  const heroDecision = document.querySelector(".hero-decision");
  const readinessRing = heroDecision.querySelector(".readiness-ring");
  readinessRing.style.setProperty(
    "--ring-value",
    `${metrics.readiness.toFixed(1)}%`,
  );
  readinessRing.querySelector("strong").textContent =
    metrics.readiness.toFixed(1);
  heroDecision.querySelector("h3").textContent = theme.name;
  heroDecision.querySelector(".threshold b").style.width =
    `${metrics.readiness}%`;

  const status = heroDecision.querySelector(".status-live");
  status.lastChild.textContent =
    metrics.readiness >= 75
      ? "Ready with conditions"
      : metrics.readiness >= 65
        ? "Review before action"
        : "Evidence strengthening required";
};

const updateKpis = (theme, metrics) => {
  const cards = [...document.querySelectorAll(".kpi-card")];
  const kpis = [
    {
      value: formatNumber(metrics.sample),
      progress: Math.min(100, Math.round((metrics.sample / theme.sample) * 86)),
      spark: [62, 68, 65, 72, 74, 79, 86],
    },
    {
      value: metrics.score.toFixed(1),
      progress: metrics.score,
      spark: theme.trend.map((value) => value + metrics.score - theme.score),
    },
    {
      value: theme.strength,
      progress: theme.strength,
      spark: [
        theme.strength - 13,
        theme.strength - 11,
        theme.strength - 8,
        theme.strength - 9,
        theme.strength - 4,
        theme.strength - 2,
        theme.strength,
      ],
    },
    {
      value: theme.priority,
      progress: theme.priority,
      spark: [
        theme.priority - 19,
        theme.priority - 16,
        theme.priority - 11,
        theme.priority - 7,
        theme.priority - 4,
        theme.priority - 2,
        theme.priority,
      ],
    },
    {
      value: theme.confidence,
      progress: theme.confidence,
      spark: [
        theme.confidence - 13,
        theme.confidence - 11,
        theme.confidence - 9,
        theme.confidence - 6,
        theme.confidence - 7,
        theme.confidence - 3,
        theme.confidence,
      ],
    },
    {
      value: theme.response,
      progress: theme.response,
      spark: [
        theme.response - 17,
        theme.response - 14,
        theme.response - 15,
        theme.response - 10,
        theme.response - 7,
        theme.response - 4,
        theme.response,
      ],
    },
  ];

  cards.forEach((card, index) => {
    const kpi = kpis[index];
    card.querySelector(".kpi-value strong").textContent = kpi.value;
    const delta = card.querySelector(".kpi-value em");
    delta.textContent = theme.deltaLabels[index];
    delta.classList.toggle(
      "negative-delta",
      theme.deltaLabels[index].startsWith("−"),
    );
    card.querySelector(".kpi-progress b").style.width = `${kpi.progress}%`;
    setSparkline(card.querySelector(".sparkline polyline"), kpi.spark);
  });
};

const updateOutcomeTrend = (theme, metrics) => {
  const width = 820;
  const height = 310;
  const scoreShift = metrics.score - theme.score;
  const series = [
    theme.trend.map((value) => value + scoreShift),
    theme.trend.map((value, index) => value - 11 + index * 0.15 + scoreShift),
    theme.trend.map((value, index) => value - 6 + index * 0.35 + scoreShift),
  ];
  const x = (index) => 42 + index * ((width - 76) / 6);
  const y = (value) => 22 + (90 - value) * ((height - 55) / 45);
  const pointString = (values) =>
    values.map((value, index) => `${x(index)},${y(value)}`).join(" ");

  const chart = document.querySelector(".outcome-chart");
  const lines = [
    chart.querySelector(".series-accent"),
    chart.querySelector(".series-cyan"),
    chart.querySelector(".series-lime"),
  ];
  const dotGroups = [
    chart.querySelectorAll(".dots-accent circle"),
    chart.querySelectorAll(".dots-cyan circle"),
    chart.querySelectorAll(".dots-lime circle"),
  ];

  lines.forEach((line, index) =>
    line.setAttribute("points", pointString(series[index])),
  );
  dotGroups.forEach((dots, seriesIndex) => {
    dots.forEach((dot, index) => {
      dot.setAttribute("cx", x(index));
      dot.setAttribute("cy", y(series[seriesIndex][index]));
    });
  });

  const first = series[0];
  chart
    .querySelector(".trend-area")
    .setAttribute(
      "d",
      `M${x(0)} ${y(first[0])} ${first
        .map((value, index) => `L${x(index)} ${y(value)}`)
        .join(" ")} L${x(6)} 282 L${x(0)} 282 Z`,
    );

  const legendValues = chart.querySelectorAll(".chart-legend b");
  legendValues[0].textContent = series[0].at(-1).toFixed(1);
  legendValues[1].textContent = series[1].at(-1).toFixed(1);
  legendValues[2].textContent = series[2].at(-1).toFixed(1);

  const trendBadge = document.querySelector(
    ".outcome-panel .evidence-badge",
  );
  trendBadge.textContent = `n=${formatNumber(metrics.sample)}`;

  const rule = document.querySelector(".decision-rule b");
  const improving = series[0].at(-1) >= series[0].at(-2);
  rule.textContent = improving ? "Stable / improving" : "Escalation triggered";
  rule.className = improving ? "rule-pass" : "rule-alert";
};

const updateGeography = (theme) => {
  const rows = [...document.querySelectorAll(".coverage-row")];
  rows.forEach((row, index) => {
    const coverage = theme.coverage[index];
    row.querySelector("small").textContent =
      `n=${formatNumber(theme.regionCounts[index])}`;
    row.querySelector("i em").style.width = `${coverage}%`;
    row.querySelector("strong").textContent = `${coverage}%`;
    row.classList.toggle("gap", coverage < 60);
    row.classList.toggle(
      "selected",
      REGION_FILTERS[state.region]?.index === index,
    );
  });
};

const updateInsights = (theme) => {
  const insightCards = [...document.querySelectorAll(".live-insights .insight")];
  const icons = { critical: "!", positive: "↗", watch: "◉" };
  insightCards.forEach((card, index) => {
    const [tone, title, detail] = theme.insights[index];
    card.className = `insight ${tone}`;
    card.querySelector(":scope > span").textContent = icons[tone];
    card.querySelector("b").textContent = title;
    card.querySelector("small").textContent = detail;
  });
};

const updateComparison = (theme, metrics) => {
  const groups = [
    [metrics.score - 14, metrics.score - 17, metrics.score - 6],
    [metrics.score - 7, metrics.score - 13, metrics.score + 5],
    [metrics.score, metrics.score - 11, metrics.score + 6],
    [80, 70, 85],
  ];
  const barGroups = [...document.querySelectorAll(".bar-group")];
  barGroups.forEach((group, groupIndex) => {
    const bars = [...group.querySelectorAll(".bars span")];
    bars.forEach((bar, barIndex) => {
      const value = Math.round(clamp(groups[groupIndex][barIndex]));
      bar.style.height = `${value}%`;
      bar.querySelector("b").textContent = value;
    });
  });

  const definition = document.querySelector(
    ".comparison-panel .metric-definition",
  );
  const baselineGap = Math.round(metrics.score - (metrics.score - 14));
  const targetGap = Math.max(0, 80 - Math.round(metrics.score));
  definition.innerHTML =
    `<b>Strength:</b> current index is ${baselineGap} points above baseline; ` +
    `target gap is ${targetGap} points.`;
};

const radarPoint = (index, value) => {
  const cx = 130;
  const cy = 122;
  const radius = 92;
  const angle = -Math.PI / 2 + index * ((Math.PI * 2) / 5);
  const scaledRadius = (radius * value) / 100;
  return [
    cx + Math.cos(angle) * scaledRadius,
    cy + Math.sin(angle) * scaledRadius,
  ];
};

const updateRadar = (theme) => {
  const radar = document.querySelector(".radar");
  const points = theme.radar
    .map((value, index) => radarPoint(index, value).join(","))
    .join(" ");
  radar.querySelector(".radar-value").setAttribute("points", points);
  radar.querySelectorAll("circle").forEach((circle, index) => {
    const [x, y] = radarPoint(index, theme.radar[index]);
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
  });

  const labels = ["Cohesion", "Trust", "Access", "Safety", "Participation"];
  const strongest = labels[theme.radar.indexOf(Math.max(...theme.radar))];
  const weakest = labels[theme.radar.indexOf(Math.min(...theme.radar))];
  const summary = document.querySelectorAll(".radar-summary b");
  summary[0].textContent = strongest;
  summary[1].textContent = weakest;
};

const updateCorrelation = (theme) => {
  const panel = document.querySelector(".correlation-panel");
  const value = theme.correlation.toFixed(2);
  panel.querySelector(".evidence-badge").textContent = `r=${value}`;
  panel.querySelector(".correlation-score strong").textContent = `r = ${value}`;
  panel.querySelector(".correlation-score span").textContent =
    theme.correlation >= 0.7
      ? "Strong relationship"
      : theme.correlation >= 0.5
        ? "Moderate relationship"
        : "Weak relationship";

  const sourcePoints = [
    [18, 26],
    [24, 31],
    [31, 35],
    [39, 44],
    [45, 43],
    [52, 55],
    [58, 59],
    [63, 61],
    [68, 70],
    [74, 72],
    [79, 80],
    [87, 84],
  ];
  const dots = panel.querySelectorAll(".scatter-points circle");
  dots.forEach((dot, index) => {
    const [x, y] = sourcePoints[index];
    const adjustedY = clamp(
      y + (theme.correlation - 0.68) * (x - 50) * 0.55,
      8,
      96,
    );
    dot.setAttribute("cx", 40 + x * 2.7);
    dot.setAttribute("cy", 195 - adjustedY * 1.7);
  });

  const regression = panel.querySelector(".regression");
  regression.setAttribute("y1", 165 + (0.7 - theme.correlation) * 70);
  regression.setAttribute("y2", 48 - (0.7 - theme.correlation) * 45);
};

const updatePriorities = (theme) => {
  const rows = [...document.querySelectorAll(".priority-row")];
  rows.forEach((row, index) => {
    const [name, value, delta] = theme.issues[index];
    row.querySelector("b").textContent = name;
    row.querySelector("i em").style.width = `${value}%`;
    row.querySelector(":scope > strong").textContent = value;
    const deltaElement = row.querySelector("small");
    deltaElement.textContent = delta;
    deltaElement.className = delta.startsWith("−") ? "down" : "up";
  });
};

const updateSentiment = (theme) => {
  const { positive, neutral, negative, net } = theme.sentiment;
  const donut = document.querySelector(".sentiment-donut");
  donut.querySelector("strong").textContent = net;
  donut.style.background =
    "radial-gradient(circle at center,#0c192d 0 53%,transparent 54%)," +
    `conic-gradient(var(--lime) 0 ${positive}%,` +
    `var(--cyan) ${positive}% ${positive + neutral}%,` +
    `var(--red) ${positive + neutral}% 100%)`;
  const legendValues = document.querySelectorAll(
    ".sentiment-content > div:last-child b",
  );
  [positive, neutral, negative].forEach((value, index) => {
    legendValues[index].textContent = `${value}%`;
  });
};

const updateRisks = (theme) => {
  const markers = [...document.querySelectorAll(".heatmap > b")];
  const keyItems = [...document.querySelectorAll(".risk-key span")];
  theme.risks.forEach(([label, x, y, title], index) => {
    const marker = markers[index];
    marker.textContent = label;
    marker.title = title;
    marker.style.gridColumn = x;
    marker.style.gridRow = 6 - y;
    keyItems[index].innerHTML = `<b>${label}</b>${title}`;
  });
};

const updateDecision = (theme, metrics) => {
  const decision = document.querySelector(".decision-center");
  decision.querySelector(".evidence-badge").textContent =
    `${metrics.readiness.toFixed(1)}/100`;

  const formulaCard = decision.querySelector(".formula-card");
  formulaCard.querySelector("h3").textContent =
    `${theme.name}: act with targeted safeguards`;

  const formulaValues = [
    theme.priority,
    74,
    theme.confidence,
    Math.round(metrics.velocity),
    68,
  ];
  formulaCard.querySelectorAll(".formula > div").forEach((row, index) => {
    row.querySelector("i em").style.width = `${formulaValues[index]}%`;
    row.querySelector(":scope > strong").textContent = formulaValues[index];
  });
  formulaCard.querySelector(".formula-equation b").textContent =
    metrics.readiness.toFixed(1);

  const actionCard = decision.querySelector(".action-card");
  actionCard.querySelector("h3").textContent = theme.action;
  const criteria = actionCard.querySelectorAll(".action-criteria b");
  criteria[0].textContent = `${theme.confidence}%`;
  criteria[1].textContent = "74%";
  criteria[2].textContent = `${theme.priority}/100`;
};

const updateProfile = (theme) => {
  const [women, men, other] = theme.profile.gender;
  const genderDonut = document.querySelector(".gender-donut");
  genderDonut.querySelector("b").textContent = `${women}%`;
  genderDonut.style.background =
    "radial-gradient(circle at center,#0c192d 0 53%,transparent 54%)," +
    `conic-gradient(var(--accent) 0 ${women}%,` +
    `var(--cyan) ${women}% ${women + men}%,` +
    `var(--amber) ${women + men}% 100%)`;

  const genderValues = document.querySelectorAll(".sample-legend b");
  [women, men, other].forEach((value, index) => {
    genderValues[index].textContent = `${value}%`;
  });

  const ageRows = [...document.querySelectorAll(".age-profile div")];
  ageRows.forEach((row, index) => {
    const value = theme.profile.ages[index];
    row.querySelector("em").style.width = `${value}%`;
    row.querySelector("b").textContent = `${value}%`;
  });

  const inclusionValues = document.querySelectorAll(".inclusion-cards b");
  theme.profile.inclusion.forEach((value, index) => {
    inclusionValues[index].textContent = value;
  });
};

const updateResponseLoop = (theme, metrics) => {
  const funnelValues = [
    metrics.sample,
    Math.round(metrics.sample * 0.96),
    Math.round(metrics.sample * 0.33),
    Math.round(metrics.sample * 0.285),
    Math.round(metrics.sample * 0.212),
  ];
  document.querySelectorAll(".funnel > div > b").forEach((element, index) => {
    element.textContent = formatNumber(funnelValues[index]);
  });

  const funnelMetrics = document.querySelectorAll(".funnel-metrics b");
  funnelMetrics[0].textContent = "96%";
  funnelMetrics[1].textContent =
    `${Math.round((funnelValues[4] / funnelValues[2]) * 100)}%`;
  funnelMetrics[2].textContent = theme.medianResponse;

  const confidenceCards = [
    ...document.querySelectorAll(".confidence-grid article"),
  ];
  confidenceCards[0].querySelector("small").textContent =
    `${formatNumber(funnelValues[1])} / ${formatNumber(funnelValues[0])}`;
  confidenceCards[4].querySelector("strong").textContent =
    `${theme.fieldQuality[2]}%`;
  confidenceCards[4].querySelector("i em").style.width =
    `${theme.fieldQuality[2]}%`;
};

const updateSurvey = (theme) => {
  const questions = [...document.querySelectorAll(".question-card")];
  questions.forEach((card, index) => {
    card.querySelector(".question-head small").textContent =
      `LINKED TO · ${theme.short.toUpperCase()}`;
    card.querySelector(".question-head h3").textContent =
      theme.questions[index][0];
    card.querySelector(".metric-link b").textContent =
      theme.questions[index][1];
  });

  const fieldRows = [...document.querySelectorAll(".field-row")];
  fieldRows.forEach((row, index) => {
    const value = theme.fieldQuality[index];
    row.querySelector("b").textContent = `${value}%`;
    row.querySelector("em").style.width = `${value}%`;
  });
};

const render = ({ animate = true } = {}) => {
  const theme = THEMES[state.theme];
  const metrics = getFilteredMetrics(theme);
  updateHeader(theme, metrics);
  updateKpis(theme, metrics);
  updateOutcomeTrend(theme, metrics);
  updateGeography(theme);
  updateInsights(theme);
  updateComparison(theme, metrics);
  updateRadar(theme);
  updateCorrelation(theme);
  updatePriorities(theme);
  updateSentiment(theme);
  updateRisks(theme);
  updateDecision(theme, metrics);
  updateProfile(theme);
  updateResponseLoop(theme, metrics);
  updateSurvey(theme);
  if (animate) animateUpdate();
};

themeCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    state.theme = card.dataset.theme;
    render();
    requestAnimationFrame(() => {
      analytics.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

if (filterSelects.length === 3) {
  filterSelects[0].addEventListener("change", (event) => {
    state.region = event.target.value;
    render();
  });
  filterSelects[1].addEventListener("change", (event) => {
    state.gender = event.target.value;
    render();
  });
  filterSelects[2].addEventListener("change", (event) => {
    state.age = event.target.value;
    render();
  });
}

document
  .querySelector(".export-button")
  ?.addEventListener("click", () => window.print());

document.querySelectorAll(".required-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const required = toggle.classList.toggle("on");
    toggle.lastChild.textContent = required ? "Required" : "Optional";
  });
});

render({ animate: false });
