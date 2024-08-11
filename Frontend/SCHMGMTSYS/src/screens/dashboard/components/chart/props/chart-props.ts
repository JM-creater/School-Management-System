import { ChartData, ChartOptions } from "chart.js";

export interface PieChartProps {
    data: ChartData<'pie'>;
    options?: ChartOptions<'pie'>;
}
  