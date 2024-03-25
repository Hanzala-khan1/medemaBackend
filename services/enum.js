const userTypeEnum = Object.freeze({
    RehabEmployee: 'RehabEmployee',
    Individual: "Individual"
});

const userRoleEnum = Object.freeze({
    Doctor: 'Doctor',
    Nurses: "Nurses",
    PhysioDcotor: "PhysioDcotor",
    Aya: "Aya",
    Patient: "Patient",
    Webvister: "Webvister",
    Receptionist: "Receptionist"
});


module.exports = {
    userTypeEnum,
    userRoleEnum
}