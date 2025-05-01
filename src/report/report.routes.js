import { Router } from "express";

import {
    getReport,
    getReportById,
    deleteReport,
    updateReport
} from './report.controller.js'
import { validableJwt } from "../../middlewares/validate.jwt.js";