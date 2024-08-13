import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import filterReplace from "vite-plugin-filter-replace";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      // Workaround warning with lottie - https://github.com/airbnb/lottie-web/issues/2927
      filterReplace([
        {
          filter: ["node_modules/lottie-web/build/player/lottie.js"],
          replace: {
            from: "eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0]",
            to: "(new Function('scoped_bm_rt', val + ';return $bm_rt;'))()",
          },
        },
      ]),
    ],
  };
});
