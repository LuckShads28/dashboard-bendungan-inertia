import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const mockBendungan = [
    {
        name: "Bendungan 1",
        is_connected: true,
        chart_data: [
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
        ],
    },
    {
        name: "Bendungan 2",
        is_connected: false,
        chart_data: [
            { month: "January", desktop: 300 },
            { month: "February", desktop: 250 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 275 },
            { month: "May", desktop: 900 },
            { month: "June", desktop: 100 },
        ],
    },
];

export function BendunganWidget({ bendunganId }: { bendunganId: number }) {
    const [bendungan, setBendungan] = useState(mockBendungan[bendunganId - 1]);

    return (
        <div className="aspect-video rounded-xl bg-muted/50">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between col-span-2 my-4 ms-4">
                    <h2 className="text-xl font-semibold">{bendungan.name}</h2>
                    {bendungan.is_connected == true ? (
                        <div className="p-1 mx-4 text-black bg-green-500 rounded-xl">
                            <span className="p-2 text-sm">Connected</span>
                        </div>
                    ) : (
                        <div className="p-1 mx-4 text-black bg-red-500 rounded-xl">
                            <span className="p-2 text-sm">Disconnected</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-center h-full my-4 ms-4 col">
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={bendungan.chart_data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="desktop"
                                type="natural"
                                stroke="var(--color-desktop)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>

                <div className="flex items-center justify-center my-4 bg-blue-400 me-4 col">
                    Ini cuaca
                </div>
            </div>
        </div>
    );
}
