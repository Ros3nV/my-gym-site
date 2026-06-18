import bg from "../messages/bg.json" with { type: "json" };
import en from "../messages/en.json" with { type: "json" };

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? keys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );
}

const bgKeys = new Set(keys(bg));
const enKeys = new Set(keys(en));
const missingInEn = [...bgKeys].filter((k) => !enKeys.has(k));
const missingInBg = [...enKeys].filter((k) => !bgKeys.has(k));

if (missingInEn.length || missingInBg.length) {
  console.error("i18n key mismatch:", { missingInEn, missingInBg });
  process.exit(1);
}
console.log("i18n keys in parity:", bgKeys.size, "keys");
