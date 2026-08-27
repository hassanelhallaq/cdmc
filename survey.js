"use strict";

const STORAGE_KEY = "gaza-pulse-form-builder";

const TYPE_META = {
  select_one: { label: "Select One", icon: "◉" },
  select_multiple: { label: "Select Many", icon: "☑" },
  text: { label: "Text", icon: "T" },
  integer: { label: "Number", icon: "#" },
  decimal: { label: "Decimal", icon: ".0" },
  date: { label: "Date", icon: "▦" },
  time: { label: "Time", icon: "◷" },
  photo: { label: "Photo", icon: "▣" },
  audio: { label: "Audio", icon: "♫" },
  video: { label: "Video", icon: "▶" },
  file: { label: "File", icon: "▤" },
  geopoint: { label: "Point", icon: "⌖" },
  note: { label: "Note", icon: "ℹ" },
  acknowledge: { label: "Acknowledge", icon: "✓" },
  calculate: { label: "Calculate", icon: "ƒ" },
  rating: { label: "Rating", icon: "★" },
  ranking: { label: "Ranking", icon: "☰" },
  range: { label: "Range", icon: "↔" },
  begin_group: { label: "Group", icon: "{ }" },
};

const OPTION_TYPES = new Set(["select_one", "select_multiple", "ranking", "rating"]);

const DEFAULT_FORM = {
  title: "Baseline perception survey",
  description: "Community evidence for GAZA / PULSE decision metrics.",
  status: "Draft",
  questions: [
    {
      id: "q_note",
      type: "note",
      label:
        "This form feeds GAZA / PULSE decision metrics. Answer based on the last 30 days.",
      name: "intro_note",
      hint: "",
      required: false,
      metric: "",
      appearance: "",
      options: [],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
    {
      id: "q_issue",
      type: "select_one",
      label: "Which issue most affects your daily life?",
      name: "daily_issue",
      hint: "Select the issue with the greatest current impact.",
      required: true,
      metric: "Emerging signal",
      appearance: "",
      options: [
        "Safety and protection",
        "Access to services",
        "Livelihoods",
        "Shelter",
        "Other",
      ],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
    {
      id: "q_trust",
      type: "rating",
      label: "How much do you trust local actors?",
      name: "trust_index",
      hint: "1 = very low trust · 5 = very high trust",
      required: true,
      metric: "Trust index",
      appearance: "likert",
      options: ["1", "2", "3", "4", "5"],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
    {
      id: "q_feedback",
      type: "select_one",
      label: "Did you receive clear feedback instructions?",
      name: "feedback_clear",
      hint: "",
      required: false,
      metric: "Coverage / access",
      appearance: "horizontal",
      options: ["Yes", "No", "Not sure"],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
    {
      id: "q_gps",
      type: "geopoint",
      label: "Collection location",
      name: "gps",
      hint: "Captured automatically when possible.",
      required: true,
      metric: "",
      appearance: "",
      options: [],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
    {
      id: "q_comment",
      type: "text",
      label: "Is there anything else the response team should know?",
      name: "additional_comment",
      hint: "Do not include names or identifying details.",
      required: false,
      metric: "Emerging signal",
      appearance: "multiline",
      options: [],
      skipEnabled: false,
      skipQuestion: "",
      skipOp: "selected",
      skipValue: "",
      validationEnabled: false,
      validationCondition: "",
      validationMessage: "",
    },
  ],
};

const uid = () => `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 36) || `question_${Date.now().toString(36)}`;

const needsOptions = (type) => OPTION_TYPES.has(type);

const defaultOptions = (type) => {
  if (type === "rating") return ["1", "2", "3", "4", "5"];
  if (type === "ranking" || type === "select_one" || type === "select_multiple") {
    return ["Option 1", "Option 2", "Option 3"];
  }
  return [];
};

const createQuestion = (type) => {
  const meta = TYPE_META[type] || TYPE_META.text;
  return {
    id: uid(),
    type,
    label: meta.label === "Note" ? "Read this note" : `New ${meta.label.toLowerCase()} question`,
    name: slugify(meta.label),
    hint: "",
    required: type !== "note" && type !== "calculate" && type !== "begin_group",
    metric: "",
    appearance: type === "rating" ? "likert" : "",
    options: defaultOptions(type),
    skipEnabled: false,
    skipQuestion: "",
    skipOp: "selected",
    skipValue: "",
    validationEnabled: false,
    validationCondition: "",
    validationMessage: "",
  };
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_FORM);
    const parsed = JSON.parse(raw);
    if (!parsed?.questions?.length) return structuredClone(DEFAULT_FORM);
    return {
      ...structuredClone(DEFAULT_FORM),
      ...parsed,
      selectedId: parsed.questions[0]?.id || null,
    };
  } catch {
    return structuredClone(DEFAULT_FORM);
  }
};

const state = loadState();
state.selectedId = state.selectedId || state.questions[0]?.id || null;

const els = {
  list: document.querySelector("[data-question-list]"),
  count: document.querySelector("[data-question-count]"),
  title: document.querySelector("[data-form-title]"),
  description: document.querySelector("[data-form-description]"),
  status: document.querySelector("[data-form-status]"),
  empty: document.querySelector("[data-settings-empty]"),
  form: document.querySelector("[data-settings-form]"),
  optionsBlock: document.querySelector("[data-options-block]"),
  optionList: document.querySelector("[data-option-list]"),
  skipQuestion: document.querySelector('[data-field="skipQuestion"]'),
  toast: document.querySelector("[data-toast]"),
  previewLayer: document.querySelector("[data-preview-layer]"),
  previewForm: document.querySelector("[data-preview-form]"),
  previewDescription: document.querySelector("[data-preview-description]"),
  previewTitle: document.querySelector("#preview-title"),
  palette: document.querySelector(".builder-palette"),
  settings: document.querySelector(".builder-settings"),
  search: document.querySelector("[data-palette-search]"),
};

const selected = () => state.questions.find((question) => question.id === state.selectedId);

const persist = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      title: state.title,
      description: state.description,
      status: state.status,
      questions: state.questions,
    }),
  );
};

let toastTimer = 0;
const showToast = (message) => {
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.hidden = true;
  }, 2200);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderList = () => {
  if (!state.questions.length) {
    els.list.innerHTML = `
      <div class="canvas-empty">
        <span class="eyebrow">EMPTY FORM</span>
        <h2>Add a question from the sidebar</h2>
        <p>Select One, Text, GPS and media types appear here as Kobo-style cards.</p>
      </div>
    `;
  } else {
    els.list.innerHTML = state.questions
      .map((question, index) => {
        const meta = TYPE_META[question.type] || TYPE_META.text;
        const active = question.id === state.selectedId ? " is-selected" : "";
        const required = question.required ? `<em>Required</em>` : `<em class="optional">Optional</em>`;
        const metric = question.metric
          ? `<small>Linked · ${escapeHtml(question.metric)}</small>`
          : `<small>Not linked</small>`;
        const skip = question.skipEnabled ? `<span class="chip">Skip logic</span>` : "";
        return `
          <article class="builder-question${active}" data-id="${question.id}" draggable="true">
            <span class="drag-handle" aria-hidden="true">⋮⋮</span>
            <span class="question-type-icon">${meta.icon}</span>
            <div>
              <div class="builder-question-head">
                <span>
                  <b>${String(index + 1).padStart(2, "0")}</b>
                  ${metric}
                </span>
                <div class="builder-question-tools">
                  ${required}
                  ${skip}
                  <button type="button" data-duplicate="${question.id}" aria-label="Duplicate question">⧉</button>
                  <button type="button" data-delete="${question.id}" aria-label="Delete question">✕</button>
                </div>
              </div>
              <h3>${escapeHtml(question.label) || "Untitled question"}</h3>
              <p>${escapeHtml(meta.label)}${question.hint ? ` · ${escapeHtml(question.hint)}` : ""}</p>
            </div>
          </article>
        `;
      })
      .join("");
  }

  els.count.textContent = String(state.questions.length);
  els.status.textContent = state.status;
  els.status.classList.toggle("is-deployed", state.status === "Deployed");
};

const bindSettings = () => {
  const question = selected();
  if (!question) {
    els.empty.hidden = false;
    els.form.hidden = true;
    return;
  }

  els.empty.hidden = true;
  els.form.hidden = false;
  const meta = TYPE_META[question.type] || TYPE_META.text;
  els.form.querySelector("[data-settings-type]").textContent = meta.label;
  els.form.querySelector('[data-field="label"]').value = question.label;
  els.form.querySelector('[data-field="name"]').value = question.name;
  els.form.querySelector('[data-field="hint"]').value = question.hint;
  els.form.querySelector('[data-field="metric"]').value = question.metric;
  els.form.querySelector('[data-field="appearance"]').value = question.appearance;
  els.form.querySelector('[data-field="skipEnabled"]').checked = question.skipEnabled;
  els.form.querySelector('[data-field="skipOp"]').value = question.skipOp;
  els.form.querySelector('[data-field="skipValue"]').value = question.skipValue;
  els.form.querySelector('[data-field="validationEnabled"]').checked =
    question.validationEnabled;
  els.form.querySelector('[data-field="validationCondition"]').value =
    question.validationCondition;
  els.form.querySelector('[data-field="validationMessage"]').value =
    question.validationMessage;

  const requiredButton = els.form.querySelector('[data-field="required"]');
  requiredButton.classList.toggle("on", question.required);
  requiredButton.querySelector("span").textContent = question.required
    ? "Required"
    : "Optional";

  els.optionsBlock.hidden = !needsOptions(question.type);
  if (needsOptions(question.type)) {
    els.optionList.innerHTML = question.options
      .map(
        (option, index) => `
          <div class="option-row">
            <span>${index + 1}</span>
            <input type="text" value="${escapeHtml(option)}" data-option-index="${index}">
            <button type="button" data-remove-option="${index}" aria-label="Remove option">✕</button>
          </div>
        `,
      )
      .join("");
  }

  const others = state.questions.filter((item) => item.id !== question.id);
  els.skipQuestion.innerHTML = others.length
    ? others
        .map(
          (item) =>
            `<option value="${item.id}" ${
              item.id === question.skipQuestion ? "selected" : ""
            }>${escapeHtml(item.label)}</option>`,
        )
        .join("")
    : `<option value="">No other questions</option>`;

  els.form.querySelector("[data-skip-fields]").classList.toggle(
    "is-disabled",
    !question.skipEnabled,
  );
};

const render = () => {
  renderList();
  bindSettings();
  persist();
};

const selectQuestion = (id, { openSettings = false } = {}) => {
  state.selectedId = id;
  render();
  if (openSettings) {
    els.settings.classList.add("is-open");
  }
};

const addQuestion = (type) => {
  const question = createQuestion(type);
  const currentIndex = state.questions.findIndex((item) => item.id === state.selectedId);
  const insertAt = currentIndex >= 0 ? currentIndex + 1 : state.questions.length;
  state.questions.splice(insertAt, 0, question);
  state.status = "Draft";
  selectQuestion(question.id, { openSettings: true });
  showToast(`${TYPE_META[type].label} added`);
};

els.list.addEventListener("click", (event) => {
  const duplicateId = event.target.closest("[data-duplicate]")?.dataset.duplicate;
  const deleteId = event.target.closest("[data-delete]")?.dataset.delete;
  const card = event.target.closest(".builder-question");

  if (duplicateId) {
    const source = state.questions.find((item) => item.id === duplicateId);
    if (!source) return;
    const copy = {
      ...structuredClone(source),
      id: uid(),
      name: `${source.name}_copy`,
      label: `${source.label} (copy)`,
    };
    const index = state.questions.findIndex((item) => item.id === duplicateId);
    state.questions.splice(index + 1, 0, copy);
    state.status = "Draft";
    selectQuestion(copy.id);
    return;
  }

  if (deleteId) {
    const index = state.questions.findIndex((item) => item.id === deleteId);
    if (index < 0) return;
    state.questions.splice(index, 1);
    state.status = "Draft";
    state.selectedId = state.questions[index]?.id || state.questions[index - 1]?.id || null;
    render();
    return;
  }

  if (card) {
    selectQuestion(card.dataset.id, { openSettings: true });
  }
});

let dragId = null;
els.list.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".builder-question");
  if (!card) return;
  dragId = card.dataset.id;
  card.classList.add("is-dragging");
  event.dataTransfer.effectAllowed = "move";
});

els.list.addEventListener("dragend", () => {
  dragId = null;
  els.list
    .querySelectorAll(".is-dragging, .drop-target")
    .forEach((card) => card.classList.remove("is-dragging", "drop-target"));
});

els.list.addEventListener("dragover", (event) => {
  event.preventDefault();
  const card = event.target.closest(".builder-question");
  els.list.querySelectorAll(".drop-target").forEach((item) => item.classList.remove("drop-target"));
  if (card && card.dataset.id !== dragId) card.classList.add("drop-target");
});

els.list.addEventListener("drop", (event) => {
  event.preventDefault();
  const card = event.target.closest(".builder-question");
  if (!card || !dragId || card.dataset.id === dragId) return;
  const from = state.questions.findIndex((item) => item.id === dragId);
  const to = state.questions.findIndex((item) => item.id === card.dataset.id);
  if (from < 0 || to < 0) return;
  const [moved] = state.questions.splice(from, 1);
  state.questions.splice(to, 0, moved);
  state.status = "Draft";
  render();
});

document.querySelectorAll("[data-add-type]").forEach((button) => {
  button.addEventListener("click", () => {
    addQuestion(button.dataset.addType);
    els.palette.classList.remove("is-open");
  });
});

els.title.addEventListener("input", () => {
  state.title = els.title.value;
  state.status = "Draft";
  persist();
});

els.description.addEventListener("input", () => {
  state.description = els.description.value;
  state.status = "Draft";
  persist();
});

const fieldMap = {
  label: "label",
  name: "name",
  hint: "hint",
  metric: "metric",
  appearance: "appearance",
  skipOp: "skipOp",
  skipValue: "skipValue",
  skipQuestion: "skipQuestion",
  validationCondition: "validationCondition",
  validationMessage: "validationMessage",
};

els.form.addEventListener("input", (event) => {
  const question = selected();
  if (!question) return;
  const field = event.target.dataset.field;
  const optionIndex = event.target.dataset.optionIndex;

  if (optionIndex !== undefined) {
    question.options[Number(optionIndex)] = event.target.value;
    state.status = "Draft";
    renderList();
    persist();
    return;
  }

  if (field === "skipEnabled" || field === "validationEnabled") {
    question[field] = event.target.checked;
    state.status = "Draft";
    bindSettings();
    renderList();
    persist();
    return;
  }

  if (field && fieldMap[field]) {
    question[fieldMap[field]] = event.target.value;
    if (field === "label" && !question.nameEdited) {
      question.name = slugify(event.target.value);
      els.form.querySelector('[data-field="name"]').value = question.name;
    }
    if (field === "name") question.nameEdited = true;
    state.status = "Draft";
    renderList();
    persist();
  }
});

els.form.addEventListener("click", (event) => {
  const question = selected();
  if (!question) return;

  if (event.target.closest('[data-field="required"]')) {
    question.required = !question.required;
    state.status = "Draft";
    bindSettings();
    renderList();
    persist();
    return;
  }

  if (event.target.closest("[data-action='add-option']")) {
    question.options.push(`Option ${question.options.length + 1}`);
    state.status = "Draft";
    bindSettings();
    persist();
    return;
  }

  const remove = event.target.closest("[data-remove-option]");
  if (remove) {
    question.options.splice(Number(remove.dataset.removeOption), 1);
    state.status = "Draft";
    bindSettings();
    persist();
  }
});

els.search.addEventListener("input", () => {
  const query = els.search.value.trim().toLowerCase();
  document.querySelectorAll("[data-add-type]").forEach((button) => {
    const haystack = `${button.dataset.addType} ${button.textContent}`.toLowerCase();
    button.hidden = Boolean(query) && !haystack.includes(query);
  });
  document.querySelectorAll(".palette-groups section").forEach((section) => {
    const visible = [...section.querySelectorAll("[data-add-type]")].some(
      (button) => !button.hidden,
    );
    section.hidden = !visible;
  });
});

const previewControl = (question) => {
  const name = escapeHtml(question.name);
  if (question.type === "note") {
    return `<p class="preview-note">${escapeHtml(question.label)}</p>`;
  }
  if (question.type === "select_one" || question.type === "rating") {
    return question.options
      .map(
        (option) =>
          `<label class="preview-choice"><input type="radio" name="${name}"> ${escapeHtml(option)}</label>`,
      )
      .join("");
  }
  if (question.type === "select_multiple" || question.type === "ranking") {
    return question.options
      .map(
        (option) =>
          `<label class="preview-choice"><input type="checkbox" name="${name}"> ${escapeHtml(option)}</label>`,
      )
      .join("");
  }
  if (question.type === "text") {
    return `<textarea rows="3" placeholder="${escapeHtml(question.hint || "Type here")}"></textarea>`;
  }
  if (question.type === "integer" || question.type === "decimal" || question.type === "range") {
    return `<input type="number" placeholder="0">`;
  }
  if (question.type === "date") return `<input type="date">`;
  if (question.type === "time") return `<input type="time">`;
  if (question.type === "photo" || question.type === "file" || question.type === "audio" || question.type === "video") {
    return `<input type="file">`;
  }
  if (question.type === "geopoint") {
    return `<button class="ghost-button" type="button">Capture GPS</button>`;
  }
  if (question.type === "acknowledge") {
    return `<label class="preview-choice"><input type="checkbox"> I acknowledge this note</label>`;
  }
  if (question.type === "calculate" || question.type === "begin_group") {
    return `<p class="preview-muted">${escapeHtml(TYPE_META[question.type].label)} · not shown to respondent</p>`;
  }
  return `<input type="text">`;
};

const openPreview = () => {
  els.previewTitle.textContent = state.title;
  els.previewDescription.textContent = state.description;
  els.previewForm.innerHTML = state.questions
    .map((question) => {
      if (question.type === "note") {
        return `<div class="preview-item">${previewControl(question)}</div>`;
      }
      return `
        <div class="preview-item">
          <label>
            <span>${escapeHtml(question.label)}${question.required ? " *" : ""}</span>
            ${question.hint ? `<small>${escapeHtml(question.hint)}</small>` : ""}
          </label>
          ${previewControl(question)}
        </div>
      `;
    })
    .join("");
  els.previewLayer.hidden = false;
};

const closePreview = () => {
  els.previewLayer.hidden = true;
};

document.querySelector('[data-action="preview"]').addEventListener("click", openPreview);
document.querySelector('[data-action="close-preview"]').addEventListener("click", closePreview);
els.previewLayer.addEventListener("click", (event) => {
  if (event.target === els.previewLayer) closePreview();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePreview();
});

document.querySelector('[data-action="save"]').addEventListener("click", () => {
  state.status = "Draft";
  persist();
  render();
  showToast("Draft saved on this device");
});

document.querySelector('[data-action="deploy"]').addEventListener("click", () => {
  state.status = "Deployed";
  persist();
  render();
  showToast("Form deployed · ready for KoboCollect / web collect");
});

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.toggle;
    if (target === "palette") els.palette.classList.toggle("is-open");
    if (target === "settings") els.settings.classList.remove("is-open");
  });
});

els.title.value = state.title;
els.description.value = state.description;
render();
