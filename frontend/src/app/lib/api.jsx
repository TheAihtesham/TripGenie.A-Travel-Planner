export const BASE_URL = "http://localhost:5000/api/plan";

export async function createPlan(data) {
    const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create plan");
    }
    return res.json();
}

export async function getPlans() {
    const res = await fetch(`${BASE_URL}/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch plans");
    return res.json();
}
