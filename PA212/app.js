const app = Vue.createApp({
  data() {
    return {
      torque: "",
      qnh: 29.92,
      fat: "",
      YYY: "",
      ITT: "",
      IA: "87",
      N1: "",
      QNHUnit: "in.Hg",
    };
  },

  computed: {
    PA() {
      if (this.QNHUnit === "in.Hg")
        return parseFloat(
          Number(this.IA) + (29.92 - Number(this.qnh)) * 1000
        ).toFixed(0);
      else
        return parseFloat(
          Number(this.IA) + (29.92 - Number(this.qnh) / 33.8639) * 1000
        ).toFixed(0);
    },
  },

  methods: {
    ChartPart1PAZero(num) {
      return -1.0312 * Number(num) + 81.748;
    },
    ChartPart1PA2000(num) {
      return -1.0687 * Number(num) + 79.261;
    },
    ChartPart1PA4000(num) {
      return -1.1364 * Number(num) + 78.182;
    },
    ChartPart1PA6000(num) {
      return -1.2245 * Number(num) + 78.122;
    },
    ChartPart1PA8000(num) {
      return -1.2963 * Number(num) + 76.222;
    },
    ChartPart1PA10000(num) {
      return -1.4 * Number(num) + 75.6;
    },
    ChartPart2TMinus10(num) {
      return 0.0701 * Number(num) * Number(num) - 7.9869 * Number(num) + 809.38;
    },
    ChartPart2TZero(num) {
      return 0.0618 * Number(num) * Number(num) - 7.6383 * Number(num) + 837.59;
    },
    ChartPart2T10(num) {
      return 0.0375 * Number(num) * Number(num) - 6.8218 * Number(num) + 863.35;
    },
    ChartPart2T20(num) {
      return -5 * Number(num) + 875;
    },
    ChartPart2T30(num) {
      return (
        -0.0437 * Number(num) * Number(num) - 3.1434 * Number(num) + 885.42
      );
    },
    ChartPart2T40(num) {
      return -6.8182 * Number(num) + 980.45;
    },
    ChartPart3TMinus10(num) {
      return (
        -0.000091 * Number(num) * Number(num) * Number(num) +
        0.008963 * Number(num) * Number(num) -
        0.555151 * Number(num) +
        102.046279
      );
    },
    ChartPart3TZero(num) {
      return (
        -0.000207 * Number(num) * Number(num) * Number(num) +
        0.01512 * Number(num) * Number(num) -
        0.664718 * Number(num) +
        104.311702
      );
    },
    ChartPart3T10(num) {
      return (
        -0.000312 * Number(num) * Number(num) * Number(num) +
        0.023509 * Number(num) * Number(num) -
        0.86785 * Number(num) +
        107.097896
      );
    },
    ChartPart3T20(num) {
      return -0.375 * Number(num) + 106;
    },
    ChartPart3T30(num) {
      return -0.38 * Number(num) + 107.58;
    },
    ChartPart3T40(num) {
      return -0.4225 * Number(num) + 110.12;
    },

    calculateY() {
      if (this.PA >= 0 && this.PA < 2000) {
        this.YYY =
          this.ChartPart1PA2000(this.torque) -
          ((this.PA - 2000) *
            (this.ChartPart1PAZero(this.torque) -
              this.ChartPart1PA2000(this.torque))) /
            2000;
      } else if (this.PA >= 2000 && this.PA < 4000) {
        this.YYY =
          this.ChartPart1PA4000(this.torque) -
          ((this.PA - 4000) *
            (this.ChartPart1PA2000(this.torque) -
              this.ChartPart1PA4000(this.torque))) /
            2000;
      } else if (this.PA >= 4000 && this.PA < 6000) {
        this.YYY =
          this.ChartPart1PA6000(this.torque) -
          ((this.PA - 6000) *
            (this.ChartPart1PA4000(this.torque) -
              this.ChartPart1PA6000(this.torque))) /
            2000;
      } else if (this.PA >= 6000 && this.PA < 8000) {
        this.YYY =
          this.ChartPart1PA8000(this.torque) -
          ((this.PA - 8000) *
            (this.ChartPart1PA6000(this.torque) -
              this.ChartPart1PA8000(this.torque))) /
            2000;
      } else if (this.PA >= 8000 && this.PA <= 10000) {
        this.YYY =
          this.ChartPart1PA10000(this.torque) -
          ((this.PA - 10000) *
            (this.ChartPart1PA8000(this.torque) -
              this.ChartPart1PA10000(this.torque))) /
            2000;
      } else {
        this.ITT = "";
        this.N1 = "";
        alert("PA out of range!");
      }
    },

    CalculateITT() {
      if (Number(this.fat) >= -10 && Number(this.fat) < 0) {
        this.ITT =
          this.ChartPart2TMinus10(Number(this.YYY)) +
          ((Number(this.fat) + 10) *
            (this.ChartPart2TZero(Number(this.YYY)) -
              this.ChartPart2TMinus10(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 0 && Number(this.fat) < 10) {
        this.ITT =
          this.ChartPart2TZero(Number(this.YYY)) +
          (Number(this.fat) *
            (this.ChartPart2T10(Number(this.YYY)) -
              this.ChartPart2TZero(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 10 && Number(this.fat) < 20) {
        this.ITT =
          this.ChartPart2T10(Number(this.YYY)) +
          ((Number(this.fat) - 10) *
            (this.ChartPart2T20(Number(this.YYY)) -
              this.ChartPart2T10(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 20 && Number(this.fat) < 30) {
        this.ITT =
          this.ChartPart2T20(Number(this.YYY)) +
          ((Number(this.fat) - 20) *
            (this.ChartPart2T30(Number(this.YYY)) -
              this.ChartPart2T20(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 30 && Number(this.fat) <= 40) {
        this.ITT =
          this.ChartPart2T30(Number(this.YYY)) +
          ((Number(this.fat) - 30) *
            (this.ChartPart2T40(Number(this.YYY)) -
              this.ChartPart2T30(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) != 0) {
        alert("Check temperature between -10 and +40!");
      }
      if (this.ITT > 810) {
        return (this.ITT = 810);
      }
      if (this.ITT > -34.828 * Number(this.YYY) + 1739.6) {
        this.ITT = "";
        alert("Out of graph boundaries");
      }
    },

    CalculateN1() {
      this.ITT = "";
      this.N1 = "";
      this.calculateY();
      this.CalculateITT();
      this.ITT = parseFloat(this.ITT).toFixed(0);
      if (Number(this.fat) >= -10 && Number(this.fat) < 0) {
        this.N1 =
          this.ChartPart3TMinus10(Number(this.YYY)) +
          ((Number(this.fat) + 10) *
            (this.ChartPart3TZero(Number(this.YYY)) -
              this.ChartPart3TMinus10(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 0 && Number(this.fat) < 10) {
        this.N1 =
          this.ChartPart3TZero(Number(this.YYY)) +
          (Number(this.fat) *
            (this.ChartPart3T10(Number(this.YYY)) -
              this.ChartPart3TZero(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 10 && Number(this.fat) < 20) {
        this.N1 =
          this.ChartPart3T10(Number(this.YYY)) +
          ((Number(this.fat) - 10) *
            (this.ChartPart3T20(Number(this.YYY)) -
              this.ChartPart3T10(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 20 && Number(this.fat) < 30) {
        this.N1 =
          this.ChartPart3T20(Number(this.YYY)) +
          ((Number(this.fat) - 20) *
            (this.ChartPart3T30(Number(this.YYY)) -
              this.ChartPart3T20(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) >= 30 && Number(this.fat) <= 40) {
        this.N1 =
          this.ChartPart3T30(Number(this.YYY)) +
          ((Number(this.fat) - 30) *
            (this.ChartPart3T40(Number(this.YYY)) -
              this.ChartPart3T30(Number(this.YYY)))) /
            10;
      } else if (Number(this.fat) != 0) {
        alert("Check temperature between -10 and +40!");
      }
      this.N1 = parseFloat(this.N1).toFixed(1);
      if (this.N1 > 100.8) {
        return (this.N1 = 100.8);
      }
      if (
        this.N1 >
        -0.0159 * Number(this.YYY) * Number(this.YYY) -
          0.8492 * Number(this.YYY) +
          133.5
      ) {
        this.N1 = "";
        alert("Out of graph boundaries");
      }
    },
  },
});
app.mount("#Pwr-Assurance");
