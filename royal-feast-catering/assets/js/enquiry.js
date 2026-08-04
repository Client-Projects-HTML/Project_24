/* =========================================================
   ROYAL FEAST — enquiry.js
   Extra behaviour for the Get a Quote / Enquiry form:
   guest-count live label, min event date, budget display.
   Field-level validation itself is handled by main.js.
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("#enquiry-form");
    if (!form) return;

    /* Prevent picking an event date in the past */
    var dateField = form.querySelector('input[type="date"]');
    if (dateField) {
      var today = new Date().toISOString().split("T")[0];
      dateField.setAttribute("min", today);
    }

    /* Live guest-count helper text */
    var guests = form.querySelector("#guests");
    var guestsHint = form.querySelector("#guests-hint");
    if (guests && guestsHint) {
      guests.addEventListener("input", function () {
        var n = parseInt(guests.value, 10);
        if (!n) { guestsHint.textContent = "We cater from intimate 20-guest dinners to 1000+ guest weddings."; return; }
        if (n < 50) guestsHint.textContent = "Perfect for our intimate gathering menus.";
        else if (n < 200) guestsHint.textContent = "A great fit for our classic event packages.";
        else guestsHint.textContent = "Large event — our banquet team will plan logistics with you.";
      });
    }

    /* Budget range live label */
    var budget = form.querySelector("#budget");
    var budgetOut = form.querySelector("#budget-output");
    if (budget && budgetOut) {
      var fmt = function (v) { return "\u20B9" + Number(v).toLocaleString("en-IN"); };
      budgetOut.textContent = fmt(budget.value) + " per guest";
      budget.addEventListener("input", function () {
        budgetOut.textContent = fmt(budget.value) + " per guest";
      });
    }
  });
})();
