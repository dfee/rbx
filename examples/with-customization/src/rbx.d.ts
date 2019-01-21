import "rbx/base/helpers/variables";
import { VariablesDefaults } from "rbx/base/helpers/variables";

declare module "rbx/base/helpers/variables" {
  interface VariablesOverrides {
    colors: VariablesDefaults["colors"] | "react";
  }
}
