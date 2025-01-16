document.addEventListener("DOMContentLoaded", function () {
    const datePicker = {
        startInput: document.getElementById("start-date-input"),
        endInput: document.getElementById("end-date-input"),
        calendar: document.getElementById("calendar"),
        monthYear: document.getElementById("month-year"),
        calendarDates: document.getElementById("calendar-dates"),
        prevMonthBtn: document.querySelector(".prev-month"),
        nextMonthBtn: document.querySelector(".next-month"),
        currentDate: new Date(),
        selectedDates: { start: null, end: null },
        options: {
            locale: "en-US", // Support for localization
            disabledDays: [0, 6], // Disable weekends
            minDate: null,
            maxDate: null,
            holidays: [
                { date: "2025-01-01", label: "New Year's Day" },
                { date: "2025-12-25", label: "Christmas Day" },
            ],
        },
    };

    function formatDate(date, locale = "fr-FR") {
        return date.toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" });
    }

    function isDisabled(date) {
        const day = date.getDay();
        const isoDate = date.toISOString().slice(0, 10);

        if (datePicker.options.disabledDays.includes(day)) return true;

        if (datePicker.options.minDate && date < datePicker.options.minDate) return true;

        if (datePicker.options.maxDate && date > datePicker.options.maxDate) return true;

        return false;
    }

    function renderCalendar() {
        const { currentDate, calendarDates, monthYear, options, selectedDates } = datePicker;
        calendarDates.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleString(options.locale, {
            month: "long",
            year: "numeric",
        });

        for (let i = 0; i < firstDay; i++) {
            calendarDates.appendChild(document.createElement("div"));
        }

        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(year, month, i);
            const button = document.createElement("button");
            button.textContent = i;

            if (isDisabled(date)) {
                button.classList.add("disabled");
                calendarDates.appendChild(button);
                continue;
            }

            const isoDate = date.toISOString().slice(0, 10);
            if (selectedDates.start && selectedDates.end) {
                if (date >= selectedDates.start && date <= selectedDates.end) {
                    button.classList.add("range");
                }
            }

            if (selectedDates.start && isoDate === selectedDates.start.toISOString().slice(0, 10)) {
                button.classList.add("range-start");
            }

            if (selectedDates.end && isoDate === selectedDates.end.toISOString().slice(0, 10)) {
                button.classList.add("range-end");
            }

            button.addEventListener("click", () => handleDateSelection(date));
            calendarDates.appendChild(button);
        }
    }

    function handleDateSelection(date) {
        const { selectedDates, startInput, endInput } = datePicker;

        if (!selectedDates.start || selectedDates.end) {
            selectedDates.start = date;
            selectedDates.end = null;
            startInput.value = formatDate(date);
            endInput.value = "";
        } else if (date > selectedDates.start) {
            selectedDates.end = date;
            endInput.value = formatDate(date);
        } else {
            selectedDates.start = date;
            selectedDates.end = null;
            startInput.value = formatDate(date);
            endInput.value = "";
        }
        renderCalendar();
    }

    datePicker.prevMonthBtn.addEventListener("click", () => {
        datePicker.currentDate.setMonth(datePicker.currentDate.getMonth() - 1);
        renderCalendar();
    });
    datePicker.nextMonthBtn.addEventListener("click", () => {
        datePicker.currentDate.setMonth(datePicker.currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.addEventListener("click", (e) => {
        if (!document.querySelector(".date-picker").contains(e.target)) {
            datePicker.calendar.classList.add("hidden");
        }
    });

    renderCalendar();
});
