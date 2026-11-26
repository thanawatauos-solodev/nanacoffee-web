"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../keystatic.config";

/** The Keystatic admin app; it routes /keystatic/* itself in the browser. */
export default makePage(config);
