/* ITUS102 | Practical Assessment | 12-10-2026 | Task 01 */
function calculateFee() {
    const baseFee = Number(document.getElementById("baseFee").value);
    const labFee = Number(document.getElementById("labFee").value);
    const semesters = Number(document.getElementById("semesters").value);
    const scholarship = document.getElementById("scholarship").value;

    if (!Number.isFinite(baseFee) || !Number.isFinite(labFee) || baseFee < 0 || labFee < 0) {
        document.getElementById("result").textContent = "Please enter valid, non-negative fee values.";
        document.getElementById("breakdown").textContent = "";
        document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }
    if (!Number.isInteger(semesters) || semesters < 1 || semesters > 4) {
        document.getElementById("result").textContent = "Please enter a whole number of semesters from 1 to 4.";
        document.getElementById("breakdown").textContent = "";
        document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    const subtotal = baseFee + labFee;
    const rate = getRate(scholarship);
    const discount = calculateDiscount(subtotal, rate);
    const adminCharge = subtotal * 0.05;
    const payable = calculateTotal(subtotal, discount, adminCharge);

    document.getElementById("result").textContent =
        "Subtotal: ₹" + subtotal.toFixed(2) +
        " | Discount: ₹" + discount.toFixed(2) +
        " | Administration: ₹" + adminCharge.toFixed(2) +
        " | Payable per semester: ₹" + payable.toFixed(2);
    document.getElementById("breakdown").textContent = buildBreakdown(payable, semesters);

    // Bring the calculated result into view after the user clicks Calculate.
    document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function calculateDiscount(amount, percentage) {
    return amount * percentage / 100;
}

function getRate(type) {
    if (type === "Merit") {
        return 20;
    } else if (type === "Sports") {
        return 10;
    } else {
        return 0;
    }
}

function calculateTotal(subtotal, discount, adminCharge) {
    return subtotal - discount + adminCharge;
}

function buildBreakdown(payable, count) {
    let summary = "Semester-wise cumulative fee:\n";
    for (let semester = 1; semester <= count; semester++) {
        summary += "Semester " + semester + ": ₹" + (payable * semester).toFixed(2) + " cumulative\n";
    }
    return summary.trim();
}
