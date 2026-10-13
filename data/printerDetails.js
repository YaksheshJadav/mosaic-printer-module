// data/printerDetails.js
// Realistic mock telemetry data for MOSAIC Printer Details

function offsetDate(minutesOffset) {
  const d = new Date(Date.now() + minutesOffset * 60 * 1000);
  return d.toISOString();
}

export const MOCK_PRINTER_DETAILS = {
  "printer-01": {
    id: "printer-01",
    printerCode: "Printer 01",
    printerName: "Printer 01",
    model: "Voron 2.4 - 350 Custom",
    status: "PRINTING",
    updatedAt: offsetDate(-1),
    currentPrint: {
      name: "Gear Housing",
      project: "Robotic Arm V2",
      object: "Harmonic Drive Outer Ring",
      version: "v4.2",
      thumbnail: "/placeholder-gear.svg",
      progress: 67,
      currentLayer: 432,
      totalLayers: 645,
      startedAt: offsetDate(-103),
      estimatedEndAt: offsetDate(51),
      printedBy: {
        name: "Alex Chen",
        role: "Robotics Lead",
        initials: "AC",
        avatarBg: "bg-[#5F00BA]",
      },
    },
    files: [
      {
        id: "f-1",
        name: "gear_housing_v4.gcode",
        type: "GCODE",
        size: "48.2 MB",
        uploadedAt: "Today, 14:20",
        version: "v4.2",
      },
      {
        id: "f-2",
        name: "gear_housing_production.3mf",
        type: "3MF",
        size: "14.6 MB",
        uploadedAt: "Yesterday",
        version: "v4.2",
      },
      {
        id: "f-3",
        name: "harmonic_gear_outer.stl",
        type: "STL",
        size: "28.1 MB",
        uploadedAt: "3 days ago",
        version: "v4.0",
      },
    ],
    filament: {
      material: "PETG-CF",
      colorName: "Charcoal Slate",
      colorHex: "#2B2D42",
      brand: "Polymaker PolyLite",
      usedGrams: 245,
      usedMeters: 81.2,
      totalGramsForJob: 365,
      spoolRemainingGrams: 180,
      spoolRemainingPercent: 18, // Low spool warning threshold
      costForPrint: "$12.45",
    },
    temperatures: {
      nozzle: { current: 245, target: 245, isAlert: false },
      bed: { current: 80, target: 80, isAlert: false },
      chamber: { current: 48, target: 50, isAlert: false },
      sparkline: [238, 241, 245, 244, 245, 245, 245, 245],
    },
    printSettings: {
      layerHeight: "0.20 mm",
      infill: "40% Gyroid",
      printSpeed: "150 mm/s",
      nozzleDiameter: "0.4 mm Hardened Steel",
      supports: "Tree (Auto)",
      buildPlateAdhesion: "Textured PEI (Brim 5mm)",
      fanSpeed: "35%",
    },
    costAndTime: {
      estimatedTotalTime: "2h 34m",
      elapsedTime: "1h 43m",
      materialCost: "$7.95",
      machineTimeCost: "$4.50",
      totalCost: "$12.45",
      powerEstimate: "0.42 kWh (~$0.06)",
    },
    printerInfo: {
      model: "Voron 2.4 - 350 Custom",
      firmwareVersion: "Klipper v0.12.0",
      nozzleSize: "0.4 mm",
      buildVolume: "350 x 350 x 350 mm",
      totalPrintHours: "1,420 hrs",
      totalPrintsCompleted: 218,
      lastMaintenanceDate: "2026-09-15",
      nextMaintenanceDue: "2026-10-25",
      isMaintenanceDueSoon: false,
    },
    queue: [
      {
        id: "q-1",
        name: "Wrist Flange Adapter",
        project: "Robotic Arm V2",
        estimatedDuration: "1h 15m",
        queuedBy: "Sarah Jenkins",
      },
      {
        id: "q-2",
        name: "Cable Management Bracket",
        project: "Robotic Arm V2",
        estimatedDuration: "45m",
        queuedBy: "Alex Chen",
      },
    ],
    history: [
      {
        id: "h-1",
        name: "Base Turntable Gear",
        project: "Robotic Arm V2",
        printedBy: "Alex Chen",
        startedAt: "Yesterday, 09:15",
        duration: "4h 12m",
        filamentUsed: "410g",
        result: "Success",
      },
      {
        id: "h-2",
        name: "Test Coupler 20mm",
        project: "Diagnostics",
        printedBy: "Marcus Vance",
        startedAt: "Oct 09, 14:00",
        duration: "28m",
        filamentUsed: "35g",
        result: "Success",
      },
      {
        id: "h-3",
        name: "Motor Mount Bracket",
        project: "Robotic Arm V2",
        printedBy: "Alex Chen",
        startedAt: "Oct 08, 16:30",
        duration: "1h 05m",
        filamentUsed: "120g",
        result: "Failed",
      },
    ],
    activityLog: [
      {
        id: "act-1",
        timestamp: "Just now",
        event: "Telemetry broadcast verified (67% complete)",
        actor: "System Watchdog",
      },
      {
        id: "act-2",
        timestamp: "45m ago",
        event: "Layer 300 inspection passed",
        actor: "Optical Telemetry",
      },
      {
        id: "act-3",
        timestamp: "1h 43m ago",
        event: "Print job initiated: Gear Housing",
        actor: "Alex Chen",
      },
      {
        id: "act-4",
        timestamp: "1h 45m ago",
        event: "Bed mesh auto-calibration completed",
        actor: "Klipper Macro",
      },
    ],
    alerts: [
      {
        id: "alt-1",
        type: "warning",
        title: "Low Filament Remaining",
        message: "Spool capacity is below 20% (180g remaining). Verify spool weight before starting longer queue jobs.",
      },
    ],
  },

  "printer-02": {
    id: "printer-02",
    printerCode: "Printer 02",
    printerName: "Printer 02",
    model: "Bambu Lab X1-Carbon AMS",
    status: "READY",
    updatedAt: offsetDate(-5),
    currentPrint: null, // Empty state
    files: [],
    filament: {
      material: "PLA Tough",
      colorName: "MOSAIC Purple",
      colorHex: "#5F00BA",
      brand: "Bambu Lab AMS Slot 1",
      usedGrams: 0,
      usedMeters: 0,
      totalGramsForJob: 0,
      spoolRemainingGrams: 820,
      spoolRemainingPercent: 82,
      costForPrint: "$0.00",
    },
    temperatures: {
      nozzle: { current: 24, target: 0, isAlert: false },
      bed: { current: 23, target: 0, isAlert: false },
      chamber: { current: 22, target: 0, isAlert: false },
      sparkline: [24, 24, 24, 24, 24, 24, 24, 24],
    },
    printSettings: {
      layerHeight: "0.20 mm Standard",
      infill: "15% Grid",
      printSpeed: "250 mm/s",
      nozzleDiameter: "0.4 mm Hardened",
      supports: "Disabled",
      buildPlateAdhesion: "Textured PEI Plate",
      fanSpeed: "100%",
    },
    costAndTime: {
      estimatedTotalTime: "--",
      elapsedTime: "--",
      materialCost: "$0.00",
      machineTimeCost: "$0.00",
      totalCost: "$0.00",
      powerEstimate: "Idle (12W)",
    },
    printerInfo: {
      model: "Bambu Lab X1-Carbon AMS",
      firmwareVersion: "v01.07.02.00",
      nozzleSize: "0.4 mm",
      buildVolume: "256 x 256 x 256 mm",
      totalPrintHours: "860 hrs",
      totalPrintsCompleted: 142,
      lastMaintenanceDate: "2026-09-01",
      nextMaintenanceDue: "2026-10-15",
      isMaintenanceDueSoon: true, // Maintenance soon alert
    },
    queue: [
      {
        id: "q-201",
        name: "Filament Dry Box Latch",
        project: "Workshop Tooling",
        estimatedDuration: "50m",
        queuedBy: "David Kim",
      },
      {
        id: "q-202",
        name: "Nozzle Organizer Tray",
        project: "Workshop Tooling",
        estimatedDuration: "1h 30m",
        queuedBy: "David Kim",
      },
    ],
    history: [
      {
        id: "h-201",
        name: "Camera Mount Bracket",
        project: "Observability Rig",
        printedBy: "David Kim",
        startedAt: "Yesterday, 16:10",
        duration: "1h 12m",
        filamentUsed: "68g",
        result: "Success",
      },
      {
        id: "h-202",
        name: "Filament Spool Roller V3",
        project: "Workshop Tooling",
        printedBy: "David Kim",
        startedAt: "Oct 08, 11:20",
        duration: "2h 45m",
        filamentUsed: "190g",
        result: "Success",
      },
    ],
    activityLog: [
      {
        id: "act-201",
        timestamp: "5m ago",
        event: "Printer heartbeat check: Idle & Ready",
        actor: "System Watchdog",
      },
      {
        id: "act-202",
        timestamp: "18h ago",
        event: "Print job completed: Camera Mount Bracket",
        actor: "David Kim",
      },
    ],
    alerts: [
      {
        id: "alt-201",
        type: "warning",
        title: "Routine Maintenance Due Soon",
        message: "Scheduled lead screw cleaning and lubrication due in approx 4 operating days.",
      },
    ],
  },

  "printer-03": {
    id: "printer-03",
    printerCode: "Printer 03",
    printerName: "Printer 03",
    model: "Prusa MK4 Nextruder",
    status: "PRINTING",
    updatedAt: offsetDate(-1),
    currentPrint: {
      name: "Sensor Enclosure",
      project: "Environmental Node",
      object: "IP67 Weatherproof Lid",
      version: "v2.1",
      thumbnail: "/placeholder-sensor.svg",
      progress: 32,
      currentLayer: 128,
      totalLayers: 400,
      startedAt: offsetDate(-85),
      estimatedEndAt: offsetDate(180),
      printedBy: {
        name: "Dr. Elena Rostova",
        role: "Sensor Systems Lead",
        initials: "ER",
        avatarBg: "bg-emerald-600",
      },
    },
    files: [
      {
        id: "f-301",
        name: "sensor_case.gcode",
        type: "GCODE",
        size: "32.4 MB",
        uploadedAt: "Today, 11:10",
        version: "v2.1",
      },
      {
        id: "f-302",
        name: "environmental_node_assembly.3mf",
        type: "3MF",
        size: "18.9 MB",
        uploadedAt: "Yesterday",
        version: "v2.0",
      },
    ],
    filament: {
      material: "ASA Outdoor",
      colorName: "Industrial Signal Orange",
      colorHex: "#F37021",
      brand: "Prusament ASA",
      usedGrams: 98,
      usedMeters: 32.4,
      totalGramsForJob: 310,
      spoolRemainingGrams: 640,
      spoolRemainingPercent: 64,
      costForPrint: "$9.80",
    },
    temperatures: {
      nozzle: { current: 260, target: 260, isAlert: false },
      bed: { current: 105, target: 105, isAlert: false },
      chamber: { current: 42, target: 45, isAlert: false },
      sparkline: [256, 258, 260, 260, 260, 259, 260, 260],
    },
    printSettings: {
      layerHeight: "0.15 mm Quality",
      infill: "30% Honeycomb",
      printSpeed: "120 mm/s",
      nozzleDiameter: "0.4 mm Nextruder",
      supports: "Snug Supports",
      buildPlateAdhesion: "Satin Powder-coated",
      fanSpeed: "20%",
    },
    costAndTime: {
      estimatedTotalTime: "4h 25m",
      elapsedTime: "1h 25m",
      materialCost: "$6.20",
      machineTimeCost: "$3.60",
      totalCost: "$9.80",
      powerEstimate: "0.68 kWh (~$0.10)",
    },
    printerInfo: {
      model: "Prusa MK4 Nextruder",
      firmwareVersion: "Prusa-Firmware 5.1.0",
      nozzleSize: "0.4 mm",
      buildVolume: "250 x 210 x 220 mm",
      totalPrintHours: "620 hrs",
      totalPrintsCompleted: 94,
      lastMaintenanceDate: "2026-09-28",
      nextMaintenanceDue: "2026-11-10",
      isMaintenanceDueSoon: false,
    },
    queue: [
      {
        id: "q-301",
        name: "Solar Panel Mount Bracket",
        project: "Environmental Node",
        estimatedDuration: "2h 10m",
        queuedBy: "Dr. Elena Rostova",
      },
    ],
    history: [
      {
        id: "h-301",
        name: "Node Base Plate",
        project: "Environmental Node",
        printedBy: "Dr. Elena Rostova",
        startedAt: "Yesterday, 13:00",
        duration: "3h 40m",
        filamentUsed: "220g",
        result: "Success",
      },
    ],
    activityLog: [
      {
        id: "act-301",
        timestamp: "Just now",
        event: "Telemetry: Layer 128 / 400 (32%)",
        actor: "Loadcell Sensor",
      },
      {
        id: "act-302",
        timestamp: "1h 25m ago",
        event: "Job started: Sensor Enclosure (ASA)",
        actor: "Dr. Elena Rostova",
      },
    ],
    alerts: [],
  },
};

/**
 * Returns detailed telemetry for a printer by ID or code,
 * supporting edge cases and dynamic fallbacks for all 6 statuses.
 * @param {string} id
 * @returns {object}
 */
export function getPrinterDetail(id) {
  const normalizedId = String(id).toLowerCase().trim();

  if (MOCK_PRINTER_DETAILS[normalizedId]) {
    return MOCK_PRINTER_DETAILS[normalizedId];
  }

  // Handle aliases like "p-01", "1", "printer-1"
  if (normalizedId === "p-01" || normalizedId === "1") return MOCK_PRINTER_DETAILS["printer-01"];
  if (normalizedId === "p-02" || normalizedId === "2") return MOCK_PRINTER_DETAILS["printer-02"];
  if (normalizedId === "p-03" || normalizedId === "3") return MOCK_PRINTER_DETAILS["printer-03"];

  // Default fallback generator for testing other statuses (PAUSED, OFFLINE, ERROR, IDLE)
  return {
    id: normalizedId,
    printerCode: normalizedId.toUpperCase(),
    printerName: `Printer ${normalizedId}`,
    model: "Universal 3D Machine",
    status: "READY",
    updatedAt: new Date().toISOString(),
    currentPrint: null,
    files: [],
    filament: {
      material: "PLA",
      colorName: "Neutral White",
      colorHex: "#FFFFFF",
      brand: "Generic",
      usedGrams: 0,
      usedMeters: 0,
      totalGramsForJob: 0,
      spoolRemainingGrams: 500,
      spoolRemainingPercent: 50,
      costForPrint: "$0.00",
    },
    temperatures: {
      nozzle: { current: 22, target: 0, isAlert: false },
      bed: { current: 22, target: 0, isAlert: false },
      chamber: { current: 22, target: 0, isAlert: false },
      sparkline: [22, 22, 22, 22, 22, 22, 22, 22],
    },
    printSettings: {
      layerHeight: "0.20 mm",
      infill: "20%",
      printSpeed: "100 mm/s",
      nozzleDiameter: "0.4 mm",
      supports: "Disabled",
      buildPlateAdhesion: "Smooth PEI",
      fanSpeed: "100%",
    },
    costAndTime: {
      estimatedTotalTime: "--",
      elapsedTime: "--",
      materialCost: "$0.00",
      machineTimeCost: "$0.00",
      totalCost: "$0.00",
      powerEstimate: "Idle",
    },
    printerInfo: {
      model: "Universal 3D Machine",
      firmwareVersion: "v1.0.0",
      nozzleSize: "0.4 mm",
      buildVolume: "220 x 220 x 250 mm",
      totalPrintHours: "100 hrs",
      totalPrintsCompleted: 15,
      lastMaintenanceDate: "2026-09-01",
      nextMaintenanceDue: "2026-11-01",
      isMaintenanceDueSoon: false,
    },
    queue: [],
    history: [],
    activityLog: [],
    alerts: [],
  };
}
