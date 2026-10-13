// data/printers.js
// Local dummy data generator for MOSAIC Printer Display Page

/**
 * Returns a date relative to baseDate offset by minutes
 * @param {Date} baseDate
 * @param {number} minuteOffset
 * @returns {string} ISO string
 */
function offsetDate(baseDate, minuteOffset) {
  const d = new Date(baseDate.getTime() + minuteOffset * 60 * 1000);
  return d.toISOString();
}

/**
 * Standard dummy printer data
 * @param {Date} [baseDate=new Date()]
 * @returns {Array} Array of printer objects
 */
export function getDummyPrinters(baseDate = new Date()) {
  return [
    {
      id: "printer-01",
      printerCode: "Printer 01",
      printerName: "Printer 01",
      status: "PRINTING",
      currentPrintName: "Gear Housing",
      projectName: "Robotic Arm V2",
      fileName: "gear_housing_v4.gcode",
      progress: 67,
      startedAt: offsetDate(baseDate, -103),
      estimatedEndAt: offsetDate(baseDate, 51),
      updatedAt: offsetDate(baseDate, -2),
    },
    {
      id: "printer-02",
      printerCode: "Printer 02",
      printerName: "Printer 02",
      status: "READY",
      currentPrintName: null,
      projectName: null,
      fileName: null,
      progress: 0,
      startedAt: null,
      estimatedEndAt: null,
      updatedAt: offsetDate(baseDate, -5),
    },
    {
      id: "printer-03",
      printerCode: "Printer 03",
      printerName: "Printer 03",
      status: "PRINTING",
      currentPrintName: "Sensor Enclosure",
      projectName: "Environmental Node",
      fileName: "sensor_case.gcode",
      progress: 32,
      startedAt: offsetDate(baseDate, -85),
      estimatedEndAt: offsetDate(baseDate, 180),
      updatedAt: offsetDate(baseDate, -1),
    },
  ];
}

/**
 * Test printer data for edge cases and all statuses
 * set 0:
 *   - Printer 01: PAUSED with VERY long print/project/file names
 *   - Printer 02: ERROR (88%)
 *   - Printer 03: OFFLINE (no print)
 * set 1:
 *   - Printer 01: IDLE (no print)
 *   - Printer 02: PRINTING at 0%
 *   - Printer 03: PRINTING at 100% (end time already passed)
 * @param {number} set
 * @param {Date} [baseDate=new Date()]
 * @returns {Array} Array of printer objects
 */
export function getTestPrinters(set, baseDate = new Date()) {
  if (set === 0) {
    return [
      {
        id: "printer-01",
        printerCode: "Printer 01",
        printerName: "Printer 01",
        status: "PAUSED",
        currentPrintName: "High_Tolerance_Industrial_Robotics_Arm_Planetary_Gearbox_Housing_Enclosure_Rev4_HeavyDuty_Reinforced",
        projectName: "Autonomous_Planetary_Exploration_Rover_Sample_Collection_Mechanism_Alpha_Subsystem_Hardware",
        fileName: "planetary_gearbox_housing_rev4_petg_carbon_fiber_0.2mm_supports_touching_buildplate_final_run.gcode",
        progress: 45,
        startedAt: offsetDate(baseDate, -140),
        estimatedEndAt: offsetDate(baseDate, 75),
        updatedAt: offsetDate(baseDate, -4),
      },
      {
        id: "printer-02",
        printerCode: "Printer 02",
        printerName: "Printer 02",
        status: "ERROR",
        currentPrintName: "Turbine Runner Impeller V6",
        projectName: "Hydroelectric Micro-Turbine",
        fileName: "impeller_runner_v6.gcode",
        progress: 88,
        startedAt: offsetDate(baseDate, -110),
        estimatedEndAt: offsetDate(baseDate, 15),
        updatedAt: offsetDate(baseDate, -1),
      },
      {
        id: "printer-03",
        printerCode: "Printer 03",
        printerName: "Printer 03",
        status: "OFFLINE",
        currentPrintName: null,
        projectName: null,
        fileName: null,
        progress: 0,
        startedAt: null,
        estimatedEndAt: null,
        updatedAt: offsetDate(baseDate, -30),
      },
    ];
  }

  if (set === 1) {
    return [
      {
        id: "printer-01",
        printerCode: "Printer 01",
        printerName: "Printer 01",
        status: "IDLE",
        currentPrintName: null,
        projectName: null,
        fileName: null,
        progress: 0,
        startedAt: null,
        estimatedEndAt: null,
        updatedAt: offsetDate(baseDate, -12),
      },
      {
        id: "printer-02",
        printerCode: "Printer 02",
        printerName: "Printer 02",
        status: "PRINTING",
        currentPrintName: "Bed Level Calibration Matrix 50mm",
        projectName: "Bed Mesh Diagnostics",
        fileName: "bed_level_test_50mm.gcode",
        progress: 0,
        startedAt: offsetDate(baseDate, -2),
        estimatedEndAt: offsetDate(baseDate, 28),
        updatedAt: offsetDate(baseDate, -1),
      },
      {
        id: "printer-03",
        printerCode: "Printer 03",
        printerName: "Printer 03",
        status: "PRINTING",
        currentPrintName: "Spool Adapter Collar",
        projectName: "Filament Storage System",
        fileName: "spool_adapter_collar_v2.gcode",
        progress: 100,
        startedAt: offsetDate(baseDate, -95),
        estimatedEndAt: offsetDate(baseDate, -8), // passed 8 mins ago -> "Finishing…"
        updatedAt: offsetDate(baseDate, -1),
      },
    ];
  }

  return getDummyPrinters(baseDate);
}
