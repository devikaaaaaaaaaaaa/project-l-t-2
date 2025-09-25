document.addEventListener("DOMContentLoaded", () => {
  const habitInput = document.getElementById("habit-input");
  const addHabitBtn = document.getElementById("add-habit");
  const resetBtn = document.getElementById("reset-tracker");
  const habitTable = document.querySelector("#habit-table tbody");

  let habits = [];

  // Function to render habits
  function renderHabits() {
    habitTable.innerHTML = "";
    habits.forEach((habit, index) => {
      let checkedDays = habit.days.filter(d => d).length;
      let streak = calculateStreak(habit.days);
      let progressPercent = (checkedDays / 7) * 100;

      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${habit.name}</td>
        <td>
          <div class="progress-container">
            <div class="progress-bar" style="width:${progressPercent}%"></div>
          </div>
        </td>
        <td>${streak} days</td>
        ${habit.days.map((day, i) =>
          `<td><input type="checkbox" class="checkbox" ${day ? "checked" : ""} data-habit="${index}" data-day="${i}"></td>`
        ).join("")}
      `;
      habitTable.appendChild(row);
    });
  }

  // Function to calculate streak
  function calculateStreak(days) {
    let streak = 0, best = 0;
    days.forEach(day => {
      if (day) {
        streak++;
        if (streak > best) best = streak;
      } else {
        streak = 0;
      }
    });
    return best;
  }

  // Add habit
  addHabitBtn.addEventListener("click", () => {
    if (habitInput.value.trim() !== "") {
      habits.push({ name: habitInput.value.trim(), days: Array(7).fill(false) });
      habitInput.value = "";
      renderHabits();
    }
  });

  // Reset tracker
  resetBtn.addEventListener("click", () => {
    habits = [];
    renderHabits();
  });

  // Update checkbox status
  habitTable.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox")) {
      let habitIndex = e.target.dataset.habit;
      let dayIndex = e.target.dataset.day;
      habits[habitIndex].days[dayIndex] = e.target.checked;
      renderHabits();
    }
  });

  renderHabits();
});
