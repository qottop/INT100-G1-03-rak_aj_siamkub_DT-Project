const timeData = [
  { time: "05:00", value: 24, label: "น้อย", tone: "green" },
  { time: "07:00", value: 42, label: "ปานกลาง", tone: "green" },
  { time: "09:00", value: 63, label: "เยอะ", tone: "amber" },
  { time: "17:00", value: 72, label: "เยอะ", tone: "amber" },
  { time: "18:00", value: 88, label: "แออัด", tone: "red" },
  { time: "19:00", value: 78, label: "เยอะ", tone: "amber" },
  { time: "20:00", value: 32, label: "น้อย", tone: "green" }
];

const timeGrid = document.getElementById("timeGrid");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalContent");

function toneColor(tone) {
  if (tone === "green") return "#3e9b68";
  if (tone === "red") return "#c95353";
  return "#d99325";
}

function renderTimes() {
  timeGrid.innerHTML = "";
  timeData.forEach((item, index) => {
    const el = document.createElement("button");
    el.className = "time-item" + (index === 1 ? " selected" : "");
    el.innerHTML = `
      <div class="time">${item.time}</div>
      <div class="bar"><span style="height:${item.value}%; background:${toneColor(item.tone)}"></span></div>
      <div class="level">${item.label}</div>
    `;
    el.addEventListener("click", () => {
      document.querySelectorAll(".time-item").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
    });
    timeGrid.appendChild(el);
  });
}
renderTimes();

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

function openModal(type) {
  let html = "";
  if (type === "density") {
    html = `
      <div class="eyebrow">PEOPLE DENSITY</div>
      <h2>ความหนาแน่นของผู้ใช้งาน</h2>
      <p>ตัวเลขชุดนี้เป็น <strong>Prototype Data</strong> เพื่อจำลองการทำงานของระบบ ไม่ใช่จำนวนคนแบบ Real-time</p>
      <table class="modal-table">
        <thead><tr><th>เวลา</th><th>ระดับ</th><th>ตัวชี้วัด</th></tr></thead>
        <tbody>
          ${timeData.map(x => `<tr><td>${x.time}</td><td>${x.label}</td><td>${x.value}%</td></tr>`).join("")}
        </tbody>
      </table>
    `;
  }
  if (type === "parking") {
    html = `
      <div class="eyebrow">CAR PARKING</div>
      <h2>สถานะที่จอดรถ</h2>
      <p>Prototype นี้ตั้ง Capacity รถยนต์ไว้ที่ <strong>20 คัน</strong> ตามข้อมูลพื้นที่สาธารณะของ กทม.</p>
      <div class="parking-number"><strong id="modalSlots">4</strong><span>/ 20 ช่องว่าง</span></div>
      <p>แนวคิดของระบบจริงสามารถรับข้อมูลจากเจ้าหน้าที่, กล้องตรวจนับ หรือเซนเซอร์ เพื่อแสดงจำนวนช่องว่างปัจจุบัน</p>
    `;
  }
  modalContent.innerHTML = html;
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.page));
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
function closeModal() {
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("simulateBtn").addEventListener("click", () => {
  const slot = Math.floor(Math.random() * 9) + 1;
  document.getElementById("availableSlots").textContent = slot;
  const pct = 100 - ((20 - slot) / 20 * 100);
  const meter = document.querySelector(".people-card .meter span");
  const val = Math.max(35, Math.min(92, Math.round(Math.random() * 55 + 35)));
  meter.style.width = `${val}%`;
  document.querySelector(".people-card .meter-meta strong").textContent = `${val}%`;
});
