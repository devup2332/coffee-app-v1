import React from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../../selection.json";

export default createIconSetFromIcoMoon(
  icoMoonConfig,
  "IcoMoon",
  "icomoon.ttf"
);