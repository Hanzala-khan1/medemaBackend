const userTypeEnum = Object.freeze({
    RehabEmployee: 'RehabEmployee',
    Individual: "Individual",
    Visiter: "Visiter"
});

const userRoleEnum = Object.freeze({
    Doctor: 'Doctor',
    Nurses: "Nurses",
    PhysioDcotor: "PhysioDcotor",
    Aya: "Aya",
    Patient: "Patient",
    RehabAdmin: "RehabAdmin",
    Webvister: "Webvister",
    Receptionist: "Receptionist",
    Visiter: "Visiter"
});
const userStatusEnum = Object.freeze({
    active: 'active',
    inactive: "inactive",
    blocked: "blocked"
});
// Enum for booking status
const bookingStatusEnum = Object.freeze({
    pending: "pending",
    accepted: "accepted",
    rejected: "rejected"
})


// Enum for booking types
const bookingTypeEnum = Object.freeze({
    user: "user",
    rehab: "rehab",
})


module.exports = {
    userTypeEnum,
    userRoleEnum,
    userStatusEnum,
    bookingStatusEnum,
    bookingTypeEnum
}