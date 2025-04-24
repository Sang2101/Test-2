document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const statusMessage = document.getElementById("statusMessage");

  const days = [
    "Ngày 12/05/2025", "Ngày 13/05/2025", "Ngày 14/05/2025",
    "Ngày 15/05/2025", "Ngày 16/05/2025", "Ngày 19/05/2025",
    "Ngày 20/05/2025", "Ngày 21/05/2025", "Ngày 22/05/2025", "Ngày 23/05/2025"
  ];

  const slots = [
    "8h00 - 9h00", "9h00 - 10h00", "10h00 - 11h00", "11h00 - 12h00",
    "13h00 - 14h00", "14h00 - 15h00", "15h00 - 16h00", "16h00 - 17h00"
  ];

  const slotLimits = {
    "8h00 - 9h00": 30, "9h00 - 10h00": 29, "10h00 - 11h00": 28,
    "11h00 - 12h00": 27, "13h00 - 14h00": 26, "14h00 - 15h00": 25,
    "15h00 - 16h00": 24, "16h00 - 17h00": 23
  };

  const slotCounts = {
    "Ngày 12/05/2025|8h00 - 9h00": 30,
    "Ngày 14/05/2025|13h00 - 14h00": 20
  };

  function renderSchedule() {
    scheduleContainer.innerHTML = "";
    days.forEach(day => {
      const group = document.createElement("div");
      group.className = "schedule-group";
      group.innerHTML = `<strong>${day}</strong>`;
      slots.forEach(slot => {
        const value = `${day}|${slot}`;
        const count = slotCounts[value] || 0;
        const limit = slotLimits[slot] || 10;
        const disabled = count >= limit ? "disabled" : "";
        const labelText = count >= limit ? `${slot} (đã đủ)` : `${slot} (${count}/${limit})`;

        const option = document.createElement("div");
        option.className = "schedule-option";
        option.innerHTML = `
          <label>
            <input type="radio" name="schedule" value="${value}" ${disabled} />
            <span>${labelText}</span>
          </label>
        `;
        group.appendChild(option);
      });
      scheduleContainer.appendChild(group);
    });

    document.querySelectorAll("input[name='schedule']").forEach(radio => {
      radio.addEventListener("change", () => {
        document.querySelectorAll("input[name='schedule']").forEach(r => {
          if (r !== radio) r.checked = false;
        });
      });
    });
  }

  renderSchedule();

  document.getElementById("checkCodeBtn").addEventListener("click", () => {
    const id = document.getElementById("employeeId").value.trim();
    if (!id) return;

    const demoData = {
      found: true,
      fullName: "Nguyễn Văn A",
      dob: "01/01/1990",
      gender: "Nam",
      selectedSlot: "Ngày 14/05/2025|13h00 - 14h00"
    };

    document.getElementById("fullName").value = demoData.fullName;
    const [d, m, y] = demoData.dob.split("/");
    document.getElementById("dob-day").value = d;
    document.getElementById("dob-month").value = m;
    document.getElementById("dob-year").value = y;
    document.getElementById("gender").value = demoData.gender;

    const radio = document.querySelector(`input[value='${demoData.selectedSlot}']`);
    if (radio && !radio.disabled) radio.checked = true;
    statusMessage.innerText = demoData.found ? "✅ Đã nạp dữ liệu mẫu" : "Không tìm thấy dữ liệu";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const slotValue = document.querySelector("input[name='schedule']:checked")?.value || "";
    const data = {
      employeeId: document.getElementById("employeeId").value,
      fullName: document.getElementById("fullName").value,
      dob: combineDOB(),
      gender: document.getElementById("gender").value,
      selectedSlot: slotValue
    };

    if (!data.employeeId || !slotValue) {
      statusMessage.innerText = "❗ Vui lòng nhập mã nhân viên và chọn 1 khung giờ.";
      return;
    }

    console.log("📥 Dữ liệu gửi:", data);
    statusMessage.innerText = "✅ Dữ liệu đã được ghi vào console.";
  });

  function combineDOB() {
    const day = document.getElementById("dob-day").value.padStart(2, "0");
    const month = document.getElementById("dob-month").value.padStart(2, "0");
    const year = document.getElementById("dob-year").value;
    if (!day || !month || !year) return "";
    return `${day}/${month}/${year}`;
  }
});
