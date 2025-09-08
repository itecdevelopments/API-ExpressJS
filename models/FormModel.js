const mongoose = require("mongoose");

const getKsaTimeFormatted = () => {
  const now = new Date();
  const utcOffset = now.getTimezoneOffset() * 60000; // UTC offset in milliseconds
  const ksaOffset = 3 * 60 * 60 * 1000; // KSA is UTC+3
  const ksaTime = new Date(now.getTime() + utcOffset + ksaOffset);

  // Format: YYYY-MM-DD HH:mm
  const year = ksaTime.getFullYear();
  const month = String(ksaTime.getMonth() + 1).padStart(2, "0");
  const day = String(ksaTime.getDate()).padStart(2, "0");
  const hours = String(ksaTime.getHours()).padStart(2, "0");
  const minutes = String(ksaTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ServiceReportSchema = new mongoose.Schema({
  SerialReportNumber: { type: String, required: true },
  Date: { type: String, required: true },
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  Quotation: { type: String, required: true },
  PurchaseOrder: { type: String, required: true },
  Inventory: { type: String, required: true },

  MachineType: {
    type: String,
    required: true,
    enum: ["CIJ", "LASER", "TTO", "PALLET", "TAPPING", "SCALE", "OTHER", ""],
  },
  otherMachineType: {
    type: String,
    required: function () {
      return this.MachineType === "OTHER";
    },
  },

  headLife: {
    type: String,
    required: function () {
      return this.MachineType === "TTO";
    },
  },

  powerONtime: {
    type: String,
    required: function () {
      return this.MachineType === "CIJ";
    },
  },
  JetRunningTime: {
    type: String,
    required: function () {
      return this.MachineType === "CIJ";
    },
  },
  ServiceDueDate: { type: Date },
  INKtype: {
    type: String,
    required: function () {
      return this.MachineType === "CIJ";
    },
  },
  SolventType: {
    type: String,
    required: function () {
      return this.MachineType === "CIJ";
    },
  },
  Model: { type: String, required: true },
  SerialNumber: { type: String, required: true },

  ServiceType: {
    type: String,
    required: true,
    enum: [
      "NEW_INSTALLATION",
      "DEMO",
      "SERVICE_CALL",
      "AMC",
      "WARRANTY",
      "FILTERS_REPLACMENT",
      "OTHER",
      "",
    ],
  },
  otherServiceType: {
    type: String,
    required: function () {
      return this.ServiceType === "OTHER";
    },
  },

  Unicode: {
    type: String,
    required: function () {
      return this.ServiceType === "NEW_INSTALLATION";
    },
  },
  Configurationcode: {
    type: String,
    required: function () {
      return this.ServiceType === "NEW_INSTALLATION";
    },
  },

  description: { type: String },
  JobCompleted: { type: String, required: true, enum: ["yes", "no"] },
  JobcompleteReason: {
    type: String,
    required: function () {
      return this.JobCompleted === "no";
    },
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  engineerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  spare: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spare",
    required: true,
  }],
  customerPhoneNumber: { type: String, required: true },
  customerdesignation: { type: String, required: true },
  concernName: { type: String, required: true },
  serviceReportPicture: { type: String, required: true },
  deliveryNotePicture: { type: String, required: true },
  dateEntered: {
    type: String,
    default: getKsaTimeFormatted,
  },
});

module.exports = mongoose.model("ServiceReport", ServiceReportSchema);
